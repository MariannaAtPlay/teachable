import React from 'react';

const SearchResultItem = (props) => {
	const { name, version, downloads, info, project_uri } = props.gemInfo;
	const { handleSaveChange, saved } = props;

	return (
		<li>
			<div className="gem_info">
				<a href={project_uri}>
					<span className="gem_name">{name}</span>
					(version {version})
				</a>
				<button
					onClick={(e) => handleSaveChange(props.gemInfo, saved, e)}
					className="button right"
				>
					{saved ? 'Unsave' : 'Save'}
				</button>
			</div>
			<p>{info}</p>
			<p>{Number(downloads).toLocaleString('en')} downloads</p>
		</li>
	);
};

export default SearchResultItem;
