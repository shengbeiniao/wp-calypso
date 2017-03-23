/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { noop } from 'lodash';

import Gridicon from 'gridicons';

export const Item = props => {
	const {
		isSelected,
		tabIndex,
		onClick,
		label,
		icon,
		link
	} = props;

	const classes = classNames(
		'header-nav__item',
		{ 'is-selected': isSelected }
	);

	return (
		<a
			href={ link }
			className={ classes }
			onClick={ onClick }
			tabIndex={ tabIndex }
			aria-selected={ isSelected }
			role="menuitem">
			<Gridicon className="header-nav__icon" icon={ icon } size={ 24 } />
			<div className={ 'header-nav__label' }>
				{ label }
			</div>
		</a>
	);
};

Item.propTypes = {
	isSelected: PropTypes.bool,
	tabIndex: PropTypes.number,
	onClick: PropTypes.func,
	label: PropTypes.string.isRequired,
	icon: PropTypes.string,
	link: PropTypes.string.isRequired
};

Item.defaultProps = {
	isSelected: false,
	tabIndex: 0,
	onClick: noop,
	icon: 'todo'
};

export default Item;
