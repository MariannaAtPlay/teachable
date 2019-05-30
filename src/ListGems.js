import React, { Fragment } from 'react';
import ListItem from './ListItem';

const ListGems = (props) => {
	const { gems, handleSaveChange, localStorageAvailable } = props;

	return (
		<main>
			{gems && gems.length > 0 ? (
				<Fragment>
					<h2>Your Saved Gems</h2>
					<ul>
						{gems.map((gemInfo) => (
							<ListItem
								gemInfo={gemInfo}
								handleSaveChange={handleSaveChange}
								saved="true"
								key={gemInfo.name}
							/>
						))}
					</ul>
				</Fragment>
			) : (
				<h3>You don't have any gems saved</h3>
			)}

			{!localStorageAvailable ? (
				<h4>
					Note: LocalStorage is not available, your gems will not be saved after
					you close this page
				</h4>
			) : null}
		</main>
	);
};

export default ListGems;
