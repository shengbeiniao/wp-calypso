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
		{ value: 'new', label: 'New' },
		{ value: 'photo', label: 'Photo' },
		{ value: 'portfolio', label: 'Portfolio' }
	];

	return (
		<div>
			<HeaderNav options={ options } />
		</div>
	);
}

HeaderNavExample.displayName = 'HeaderNav';

export default HeaderNavExample;
