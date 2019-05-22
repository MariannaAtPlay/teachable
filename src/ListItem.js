import React from 'react';

const SearchResultItem = (props) => {
	const { name, version, downloads, info, project_uri } = props.gemInfo;
	const { handleSaveChange, saved } = props;

	return (
		<li>
			<a href={project_uri} className="gem">
				<span className="gem_info">
					<h2 className="gem_name">
						{name}
						<span>{version}</span>
					</h2>
					<p>{info}</p>
					{Number(downloads).toLocaleString('en')}
				</span>
			</a>
			<button onClick={(e) => handleSaveChange(props.gemInfo, saved, e)}>
				{saved ? 'Unsave' : 'Save'}
			</button>
		</li>
	);
};

export default SearchResultItem;
