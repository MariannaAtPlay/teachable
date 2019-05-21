import React from 'react';

const SearchResultItem = (props) => {
	const { name, version, downloads, info, project_uri } = props.gemInfo;
	const { handleSaveChange, saved } = props;

	return (
		<li>
			<a href={project_uri}>{name}</a>
			{version} {downloads} {info}{' '}
			<button onClick={(e) => handleSaveChange(name, saved, e)}>
				{saved ? 'Unsave' : 'Save'}
			</button>
		</li>
	);
};

export default SearchResultItem;
