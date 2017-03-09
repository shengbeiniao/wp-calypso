/**
 * External dependencies
 */
import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';

/**
 * Internal dependencies
 */
import useFakeDom from 'test/helpers/use-fake-dom';

describe( 'HeaderNav', function() {
	let HeaderNav;

	useFakeDom();
	before( () => {
		HeaderNav = require( '../' );
	} );

	it( 'should render as expected', function() {
		const wrapper = shallow( <HeaderNav title="Section">Content</HeaderNav> );

		expect( wrapper ).to.have.className( 'header-nav' );
		expect( wrapper ).to.have.text( 'Content' );
	} );
} );
