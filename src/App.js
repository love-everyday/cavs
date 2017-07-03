import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Particles from 'react-particles-js';

import styles from './App.css';

import Home from './js/app/home/home'

const particlesJson = require('./particles.json')

const particleStyle = {
	position: 'fixed', width: '100%', height: '100%', zIndex: -1,
}

class App extends Component {

	shouldComponentUpdate(nextProps, nextState) {
		console.log('App shouldComponentUpdate');
		return true
	}

	render() {
		return (
			<MuiThemeProvider>
				<div>
					<div className={styles.home}>
						<Home />
					</div>
				</div>
			</MuiThemeProvider>
		);
	}

	/*
	<Particles
		width={window.innerWidth}
		height={80}
		params={particlesJson}
		style={particleStyle}
		/>
	*/
}
export default App;
