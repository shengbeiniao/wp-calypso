/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import emailValidator from 'email-validator';

/**
 * Internal dependencies
 */
import Button from 'components/button';
import EmptyContent from 'components/empty-content';

import config from 'config';
import debugFactory from 'debug';
import { getCurrentUser } from 'state/current-user/selectors';
import { getCurrentQueryArguments } from 'state/ui/selectors';
import { localize } from 'i18n-calypso';
import wpcom from 'lib/wp';

const debug = debugFactory( 'calypso:magic-login' );

class HandleEmailedLinkForm extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			hasSubmitted: false,
		};
	}

	componentWillMount() {
		const { emailAddress, token, tokenTime } = this.props;

		if ( emailAddress && emailValidator.validate( emailAddress ) && token && tokenTime ) {
			return;
		}

		window.location.replace( '/login/link-has-expired' );
	}

	handleSubmit( event ) {
		event.preventDefault();

		debug( 'form submitted!' );

		this.setState( {
			hasSubmitted: true,
		} );

		const postData = {
			email: this.props.emailAddress,
			token: this.props.token,
			tt: this.props.tokenTime,
		};

		debug( 'POST /auth/handle-login-email-link', postData );

		wpcom.undocumented().handleMagicLoginToken( postData, ( err, data ) => {
			debug( 'response /auth/handle-login-email-link', data );
			if ( err ) {
				window.location.replace( '/login/link-has-expired' );
				return;
			}
			const { redirect_to } = data;
			if ( redirect_to.match( /^(https:\/\/wordpress\.com|http:\/\/calypso\.localhost:3000)(\/|$)/ ) ) {
				debug( 'redirecting: ' + redirect_to );
				window.location.replace( redirect_to );
			} else {
				window.location.replace( '/' );
			}
		} );
	}

	render() {
		const { currentUser, emailAddress, translate } = this.props;
		const action = (
			<Button primary disabled={ !! this.state.hasSubmitted } onClick={ e => this.handleSubmit( e ) }>
				{ translate( 'Finish Login' ) }
			</Button>
		);
		const title =
			this.props.clientId === config( 'wpcom_signup_id' )
				? translate( 'Continue to WordPress.com' )
				: translate( 'Continue to WordPress.com on your WordPress app' );
		const line = [
			translate(
				'Logging in as %(emailAddress)s', {
					args: {
						emailAddress,
					}
				}
			)
		];

		if ( currentUser && currentUser.username ) {
			line.push( <p>{
				translate( 'NOTE: You are already logged in as user: %(user)s', {
					args: {
						user: currentUser.username,
					}
				} ) }<br />
				{ translate( 'Continuing will switch users.' ) }
				</p> );
		}

		return (
			<EmptyContent
				action={ action }
				illustration={ '/calypso/images/drake/drake-nosites.svg' }
				illustrationWidth={ 500 }
				line={ line }
				secondaryAction={ translate( 'Enter a password instead' ) }
				secondaryActionURL={ config( 'login_url' ) }
				title={ title }
				/>
		);
	}
}

const mapState = state => {
	const queryArguments = getCurrentQueryArguments( state );
	const {
		client_id: clientId,
		email: emailAddress,
		token,
		tt: tokenTime
	} = queryArguments;

	return {
		currentUser: getCurrentUser( state ),
		clientId,
		emailAddress,
		token,
		tokenTime,
	};
};

export default connect( mapState )( localize( HandleEmailedLinkForm ) );
