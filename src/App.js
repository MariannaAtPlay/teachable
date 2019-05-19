import React, { Component } from 'react';
import * as GemsAPI from './GemsAPI';
//import SearchResultItem from './SearchResultItem';
import './App.css';

class App extends Component {
	state = {
		query: '',
		searchResults: [],
		savedGems: []
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
					//the search field has been cleared, reset state.searchResults
					if (!data.length || query === '') {
						this.setState({
							searchResults: []
						});
						//return;
					} else {
						this.setState({
							searchResults: data
						});
					}

					// const updatedSearchResults = data.map((book) => {
					// 	//check if this book is currently on a shelf; if so, assign a "shelf" property
					// 	const i = savedGems.findIndex((bookOnShelf) => bookOnShelf.id === book.id);
					// 	if (i !== -1) {
					// 		book.shelf = savedGems[i].shelf;
					// 	}
					// 	return book;
					// });
					// this.setState({
					// 	searchResults: updatedSearchResults
					// });
				})
				.catch((error) => console.error('inside app.js', error));
		}
	};

	render() {
		const { onShelfChange } = this.props;
		const { query, searchResults } = this.state;

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<div className="search-books-input-wrapper">
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
					</div>
				</div>

				<div className="search-books-results">
					<ul className="books-grid">
						{searchResults.length > 0 ? (
							searchResults.map((gem) => (
								<li key={gem.name}>
									{/*<SearchResultItem data={data} onShelfChange={onShelfChange} /> */}
									{gem.name}
								</li>
							))
						) : (
							<li>No results found</li>
						)}
					</ul>
				</div>
			</div>
		);
	}
}

export default App;
