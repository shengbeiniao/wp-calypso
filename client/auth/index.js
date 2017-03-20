/**
 * External dependencies
 */
import page from 'page';

/**
 * Internal dependencies
 */
import config from 'config';
import controller from './controller';

module.exports = function() {
	if ( config.isEnabled( 'oauth' ) ) {
		page( '/login', controller.login );
		page( '/authorize', controller.authorize );
		page( '/api/oauth/token', controller.getToken );
	}

	if ( config.isEnabled( 'magic-login-request' ) ) {
		page( '/login/send-me-a-link', controller.magicLoginRequestEmailForm );
		page( '/login/link-was-sent', controller.magicLoginLinkWasSent );
	}
	if ( config.isEnabled( 'magic-login-handle' ) ) {
		page( '/login/handle-emailed-link', controller.magicLoginClickHandler );
		page( '/login/link-has-expired', controller.magicLoginHasExpired );
	}
};
