/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import { noop, pick } from 'lodash';
/**
 * Internal dependencies
 */
import Button from 'components/button';
import AsyncLoad from 'components/async-load';

class CalendarButton extends Component {
	static propTypes = {
		children: PropTypes.element,
		type: PropTypes.string,

		// popover properties
		popoverPosition: PropTypes.string,

		// calendar properties
		siteId: PropTypes.number,
		onDateChange: PropTypes.func,
	};

	static defaultProps = {
		type: 'button',
		onDateChange: noop,
	};

	state = {
		showPopover: false,
	};

	setDate = date => {
		this.setState( { date } );
		this.props.onDateChange( date );
	};

	closePopover = () => this.setState( { showPopover: false } );

	togglePopover = () => this.setState( { showPopover: ! this.state.showPopover } );

	setPopoverReference = calendarButtonRef => ( this.reference = calendarButtonRef );

	render() {
		const buttonsProperties = Object.assign( {}, pick( this.props, [
			'compact',
			'primary',
			'scary',
			'busy',
			'type',
			'href',
			'borderless',
			'target',
			'rel',
		] ), {
			onClick: this.togglePopover,
			ref: this.setPopoverReference,
		} );

		const { popoverPosition, siteId, onDateChange } = this.props;
		const { showPopover } = this.state;

		return (
			<div className="calendar-button">
				<Button { ...buttonsProperties }>
					{ this.props.children }
				</Button>

				<AsyncLoad
					require="blocks/calendar-popover"
					context={ this.reference }
					siteId={ siteId }
					isVisible={ showPopover }
					position={ popoverPosition }

					onClose={ this.closePopover }
					onDateChange={ onDateChange }
				/>
			</div>
		);
	}
}

export default CalendarButton;
