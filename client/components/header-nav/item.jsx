/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { noop } from 'lodash';

export const Item = props => {
	const {
		isSelected,
		tabIndex,
		onClick,
		label,
		icon
	} = props;

	const classes = classNames(
		'header-nav__item',
		{ 'is-selected': isSelected }
	);

	return (
		<li className={ classes }>
			<a
				className={ 'header-nav__link' }
				onClick={ onClick }
				tabIndex={ tabIndex }
				aria-selected={ isSelected }
				role="menuitem">
				<span className={ 'header-nav__icon' }>
					{ icon }
				</span>
				<span className={ 'header-nav__label' }>
					{ label }
				</span>
			</a>
		</li>
	);
};

Item.propTypes = {
	isSelected: PropTypes.bool,
	tabIndex: PropTypes.number,
	onClick: PropTypes.func,
	label: PropTypes.string.isRequired,
	icon: PropTypes.string
};

Item.defaultProps = {
	isSelected: false,
	tabIndex: 0,
	onClick: noop,
	icon: 'todo'
};

export default Item;
