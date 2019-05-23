import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import * as GemsAPI from './GemsAPI';
import SearchGems from './SearchGems';
import './App.css';
import ListGems from './ListGems';

class App extends Component {
	state = {
		savedGems: []
	};

	componentDidMount() {
		GemsAPI.get()
			.then((savedGems) => {
				this.setState({
					savedGems
				});
			})
			.catch((reason) => {
				this.setState({
					localStorageAvailable: false
				});
				console.error(reason);
			});
	}

	handleSaveChange = (gemInfo, saved) => {
		const { savedGems } = this.state;
		let updatedSavedGems;

		if (!saved) {
			//save
			updatedSavedGems = [...savedGems, gemInfo];
		} else {
			//unsave
			updatedSavedGems = savedGems.filter((currentGem) => {
				return currentGem.name !== gemInfo.name;
			});
		}

		//save to state
		this.setState({
			savedGems: updatedSavedGems
		});

		//save to localStorage
		GemsAPI.save(updatedSavedGems).catch((reason) => {
			this.setState({
				localStorageAvailable: false
			});
			console.error(reason);
		});
	};

	render() {
		const { savedGems } = this.state;

		return (
			<Fragment>
				<Route
					exact
					path="/"
					render={() => (
						<SearchGems
							savedGems={savedGems}
							handleSaveChange={this.handleSaveChange}
						/>
					)}
				/>
				<Route
					path="/saved"
					render={() => (
						<ListGems
							gems={savedGems}
							handleSaveChange={this.handleSaveChange}
						/>
					)}
				/>
			</Fragment>
		);
	}
}

export default App;
