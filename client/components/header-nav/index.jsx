/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class HeaderNav extends Component {
	static propTypes = {
		children: PropTypes.node
	};

	render() {
		const { children } = this.props;
		const className = classNames( {
			'header-nav': true
		} );

		return (
			<div className={ className }>
				<div className="header-nav__panel">
					{ children }
				</div>
			</div>
		);
	}
}
