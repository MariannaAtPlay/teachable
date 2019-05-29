import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
	return (
		<header>
			<nav>
				<NavLink exact to="/" activeClassName="active">
					Search
				</NavLink>
				<NavLink to="/saved" activeClassName="active">
					Saved Gems
				</NavLink>
				<a href="https://teachable.com/" className="teachable-logo">
					<img src="/teachable-logo-white.svg" alt="Teachable Website" />
				</a>
			</nav>
		</header>
	);
};

export default Header;
