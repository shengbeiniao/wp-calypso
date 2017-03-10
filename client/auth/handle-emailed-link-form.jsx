/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import emailValidator from 'email-validator';
import { pick } from 'lodash';

/**
 * Internal dependencies
 */
import FormButton from 'components/forms/form-button';
import FormFieldset from 'components/forms/form-fieldset';
import LoggedOutForm from 'components/logged-out-form';
import LoggedOutFormFooter from 'components/logged-out-form/footer';
import LoggedOutFormLinks from 'components/logged-out-form/links';
import LoggedOutFormLinkItem from 'components/logged-out-form/link-item';

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

	handleSubmit( event ) {
		event.preventDefault();

		debug( 'form submitted!' );

		this.setState( {
			hasSubmitted: true,
		} );

		const postData = pick( this.props.queryArguments, [ 'email', 'token', 'tt' ] );

		debug( 'POST /auth/handle-login-email-link', postData );

		wpcom.undocumented().handleMagicLoginToken( postData, ( err, data ) => {
			debug( 'response /auth/handle-login-email-link', data );
			if ( err ) {
				// @TODO redirect to "expired or not working" page
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

	doingAppLogin() {
		const { client_id: clientId } = this.props.queryArguments;
		return clientId && clientId !== config( 'wpcom_signup_id' );
	}

	render() {
		const { currentUser, queryArguments, translate } = this.props;
		const { email: emailAddress, token, tt: tokenTime } = queryArguments;
		if ( ! ( emailAddress && token && tokenTime ) ) {
			// @TODO redirect? 400 error?
			return (
				<div>{ 'Invalid Arguments' }</div>
			);
		}

		if ( ! emailValidator.validate( emailAddress ) ) {
			// @TODO redirect? 400 error?
			return (
				<div>{ 'Invalid Email' }</div>
			);
		}

		const doingAppLogin = this.doingAppLogin();

		return (
			<div>
				<LoggedOutForm onSubmit={ e => this.handleSubmit( e ) }>
					{ doingAppLogin
						? <p>{ translate( 'Continue to WordPress.com on your WordPress app' ) }</p>
						: <p>{ translate( 'Continue to WordPress.com' ) }</p>
					}
					<p>{
						translate(
							'Logging in as %(emailAddress)s', {
								args: {
									emailAddress,
								}
							}
						)
					}</p>
					{ currentUser && currentUser.username
						? <p>{
							translate( 'NOTE: You are already logged in as user: %(user)s', {
								args: {
									user: currentUser.username,
								}
							} ) }<br />
							{ translate( 'Continuing will switch users.' ) }
						</p> : null
					}
					<FormFieldset>
						<LoggedOutFormFooter>
							<FormButton primary disabled={ !! this.state.hasSubmitted }>
								{ translate( 'Finish Login' ) }
							</FormButton>
						</LoggedOutFormFooter>
					</FormFieldset>
				</LoggedOutForm>
				<LoggedOutFormLinks>
					<LoggedOutFormLinkItem href={ config( 'login_url' ) }>
						{ translate( 'Enter a password instead' ) }
					</LoggedOutFormLinkItem>
				</LoggedOutFormLinks>
			</div>
		);
	}
}

const mapState = state => {
	return {
		currentUser: getCurrentUser( state ),
		queryArguments: getCurrentQueryArguments( state ),
	};
};

export default connect( mapState )( localize( HandleEmailedLinkForm ) );
