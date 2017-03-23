/**
 * External dependencies
 */
import React, { Component } from 'react';
import omit from 'lodash/omit';

/**
 * Internal dependencies
 */
import Debug from 'debug';
const debug = Debug( 'calypso:site-observe-hoc' );

export const sitesObserver = ( WrappedComponent ) => {
	class SitesObserverComponent extends Component {

		constructor( props, context ) {
			super( props, context );

			this.update = this.update.bind( this );

			this.state = {};
		}

		componentDidMount() {
			this.props.sites.on( 'change', this.update );
			this.cacheSites();
		}

		componentWillUnmount() {
			this.props.sites.off( 'change', this.update );
		}

		update() {
			debug( 'Re-rendering ' + this.constructor.displayName + ' component.' );
			this.cacheSites();
		}

		cacheSites() {
			if ( this.props.sites ) {
				this.setState( { sites: Object.create( this.props.sites ) } );
			}
		}

		render() {
			return (
				<WrappedComponent
					sites={ this.state.sites || this.props.sites }
					{ ...omit( this.props, 'sites' ) }
				/>
			);
		}
	}

	const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
	SitesObserverComponent.displayName = `SitesObserver(${ wrappedComponentName })`;

	return SitesObserverComponent;
};

export default sitesObserver;
