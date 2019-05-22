import React from 'react';
import ListItem from './ListItem';

const ListGems = (props) => {
	const { gems, handleSaveChange } = props;

	return (
		<ul>
			{gems &&
				gems.map((gemInfo) => (
					<ListItem
						gemInfo={gemInfo}
						handleSaveChange={handleSaveChange}
						saved="true"
						key={gemInfo.name}
					/>
				))}
		</ul>
	);
};

export default ListGems;
