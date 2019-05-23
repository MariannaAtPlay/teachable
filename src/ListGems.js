import React, { Fragment } from 'react';
import ListItem from './ListItem';

const ListGems = (props) => {
	const { gems, handleSaveChange } = props;

	return (
		<main>
			{gems && gems.length > 0 ? (
				<Fragment>
					<h3>Your Saved Gems</h3>
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
		</main>
	);
};

export default ListGems;
