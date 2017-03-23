/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';

import Gridicon from 'gridicons';
import Item from 'components/header-nav/item';

export default class HeaderNav extends Component {
	static propTypes = {
		options: PropTypes.arrayOf(
			PropTypes.shape( {
				label: PropTypes.string.isRequired,
				icon: PropTypes.string,
				link: PropTypes.string
			} )
		)
	};

	static defaultProps = {
		options: []
	}

	constructor( props ) {
		super( props );

		this.state = {
			selected: props.default,
			collapsed: true,
			width: 99999
		};
	}

	componentDidMount() {
		this.onResize();

		window.addEventListener( 'resize', this.onResize.bind( this ) );
		window.addEventListener( 'scroll', this.onScroll.bind( this ) );
	}

	componentWillUnmount() {
		window.removeEventListener( 'resize', this.onResize.bind( this ) );
		window.removeEventListener( 'scroll', this.onScroll.bind( this ) );
	}

	render() {
		const className = classNames(
			'header-nav',
			{ 'is-collapsed': this.state.collapsed }
		);

		const ellipsisClass = classNames(
			'header-nav__ellipsis',
			{ 'is-open': ! this.state.collapsed }
		);

		return (
			<div className={ className }>
				{ this.isDroppable( this.state.width ) &&
					<div className="header-nav__select" onClick={ this.toggleList.bind( this ) }>
						<Item
							isSelected={ true }
							label={ this.getSelected().label }
							icon={ this.getSelected().icon }
						/>
						<Gridicon icon="chevron-down" className="header-nav__select__icon" />
					</div>
				}
				<div className="header-nav__wrapper">
					<div className="header-nav__items">
						{ this.renderItems() }
					</div>
				</div>
				{ this.isFoldable( this.state.width, this.props.options ) && (
					<div className="header-nav__switch">
						<Gridicon icon="ellipsis" className={ ellipsisClass } onClick={ this.toggleList.bind( this ) } />
					</div>
				)}
			</div>
		);
	}

	renderItems() {
		return this.props.options.map( ( item, index ) =>
			<Item
				key={ index }
				isSelected={ this.state.selected.label === item.label }
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

		this.setState( ( state ) => ( {
			selected: option,
			collapsed: this.isDroppable( state.width ) || state.collapsed
		} ) );
	}

	toggleList() {
		this.setState( ( state ) => ( {
			collapsed: ! state.collapsed
		} ) );
	}

	onScroll() {
		this.setState( ( state ) => ( {
			collapsed: state.collapsed || this.isDroppable( state.width )
		} ) );
	}

	onResize() {
		const currentWidth = findDOMNode( this ).offsetWidth;

		this.setState( ( state, props ) => ( {
			width: currentWidth,
			collapsed: state.collapsed || this.hasChangedView( state.width, currentWidth, props.options )
		} ) );
	}

	hasChangedView( oldWidth, newWidth, options ) {
		const min = Math.min( oldWidth, newWidth );
		const max = Math.max( oldWidth, newWidth );

		return ( this.isDroppable( min ) && ! this.isDroppable( max ) ) ||
			( this.isFoldable( min, options ) && ! this.isFoldable( max, options ) );
	}

	isFoldable( width, options ) {
		return 660 < width && width < options.length * 110 + 50;
	}

	isDroppable( width ) {
		return width < 661;
	}

	getSelected() {
		return this.props.options.reduce(
			( selected, current ) => current === this.state.selected ? current : selected
		);
	}
}
