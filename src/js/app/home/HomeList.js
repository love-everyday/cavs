
import React from 'react';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import IconMenu from 'material-ui/IconMenu';
import MenuIcons from 'material-ui/svg-icons/navigation/menu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import { connect } from 'react-redux';

import injectTapEventPlugin from 'react-tap-event-plugin';
import { homeListSelectedIndex } from '../../actions/home';
import * as Colors from '../../colors';

injectTapEventPlugin();

const SelectableList = makeSelectable(List);
class HomeList extends React.Component {

	constructor(prop) {
		super(prop)
	}

	shouldComponentUpdate(nextProps, nextState) {
		return true;
	}

	componentDidMount() {

	}

	componentWillUpdate() {

	}

	handleRequestChange = (event, index) => {
		console.log(index);
		this.props.dispatch(homeListSelectedIndex(Number(index)));
	}

	render() {
		if (this.props.screenType === 2) {
			return (
				<div className={this.props.className}>
					<IconMenu
						iconStyle={{width: 40, height: 40, alignItems: 'center'}}
						iconButtonElement={<IconButton style={{width: 60, height: 60}}><MenuIcons color={Colors.orange} /></IconButton>}
						onChange={this.handleRequestChange}
						value={this.props.selectedIndex + ''}
						anchorOrigin={{horizontal: 'left', vertical: 'top'}}
						targetOrigin={{horizontal: 'middle', vertical: 'bottom'}}
						>
						<MenuItem value="1" primaryText="热门" leftIcon={<ContentInbox />} />
						<MenuItem value="2" primaryText="大陆" leftIcon={<ActionGrade />} />
						<MenuItem value="3" primaryText="美国" leftIcon={<ContentSend />} />
						<MenuItem value="4" primaryText="香港" leftIcon={<ContentDrafts />} />
						<MenuItem value="5" primaryText="韩国" leftIcon={<ContentInbox />} />
					</IconMenu>
				</div>
			)
		}
		return (
			<SelectableList
				className={this.props.className}
				value={this.props.selectedIndex}
				onChange={this.handleRequestChange}
				>
      			<ListItem value={1} primaryText="热门" leftIcon={<ContentInbox />} />
				<ListItem value={2} primaryText="大陆" leftIcon={<ActionGrade />} />
				<ListItem value={3} primaryText="美国" leftIcon={<ContentSend />} />
				<ListItem value={4} primaryText="香港" leftIcon={<ContentDrafts />} />
				<ListItem value={5} primaryText="韩国" leftIcon={<ContentInbox />} />
			</SelectableList>
		)
	}
}

export default connect((store) => ({
	selectedIndex: store.home.selectedIndex,
	screenType: store.home.screenType,
}))(HomeList);
