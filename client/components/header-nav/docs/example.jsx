/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import HeaderNav from 'components/header-nav';
import Item from 'components/header-nav/item';

const HeaderNavExample = () => {
	const options = [
		{ value: 'new', label: 'New', icon: 'star' },
		{ value: 'photo', label: 'Photo', icon: 'camera' },
		{ value: 'portfolio', label: 'Portfolio', icon: 'custom-post-type' }
	];

	return (
		<div>
			<HeaderNav options={ options } />
		</div>
	);
}

HeaderNavExample.displayName = 'HeaderNav';

export default HeaderNavExample;
