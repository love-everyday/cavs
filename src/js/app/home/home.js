
import React from 'react';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';

import { scrollbarWidth, isSafari } from '../common/common';
import UserName from './username';
import HomeList from './HomeList';
import HomeGradList from './HomeGradList';
import styles from './home.css';
import { windowResize } from '../../actions/home';

class Home extends React.Component {
	constructor(prop) {
		super(prop);
		this.onWindowResize()
	}

	componentDidMount() {
		window.addEventListener('resize', this.onWindowResize);
	}

	componentWillUnmount() {
	    window.removeEventListener('resize', this.onWindowResize);
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log('Home shouldComponentUpdate');
		return false
	}
	render() {
		return (
			<Paper className={styles.paper} rounded={false} zDepth={2} >
				<UserName className={styles.username}
					username='Cavs'
					signature = '兵无常势，水无常形，用兵之妙，存乎一心。'
					/>
				<HomeList className={styles.homeList} />
				<HomeGradList className={styles.homeGradList} />
			</Paper>
		)
	}

	onWindowResize = () => {
		let width = window.innerWidth;
		if (isSafari()) {
			width = width - scrollbarWidth()
		}
		if (width > 1000) {
			if (1000 === this.currentWidth) {
				return
			}
			this.currentWidth = 1000
			this.props.dispatch(windowResize(0));
		} else if (width > 800 ) {
			if (800 === this.currentWidth) {
				return
			}
			this.currentWidth = 800
			this.props.dispatch(windowResize(1));
		} else {
			if (1 === this.currentWidth) {
				return
			}
			this.currentWidth = 1
			this.props.dispatch(windowResize(2));
		}
	}
}

export default connect((store) => ({

}))(Home);
