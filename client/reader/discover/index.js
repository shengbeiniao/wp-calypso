/**
 * External dependencies
 */
import page from 'page';

/**
 * Internal dependencies
 */
import controller from './controller';
import readerController from 'reader/controller';

export default function() {
	page( '/discover',
		readerController.preloadReaderBundle,
		readerController.updateLastRoute,
		readerController.loadSubscriptions,
		readerController.initAbTests,
		readerController.sidebar,
		controller.discover
	);
}
