import React, { Component, Fragment } from 'react';
import * as GemsAPI from './GemsAPI';
import ListItem from './ListItem';

class SearchGems extends Component {
	state = {
		query: '',
		searchResults: [],
		localStorageAvailable: true
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
					if ((data && !data.length) || query === '') {
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
		const { query, searchResults, localStorageAvailable } = this.state;
		const { handleSaveChange, savedGems } = this.props;

		return (
			<main>
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
								const saved = savedGems.some((currentGem) => {
									return currentGem.name === gemInfo.name;
								});

								return (
									<ListItem
										gemInfo={gemInfo}
										handleSaveChange={handleSaveChange}
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
			</main>
		);
	}
}

export default SearchGems;
