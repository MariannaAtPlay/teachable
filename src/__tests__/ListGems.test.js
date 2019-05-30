import React from 'react';
import { render } from 'react-testing-library';
import ListGems from '../ListGems';

const gems = [
	{
		documentation_uri: 'http://api.rubyonrails.org',
		metadata: {},
		homepage_uri: 'http://rubyonrails.org',
		bug_tracker_uri: 'http://github.com/rails/rails/issues',
		project_uri: 'https://rubygems.org/gems/rails',
		version: '5.2.3',
		sha: 'f9b51b66a91d556d63d36d04449ecc23867683f99531db21eb7a263be2d7ecdc',
		platform: 'ruby',
		changelog_uri: null,
		source_code_uri: 'http://github.com/rails/rails',
		licenses: ['MIT'],
		gem_uri: 'https://rubygems.org/gems/rails-5.2.3.gem',
		downloads: 173386447,
		mailing_list_uri: 'http://groups.google.com/group/rubyonrails-talk',
		name: 'rails',
		wiki_uri: '',
		version_downloads: 449080,
		authors: 'David Heinemeier Hansson',
		info:
			'Ruby on Rails is a full-stack web framework optimized for programmer happiness and sustainable productivity. It encourages beautiful code by favoring convention over configuration.'
	},
	{
		documentation_uri: 'http://www.rubydoc.info/gems/sprockets-rails/3.2.1',
		metadata: {},
		homepage_uri: 'https://github.com/rails/sprockets-rails',
		bug_tracker_uri: '',
		project_uri: 'https://rubygems.org/gems/sprockets-rails',
		version: '3.2.1',
		sha: 'e1963a39cf9ffb0d46cdb1dd5cd36769489a56215865a7c7befd978bea156429',
		platform: 'ruby',
		changelog_uri: null,
		source_code_uri: 'http://github.com/rails/sprockets-rails',
		licenses: ['MIT'],
		gem_uri: 'https://rubygems.org/gems/sprockets-rails-3.2.1.gem',
		downloads: 117370207,
		mailing_list_uri: '',
		name: 'sprockets-rails',
		wiki_uri: '',
		version_downloads: 22869707,
		authors: 'Joshua Peek',
		info: 'Sprockets Rails integration'
	}
];

it('displays a list of gems', () => {
	const { getAllByText } = render(<ListGems gems={gems} handleSaveChange={() => {}} />);

	const items = getAllByText(/[0-9,]+ downloads/);
	expect(items).toHaveLength(2);
});
