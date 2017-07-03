
import React from 'react';
import { connect } from 'react-redux';
// import {GridList, GridTile} from 'material-ui/GridList';
// import IconButton from 'material-ui/IconButton';
// import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {
	CellMeasurer,
	CellMeasurerCache,
	createMasonryCellPositioner,
	Masonry,
} from 'react-virtualized';

import { homeGradListHttpInfo, windowResize } from '../../actions/home';
import styles from './home.css';
import { scrollbarWidth } from '../common/common';

class HomeGradList extends React.Component {
	state = {
		changed: false,
	}
	constructor (prop) {
    	super(prop)
		this._setMasonryRef = this._setMasonryRef.bind(this)
	}

	componentDidMount() {
		this.resetCSSExportValue(this.props.screenType)
		this._cache = new CellMeasurerCache({
			defaultWidth: this.cssExportValue.cellWidth,
			defaultHieght: this.cssExportValue.cellHeight,
			fixedWidth: true,
		})
		this._cellPositioner = createMasonryCellPositioner({
			cellMeasurerCache: this._cache,
			columnCount: this.cssExportValue.columnNum,
			columnWidth: this.cssExportValue.cellWidth,
			spacer: this.cssExportValue.cellSpacer,
		})
		this.props.dispatch(homeGradListHttpInfo(this.props.selectedIndex));
		window.addEventListener('resize', this.onWindowResize);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.onWindowResize);
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log('HomeGradList shouldComponentUpdate');
		if (nextProps.selectedIndex !== this.props.selectedIndex) {
			nextProps.dispatch(homeGradListHttpInfo(nextProps.selectedIndex));
			return true
		}
		if (nextProps.filmList !== this.props.filmList) {
			if (this._masonry) {
				this.resetMansory()
			}
			return true
		}
		if (nextProps.screenType !== this.props.screenType) {
			this.resetCSSExportValue(nextProps.screenType);
			return true
		}
		if (nextState.changed !== this.state.changed) {
			return true
		}
		return false
	}

	componentWillUpdate() {

	}

	render() {
		if (!this.props.filmList) {
			return (
				<div className={this.props.className} />
			)
		}
		const styleWidth = this.cssExportValue.width
		return (
			<div className={this.props.className} style={{width: styleWidth, height: this.cssExportValue.height}}>
				<Masonry
					style={{border: 0, outline: 'none'}}
					cellCount={this.props.filmList.Data.length}
					cellMeasurerCache={this._cache}
					cellPositioner={this._cellPositioner}
					cellRenderer={this._cellRenderer}
					width={this.cssExportValue.width}
					height={this.cssExportValue.height}
					ref={this._setMasonryRef}
					/>
			</div>
		)
	}

	_cellRenderer = ({index, key, parent, style}) => {
		const film = this.props.filmList.Data[index]
		if (!film) {
			return
		}
		return (
			<CellMeasurer
				cache={this._cache}
				index={index}
				key={key}
				parent={parent}
				>
				<div style={style}>
					<img src={film.PictureUrl} style={{width: this.cssExportValue.cellWidth, height: this.cssExportValue.cellHeight}} />
				</div>
			</CellMeasurer>
		)
	}

	_setMasonryRef (ref) {
	    this._masonry = ref
	}

	resetMansory = () => {
		if (!this._masonry) {
			return
		}
		this._cache.clearAll()
		this._cellPositioner.reset({
			columnCount: this.cssExportValue.columnNum,
			columnWidth: this.cssExportValue.cellWidth,
			spacer: this.cssExportValue.cellSpacer,
		})

		this._masonry.clearCellPositions()
	}

	onWindowResize = () => {
		if (this.props.screenType === 2) {
			const width = window.innerWidth;
			const off = parseInt(width / 20)
			if (off !== this.currentWidth) {
				this.currentWidth = off
				this.resetCSSExportValue(2);
			}
		}
	}

	resetCSSExportValue = (type) => {
		console.log(type);
		if (type === 0) {
			this.MasonryWidth = 0
			const str = styles.px760.substring(1, styles.px760.length - 1);
			this.cssExportValue = eval('('+ str +')');
			this.resetMansory()
		} else if (type == 1) {
			this.MasonryWidth = 0
			const str = styles.px440.substring(1, styles.px440.length - 1);
			this.cssExportValue = eval('('+ str +')');
			this.resetMansory()
		} else {
			const str = styles.pxAuto.substring(1, styles.pxAuto.length - 1);
			this.cssExportValue = eval('('+ str +')');

			const width = window.innerWidth - 40;
			this.currentWidth = parseInt(width / 20)
			let count = parseInt(width / this.cssExportValue.cellWidth)
			let differential = width - this.cssExportValue.cellWidth * count
			if (differential < this.cssExportValue.cellSpacer * (count - 1)) {
				count = count - 1;
			}
			this.cssExportValue.columnNum = count
			this.cssExportValue.width = count * this.cssExportValue.cellWidth + this.cssExportValue.cellSpacer * (count - 1) + scrollbarWidth();
			if (this.MasonryWidth !== this.cssExportValue.width) {
				this.MasonryWidth = this.cssExportValue.width
				this.resetMansory()
				this.setState({changed: !this.state.changed})
			}
		}
	}
}

export default connect((store) => ({
	screenType: store.home.screenType,
	selectedIndex: store.home.selectedIndex,
	filmList: store.home.filmList,
}))(HomeGradList);

/*
<GridList
	style={{overflowY: 'auto', height: 900}}
	cols={4}
	cellHeight={200}
	padding={6}
	>
	{this.props.filmList.Data.map((film) => (
		<GridTile
			key={film.PictureUrl}
			title={film.Title}
			actionIcon={<IconButton><StarBorder color='white' /></IconButton>}
			>
			<img src={film.PictureUrl} alt={film.Title} style={{height: 200, width: 200, backgroundColor: 'black'}}/>
		</GridTile>
	))}
</GridList>
*/
