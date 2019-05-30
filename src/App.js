import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import * as GemsAPI from './GemsAPI';
import SearchGems from './SearchGems';
import ListGems from './ListGems';
import './App.css';

class App extends Component {
	state = {
		savedGems: [],
		localStorageAvailable: true
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
				<Header />
				<Switch>
					<Route
						exact
						path="/"
						render={() => (
							<SearchGems
								savedGems={savedGems}
								handleSaveChange={this.handleSaveChange}
								localStorageAvailable
							/>
						)}
					/>
					<Route
						path="/saved"
						render={() => (
							<ListGems
								savedGems={savedGems}
								handleSaveChange={this.handleSaveChange}
								localStorageAvailable
							/>
						)}
					/>
				</Switch>
				<Footer />
			</Fragment>
		);
	}
}

export default App;
