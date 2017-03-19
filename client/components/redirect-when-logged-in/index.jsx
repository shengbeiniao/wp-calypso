/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import debugFactory from 'debug';
import { getCurrentUserId } from 'state/current-user/selectors';

const debug = debugFactory( 'calypso:redirect-when-logged-in' );

class RedirectWhenLoggedIn extends React.Component {
	doTheRedirect() {
		debug( this.props.replaceCurrentLocation ? 'replace' : 'assign', this.props.redirectTo );
		this.props.replaceCurrentLocation
			? window.location.replace( this.props.redirectTo )
			: window.location.assign( this.props.redirectTo );
	}

	storageEventHandler( e ) {
		if ( e.key !== 'wpcom_user' ) {
			return;
		}
		try {
			const newValue = JSON.parse( e.newValue );
			if ( newValue.ID ) {
				this.doTheRedirect();
			}
		} catch ( ex ) {}
	}

	componentWillMount() {
		if ( this.props.userId ) {
			return this.doTheRedirect();
		}
		debug( 'adding storage event listener' );
		window.addEventListener( 'storage', this.storageEventHandler.bind( this ) );
	}

	componentWillUnmount() {
		debug( 'removing storage event listener' );
		window.removeEventListener( 'storage', this.storageEventHandler.bind( this ) );
	}

	render() {
		return null;
	}
}

RedirectWhenLoggedIn.propTypes = {
	redirectTo: React.PropTypes.string.isRequired,
	replaceCurrentLocation: React.PropTypes.bool,
};

const mapState = state => {
	return {
		userId: getCurrentUserId( state ),
	};
};

export default connect( mapState )( RedirectWhenLoggedIn );
