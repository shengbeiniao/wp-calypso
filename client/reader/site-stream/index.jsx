/**
 * External dependencies
 */
import React from 'react';
import { localize } from 'i18n-calypso';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import DocumentHead from 'components/data/document-head';
import RefreshFeedHeader from 'blocks/reader-feed-header';
import EmptyContent from './empty';
import Stream from 'reader/stream';
import FeedError from 'reader/feed-error';
import { getSite } from 'state/reader/sites/selectors';
import { getFeed } from 'state/reader/feeds/selectors';
import QueryReaderSite from 'components/data/query-reader-site';
import QueryReaderFeed from 'components/data/query-reader-feed';

// TODO was it okay to remove checkForRedirect?  I think that always paid attentiont to prefer_feed which doesn't exist in the reducer
// we also always prefer the feed anyway...

// TODO - what is has_featured for?  I deleted a whole bit about featured feeds but probably need to put those back in

class SiteStream extends React.Component {

	static propTypes = {
		siteId: React.PropTypes.number.isRequired,
		className: React.PropTypes.string,
		showBack: React.PropTypes.bool,
		isDiscoverStream: React.PropTypes.bool,
	};

	static defaultProps = {
		showBack: true,
		className: 'is-site-stream',
		isDiscoverStream: false,
	};

	goBack = () => {
		if ( typeof window !== 'undefined' ) {
			window.history.back();
		}
	}

	render() {
		const { site, feed } = this.props;
		const emptyContent = ( <EmptyContent /> );
		const title = site
			? site.name
			: this.props.translate( 'Loading Site' );
		// let featuredStore = null;
		// let featuredContent = null;

		if ( ( site && site.is_error ) || ( feed && feed.is_error ) ) {
			return <FeedError sidebarTitle={ title } />;
		}

		return (
			<Stream
				{ ...this.props }
				listName={ title }
				emptyContent={ emptyContent }
				showPostHeader={ false }
				showSiteNameOnCards={ false }
				isDiscoverStream={ this.props.isDiscoverStream }
				shouldCombineCards={ false }
			>
				<DocumentHead title={ this.props.translate( '%s ‹ Reader', { args: title } ) } />
				<RefreshFeedHeader site={ site } feed={ feed } showBack={ this.props.showBack } />
				{ ! site && <QueryReaderSite siteId={ this.props.siteId } /> }
				{ ! feed && site && <QueryReaderFeed feedId={ site.feed_ID } /> }
			</Stream>

		);
	}
}

export default connect(
	( state, ownProps ) => {
		const site = getSite( state, ownProps.siteId );
		return {
			site: site,
			feed: site && getFeed( state, site.feed_ID ),
		};
	}
)( localize( SiteStream ) );
