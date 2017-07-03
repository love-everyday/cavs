
import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import * as Colors from '../../colors';

export default class UserName extends React.Component {

	state = {
		cavsFlatButtonColor: Colors.orange,
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log('UserName shouldComponentUpdate');
		return true
	}

	render() {
		console.log(this.props);
		return (
			<div className={this.props.className}>
				<FlatButton
					style={{fontSize: 30, color: this.state.cavsFlatButtonColor, marginTop: 20}}
					hoverColor='clear'
					rippleColor='clear'
					href='https://github.com/callemall/material-ui'
					onMouseOver={() => {this.setState({cavsFlatButtonColor: Colors.lightGray,})}}
					onMouseOut={() => {this.setState({cavsFlatButtonColor: Colors.orange,})}}
					>
					{this.props.username}
				</FlatButton>
				<p style={{fontSize: 14, color: '#B0B0B0'}}> {this.props.signature}</p>
			</div>
		)
	}
}
