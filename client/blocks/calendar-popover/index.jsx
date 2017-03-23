/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { noop, pick } from 'lodash';

/**
 * Internal dependencies
 */
import {
	getSiteGmtOffset,
	getSiteTimezoneValue,
} from 'state/selectors';
import Popover from 'components/popover';
import PostSchedule from 'components/post-schedule';

class CalendarPopover extends Component {
	static propTypes = {
		children: PropTypes.element,

		// popover properties
		position: PropTypes.string,

		// calendar properties
		gmtOffset: PropTypes.number,
		timezoneValue: PropTypes.string,
		onDateChange: PropTypes.func,
	};

	static defaultProps = {
		timezoneValue: '',
		onDateChange: noop,
	};

	state = { date: null };

	setDate = date => {
		this.setState( { date } );
		this.props.onDateChange( date );
	};

	renderScheduler() {
		const schedulerProperties = Object.assign( {}, pick( this.props, [
			'events',
			'posts',
			'site',
			'onDateChange',
			'onMonthChange',
		] ), {
			className: 'calendar-popover__scheduler',
		} );

		return (
			<PostSchedule
				{ ...schedulerProperties }
				selectedDay={ this.state.date }
				gmtOffset={ this.props.gmtOffset }
				timezone={ this.props.timezoneValue }

				onDateChange={ this.setDate }
			/>
		);
	}

	render() {
		return (
			<div className="calendar-popover">
				<Popover
					context={ this.props.context }
					className="calendar-popover__popover"
					isVisible={ this.props.isVisible }
					onClose={ this.props.onClose }
					position={ this.props.popover }
				>
					{ this.renderScheduler() }
				</Popover>
			</div>
		);
	}
}

export default connect(
	( state, { siteId } ) => ( {
		gmtOffset: getSiteGmtOffset( state, siteId ),
		timezoneValue: getSiteTimezoneValue( state, siteId ),
	} )
 )( CalendarPopover );
