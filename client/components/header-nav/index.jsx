/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Item from 'components/header-nav/item';

export default class HeaderNav extends Component {
	static propTypes = {
		options: PropTypes.arrayOf(
			PropTypes.shape( {
				value: PropTypes.string.isRequired,
				label: PropTypes.string.isRequired,
				icon: PropTypes.string
			} )
		)
	};

	static defaultProps = {
		options: []
	}

	constructor( props ) {
		super( props );

		this.state = {
			selected: undefined
		};
	}

	render() {
		const className = classNames( {
			'header-nav': true
		} );

		return (
			<div className={ className }>
				<div className="header-nav__panel">
					{ this.getItems() }
				</div>
			</div>
		);
	}

	getItems() {
		return this.props.options.map( ( item, index ) =>
			<Item
				key={ index }
				isSelected={ this.state.selected === item.value }
				onClick={ this.selectItem.bind( this, item ) }
				tabIndex={ index }
				label={ item.label }
				icon={ item.icon }
			/>
		);
	}

	selectItem( option ) {
		if ( ! option ) {
			return;
		}

		if ( this.props.onSelect ) {
			this.props.onSelect( option );
		}

		this.setState( {
			selected: this.state.selected === option.value ? undefined : option.value,
			keyboardNavigation: false
		} );
	}
}
