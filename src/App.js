import React, { Component, Fragment } from 'react';
import * as GemsAPI from './GemsAPI';
import SearchResultItem from './SearchResultItem';
import './App.css';

class App extends Component {
	state = {
		query: '',
		searchResults: [],
		savedGems: [],
		localStorageAvailable: true
	};

	componentDidMount() {
		try {
			const savedGems = GemsAPI.get();
			this.setState({
				savedGems
			});
		} catch (e) {
			this.setState({
				localStorageAvailable: false
			});
			console.error(e);
		}
	}

	handleSaveChange = (name, saved) => {
		const { savedGems } = this.state;
		let updatedSavedGems;

		if (!saved) {
			//save
			//add to state
			updatedSavedGems = [...savedGems, name];
		} else {
			//unsave
			updatedSavedGems = savedGems.filter((gem) => {
				return gem !== name;
			});
		}
		console.log('savedGems', savedGems, 'updatedSavedGems', updatedSavedGems);
		//save to state
		this.setState({
			savedGems: updatedSavedGems
		});
		//save to localStorage
		try {
			GemsAPI.save(updatedSavedGems);
		} catch (error) {
			this.setState({
				localStorageAvailable: false
			});
			console.error(error);
		}
	};

	handleInputChange = (e) => {
		const currentQuery = e.target.value;

		this.setState({
			query: currentQuery
		});

		//in case currentQuery is empty -> reset searchResults
		if (currentQuery === '') {
			this.setState({
				searchResults: []
			});
		} else {
			GemsAPI.search(currentQuery)
				.then((data) => {
					const { query } = this.state;
					//if there are no results, or by the time callback is executed,
					//the search field has been cleared, reset searchResults
					if (!data.length || query === '') {
						this.setState({
							searchResults: []
						});
					} else {
						this.setState({
							searchResults: data
						});
					}
				})
				.catch((error) => console.error(error));
		}
	};

	render() {
		const { query, searchResults, savedGems, localStorageAvailable } = this.state;

		return (
			<Fragment>
				<label>
					Search for Ruby Gems
					<input
						type="search"
						value={query}
						placeholder="Search Gems..."
						onChange={this.handleInputChange}
						aria-label="Search for Ruby Gems"
					/>
				</label>

				{!localStorageAvailable ? (
					<h4>
						Note: LocalStorage is not available, your gems will not be saved after you
						close this page
					</h4>
				) : null}

				{searchResults.length > 0 ? (
					<Fragment>
						<h3>Search Results</h3>
						<ul>
							{searchResults.map((gemInfo) => {
								const saved = savedGems.includes(gemInfo.name);

								return (
									<SearchResultItem
										gemInfo={gemInfo}
										handleSaveChange={this.handleSaveChange}
										saved={saved}
										key={gemInfo.name}
									/>
								);
							})}
						</ul>
					</Fragment>
				) : (
					<h3>No results found</h3>
				)}
			</Fragment>
		);
	}
}

export default App;
