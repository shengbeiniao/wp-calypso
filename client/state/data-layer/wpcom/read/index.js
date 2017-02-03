/**
 * Internal dependencies
 */
import { mergeHandlers } from 'state/data-layer/utils';
import teams from './teams';
import follows from './follows';

export default mergeHandlers(
	teams,
	follows,
);
