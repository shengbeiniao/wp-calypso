/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { flowRight, partialRight, pick } from 'lodash';

/**
 * Internal dependencies
 */
import Main from 'components/main';
import SidebarNavigation from 'my-sites/sidebar-navigation';
import SiteSettingsNavigation from 'my-sites/site-settings/navigation';
import SeoSettingsMain from 'my-sites/site-settings/seo-settings/main';
import SeoSettingsHelpCard from 'my-sites/site-settings/seo-settings/help';
import AnalyticsSettings from 'my-sites/site-settings/form-analytics';
import JetpackSiteStats from 'my-sites/site-settings/jetpack-site-stats';
import RelatedPosts from 'my-sites/site-settings/related-posts';
import AmpWpcom from 'my-sites/site-settings/amp/wpcom';
import wrapSettingsForm from 'my-sites/site-settings/wrap-settings-form';
import { getSelectedSite, getSelectedSiteId } from 'state/ui/selectors';
import { isJetpackSite, siteSupportsJetpackSettingsUi } from 'state/sites/selectors';

const SiteSettingsTraffic = ( {
	fields,
	jetpackSettingsUiSupported,
	handleAutosavingToggle,
	handleSubmitForm,
	isJetpack,
	isRequestingSettings,
	isSavingSettings,
	setFieldValue,
	site,
	sites,
	submitForm,
	trackEvent,
	updateFields,
	upgradeToBusiness
} ) => (
	<Main className="traffic__main site-settings">
		<SidebarNavigation />
		<SiteSettingsNavigation site={ site } section="traffic" />

		{ jetpackSettingsUiSupported &&
			<JetpackSiteStats
				handleAutosavingToggle={ handleAutosavingToggle }
				setFieldValue={ setFieldValue }
				isSavingSettings={ isSavingSettings }
				isRequestingSettings={ isRequestingSettings }
				fields={ fields }
			/>
		}
		<RelatedPosts
			onSubmitForm={ handleSubmitForm }
			handleAutosavingToggle={ handleAutosavingToggle }
			isSavingSettings={ isSavingSettings }
			isRequestingSettings={ isRequestingSettings }
			fields={ fields }
		/>
		{
			! isJetpack &&
			<AmpWpcom
				submitForm={ submitForm }
				trackEvent={ trackEvent }
				updateFields={ updateFields }
				isSavingSettings={ isSavingSettings }
				isRequestingSettings={ isRequestingSettings }
				fields={ fields }
			/>
		}
		<AnalyticsSettings />
		<SeoSettingsHelpCard />
		<SeoSettingsMain sites={ sites } upgradeToBusiness={ upgradeToBusiness } />
	</Main>
);

SiteSettingsTraffic.propTypes = {
	sites: PropTypes.object.isRequired,
	upgradeToBusiness: PropTypes.func.isRequired,
};

const connectComponent = connect(
	( state ) => {
		const site = getSelectedSite( state );
		const siteId = getSelectedSiteId( state );
		const isJetpack = isJetpackSite( state, siteId );
		const jetpackSettingsUiSupported = isJetpack && siteSupportsJetpackSettingsUi( state, siteId );

		return {
			site,
			isJetpack,
			jetpackSettingsUiSupported,
		};
	}
);

const getFormSettings = partialRight( pick, [
	'stats',
	'admin_bar',
	'hide_smile',
	'count_roles',
	'roles',
	'jetpack_relatedposts_allowed',
	'jetpack_relatedposts_enabled',
	'jetpack_relatedposts_show_headline',
	'jetpack_relatedposts_show_thumbnails',
	'amp_is_supported',
	'amp_is_enabled',
] );

export default flowRight(
	connectComponent,
	wrapSettingsForm( getFormSettings )
)( SiteSettingsTraffic );
