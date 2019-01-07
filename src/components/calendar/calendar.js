/* eslint-disable no-nested-ternary */
import { utils } from '../../utils/utils';
import { DOM } from '../../utils/dom';
import { stringUtils } from '../../utils/string';
import { MonthView } from '../monthview/monthview';
import { Locale } from '../locale/locale';
import { Tmpl } from '../tmpl/tmpl';

// Settings and Options
const COMPONENT_NAME = 'calendar';

const COMPONENT_NAME_DEFAULTS = {
  eventTypes: [
    { id: 'example', label: 'Example', color: 'emerald07', checked: true, click: () => {} },
  ],
  events: [],
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  showViewChanger: true,
  onRenderMonth: null,
  template: null,
  upcomingEventDays: 14,
  modalTemplate: null
};

/**
 * Calendar - Full eventing calendar.
 * @class Calendar
 * @param {string} element The plugin element for the constuctor
 * @param {string} [settings] The settings element.
 * @param {array} [settings.eventTypes] An array of objects with data for the event types.
 * @param {array} [settings.events] An array of objects with data for the events.
 * @param {array} [settings.month] Initial month to show.
 * @param {array} [settings.year] Initial year to show.
 * @param {array} [settings.upcomingEventDays=14] How many days in advance should we show in the upcoming events pane.
 * @param {boolean} [settings.showViewChanger] If false the dropdown to change views will not be shown.
 * @param {function} [settings.onRenderMonth] Fires when a month is rendered, allowing you to pass back events or event types to show.
 * @param {function} [settings.onSelected] Fires when a month day is clicked. Allowing you to do something.
 * @param {string} [settings.template] The ID of the template used for the events.
 * @param {string} [settings.modalTemplate] The ID of the template used for the modal dialog on events.
 */
function Calendar(element, settings) {
  this.settings = utils.mergeSettings(element, settings, COMPONENT_NAME_DEFAULTS);
  this.element = $(element);
  this.init();
}

// Plugin Methods
Calendar.prototype = {

  /**
   * Do initialization, build up and / or add events ect.
   * @returns {object} The Component prototype, useful for chaining.
   */
  init() {
    this.isRTL = Locale.isRTL();

    return this
      .build()
      .handleEvents();
  },

  /**
   * Add any needed markup to the component.
   * @returns {object} The Calendar prototype, useful for chaining.
   * @private
   */
  build() {
    this
      .renderEventTypes()
      .renderMonth()
      .renderViewChanger();

    return this;
  },

  /**
   * Render the eventType Section
   * @returns {object} The Calendar prototype, useful for chaining.
   * @private
   */
  renderEventTypes() {
    this.eventTypeContainer = document.querySelector('.calendar-event-types');
    if (!this.eventTypeContainer) {
      return false;
    }

    let eventTypeMarkup = '';
    for (let i = 0; i < this.settings.eventTypes.length; i++) {
      const eventType = this.settings.eventTypes[i];
      eventTypeMarkup += `<input type="checkbox" class="checkbox ${eventType.color}07" name="${eventType.id}" id="${eventType.id}" checked="${eventType.checked ? 'true' : 'false'}" ${eventType.disabled ? 'disabled="true"' : ''} />
        <label for="${eventType.id}" class="checkbox-label">${eventType.translationKey ? Locale.translate(eventType.translationKey) : eventType.label}</label><br/>`;
    }
    this.eventTypeContainer.innerHTML = eventTypeMarkup;
    this.element.initialize();
    return this;
  },

  /**
   * Render the monthview calendar
   * @returns {object} The Calendar prototype, useful for chaining.
   * @private
   */
  renderMonth() {
    this.monthViewContainer = document.querySelector('.calendar .calendar-monthview');

    this.monthView = new MonthView(this.monthViewContainer, {
      onRenderMonth: this.settings.onRenderMonth,
      onSelected: this.settings.onSelected,
      selectable: true,
      month: this.settings.month,
      year: this.settings.year
    });
    this.monthViewHeader = document.querySelector('.calendar .monthview-header');
    this.renderAllEvents();
    return this;
  },

  /**
   * Render the upcoming events view
   * @param {object} event The Calendar event to show.
   * @private
   */
  appendUpcomingEvent(event) {
    this.upcomingEventsContainer = document.querySelector('.calendar-upcoming-events');
    if (!this.upcomingEventsContainer || event.daysUntil > 0) {
      return;
    }

    const daysUntil = Math.abs(event.daysUntil);
    if (daysUntil < 0 || daysUntil > this.settings.upcomingEventDays) {
      return;
    }

    const upcomingEvent = document.createElement('a');
    upcomingEvent.setAttribute('href', '#');
    upcomingEvent.setAttribute('data-key', event.startKey);
    DOM.addClass(upcomingEvent, 'calendar-upcoming-event');

    let upcomingEventsMarkup = '';
    const startDay = Locale.formatDate(event.starts, { pattern: 'd' });
    const endDay = Locale.formatDate(event.ends, { pattern: 'd' });
    let dateRange = `${Locale.formatDate(event.starts, { pattern: 'MMMM' })} ${startDay === endDay ? startDay : `${startDay}-${endDay}`}, ${Locale.formatDate(event.starts, { pattern: 'yyyy' })}`;

    if (parseInt(endDay, 10) < parseInt(startDay, 10)) {
      const nextMonth = new Date(event.starts);
      nextMonth.setDate(1);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      const endYear = nextMonth.getFullYear();
      dateRange = `${Locale.formatDate(event.starts, { pattern: 'MMMM' })} ${startDay} - ${Locale.formatDate(nextMonth, { pattern: 'MMMM' })} ${endDay}, ${endYear}`;
    }

    upcomingEventsMarkup += `
      <span class="calendar-upcoming-date">${dateRange}</span>
      <span class="calendar-upcoming-event-color ${event.color || ''}">${event.color || ''}</span>
      <span class="calendar-upcoming-description">${event.subject || ''}</span>
      <span class="calendar-upcoming-status-text">${event.status || ''}</span>
      <span class="calendar-upcoming-duration">${event.isDays ? event.duration : event.durationHours} ${event.durationUnits || ''}</span>`;
    upcomingEvent.innerHTML = upcomingEventsMarkup;
    this.upcomingEventsContainer.appendChild(upcomingEvent);
  },

  /**
   * Render the dropdown to change views.
   * @returns {object} The Calendar prototype, useful for chaining.
   * @private
   */
  renderViewChanger() {
    if (!this.settings.showViewChanger) {
      return this;
    }
    const viewChangerHtml = `<label for="calendar-view-changer" class="label audible">${Locale.translate('ChangeView')}</label>
      <select id="calendar-view-changer" name="calendar-view-changer" class="dropdown">
        <option value="month" selected>${Locale.translate('Month')}</option>
        <option value="week" disabled>${Locale.translate('Week')}</option>
        <option value="day" disabled>${Locale.translate('Day')}</option>
        <option value="schedule" disabled>${Locale.translate('Schedule')}</option>
      </select>
    </div>`;
    $(this.monthViewHeader).append(viewChangerHtml);
    this.viewChangerHtml = $('#calendar-view-changer');
    this.viewChangerHtml.dropdown();
    return this;
  },

  /**
   * Render or re-render the events details section, using on the readonly or default eventTemplate
   * @param {string} eventId The event id
   * @private
   */
  renderEventDetails(eventId) {
    if (!this.settings.events) {
      return;
    }

    // Find the event data
    const eventData = this.settings.events.filter(event => event.id === eventId);
    if (!eventData) {
      return;
    }

    this.eventDetailsContainer = document.querySelector('.calendar-event-details');
    this.renderTmpl(eventData[0], this.settings.template, this.eventDetailsContainer);
  },

  /**
   * Render each of the events for the currently selected node
   * @private
   */
  renderSelectedEventDetails() {
    const dayEvents = document.querySelectorAll('.calendar td.is-selected .calendar-event');
    if (!dayEvents || dayEvents.length === 0) {
      this.clearEventDetails();
      return;
    }

    for (let i = 0; i < dayEvents.length; i++) {
      this.renderEventDetails(dayEvents[i].getAttribute('data-id'));
    }
  },

  /**
   * Clear all contents from the event details area.
   * @private
   */
  clearEventDetails() {
    this.eventDetailsContainer = document.querySelector('.calendar-event-details');
    if (this.eventDetailsContainer) {
      this.eventDetailsContainer.innerHTML = '';
    }
  },

  /**
   * Clear all contents from the upcoming events area.
   * @private
   */
  clearUpcomingEvents() {
    if (this.upcomingEventsContainer) {
      this.upcomingEventsContainer.innerHTML = '';
    }
  },

  /**
   * Get the currently unchecked filter types
   * @returns {array} The active types.
   * @private
   */
  filterEventTypes() {
    const checkboxes = this.eventTypeContainer.querySelectorAll('.checkbox');
    const types = [];

    for (let i = 0; i < checkboxes.length; i++) {
      const input = checkboxes[i];
      if (!input.checked) {
        types.push(input.getAttribute('id'));
      }
    }
    return types;
  },

  /**
   * Get the difference between two dates.
   * @private
   * @param {date} first The first date.
   * @param {date} second The second date.
   * @param {boolean} useHours The different in hours if true, otherways days.
   * @param {boolean} isFullDay Add an hour to include the full day to match the calendar.
   * @returns {number} The difference between the two dates.
   */
  dateDiff(first, second, useHours, isFullDay) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    let diff = Math.round((second - first) / (1000 * 60 * 60 * (useHours ? 1 : 24)));
    if (isFullDay) {
      diff += 1;
    }
    return diff;
  },

  /**
   * Render/ReRender the events attached to the settings.
   * @param {boolean} isCallback Will be set to true when a callback occurs
   * @returns {object} The Calendar prototype, useful for chaining.
   */
  renderAllEvents(isCallback) {
    if (this.settings.onRenderMonth && !isCallback) {
      this.callOnRenderMonth();
      return this;
    }

    const self = this;
    const filters = this.filterEventTypes();

    // Cleanup from previous renders
    this.visibleEvents = [];
    this.removeAllEvents();
    this.clearUpcomingEvents();
    this.clearEventDetails();

    // Clone and sort the array.
    const eventsSorted = this.settings.events.slice(0);
    eventsSorted.sort((a, b) => (a.starts < b.starts ? -1 : (a.starts > b.starts ? 1 : 0)));

    for (let i = 0; i < eventsSorted.length; i++) {
      const event = eventsSorted[i];
      if (filters.indexOf(event.type) > -1) {
        continue;
      }
      self.renderEvent(event);
    }

    this.renderSelectedEventDetails();
    return this;
  },

  /**
   * Render a single event on the ui, use in the loop and other functions.
   * @param  {object} event The event object.
   */
  renderEvent(event) {
    const self = this;

    // Check for events starting on this day , or only on this day.
    const startDate = new Date(event.starts);
    const startKey = stringUtils.padDate(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate(),
    );

    // Check for events extending onto this day
    const endDate = new Date(event.ends);
    const endKey = stringUtils.padDate(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate()
    );

    const days = self.monthView.dayMap.filter(day => day.key >= startKey && day.key <= endKey);
    event.endKey = endKey;
    event.startKey = startKey;
    event = this.addCalculatedFields(event);
    const idx = self.monthView.dayMap.findIndex(day => day.key >= startKey && day.key <= endKey);

    // Event is only on this day
    if (days.length === 1) {
      self.appendEvent(days[0].elem[0], event, 'event-day-start-end', idx);
    }

    // Event extends multiple days
    if (days.length > 1) {
      for (let l = 0; l < days.length; l++) {
        let cssClass = l === 0 ? 'event-day-start' : 'event-day-span';

        if (days.length - 1 === l) {
          cssClass = 'event-day-end';
        }
        self.appendEvent(days[l].elem[0], event, cssClass, idx);
      }
    }

    // Event extends multiple days
    this.appendUpcomingEvent(event, days, idx);
  },

  /**
   * Remove all events from the month.
   */
  removeAllEvents() {
    const moreEvents = this.monthViewContainer.querySelectorAll('.calendar-event-more');
    for (let i = 0; i < moreEvents.length; i++) {
      moreEvents[i].parentNode.removeChild(moreEvents[i]);
    }

    const calendarEvents = this.monthViewContainer.querySelectorAll('.calendar-event');
    for (let i = 0; i < calendarEvents.length; i++) {
      calendarEvents[i].parentNode.removeChild(calendarEvents[i]);
    }
  },

  /**
   * Add calculated fields to the event object.
   * @private
   * @param {object} event The starting event object
   * @returns {object} The event object with stuff added.
   */
  addCalculatedFields(event) {
    event.color = this.getEventTypeColor(event.type);
    event.duration = Math.abs(this.dateDiff(
      new Date(event.ends),
      new Date(event.starts),
      false,
      event.isFullDay
    ));
    event.durationUnits = event.duration > 1 ? Locale.translate('Days') : Locale.translate('Day');
    event.daysUntil = event.starts ? this.dateDiff(new Date(event.starts), new Date()) : 0;
    event.durationHours = this.dateDiff(new Date(event.starts), new Date(event.ends), true);
    event.isDays = true;
    if (event.isAllDay === undefined) {
      event.isAllDay = true;
    }

    if (event.durationHours < 24) {
      event.isDays = false;
      event.isAllDay = false;
      delete event.duration;
      event.durationUnits = event.durationHours > 1 ? Locale.translate('Hours') : Locale.translate('Hour');
    }
    if (event.isAllDay.toString() === 'true') {
      event.isDays = true;
      delete event.durationHours;
      event.durationUnits = event.duration > 1 ? Locale.translate('Days') : Locale.translate('Day');
      event.duration = this.dateDiff(new Date(event.starts), new Date(event.ends));
    }
    if (event.duration === 0 && event.isAllDay.toString() === 'true') {
      event.isDays = true;
      event.duration = 1;
      event.durationUnits = Locale.translate('Day');
    }
    if (event.starts) {
      const startsLocale = Locale.parseDate(event.starts, 'yyyy-MM-ddTHH:mm:ss.SSS');
      event.startsLocale = Locale.formatDate(startsLocale);
    }
    if (event.ends) {
      const endsLocale = Locale.parseDate(event.ends, 'yyyy-MM-ddTHH:mm:ss.SSS');
      event.endsLocale = Locale.formatDate(endsLocale);
    }
    event.eventTypes = this.settings.eventTypes;
    event.isAllDay = event.isAllDay.toString();
    if (event.isAllDay.toString() === 'false') {
      delete event.isAllDay;
    }
    return event;
  },

  /**
   * Add the ui event to the container.
   * @private
   * @param {object} container The container to append to
   * @param {object} event The event data object.
   * @param {string} type Type of event, can be event-day-start, event-day-start-end, event-day-span, event-day-end
   * @param {number} idx The dayMap index
   * @returns {object} The Calendar prototype, useful for chaining.
   */
  appendEvent(container, event, type, idx) {
    let node;
    const eventCnt = container.querySelectorAll('.calendar-event').length;

    if (idx > -1) {
      if (!this.monthView.dayMap[idx].events) {
        this.monthView.dayMap[idx].events = [];
      }
      this.monthView.dayMap[idx].events.push(event);
    }

    if (eventCnt >= 2) {
      const moreSpan = container.querySelector('.calendar-event-more');
      const moreText = Locale.translate('More').replace('...', '');
      if (!moreSpan) {
        node = document.createElement('span');
        DOM.addClass(node, 'calendar-event-more');
        node.innerHTML = `+ 1 ${moreText}`;
        node.setAttribute('data-count', 1);
        container.querySelector('.day-container').appendChild(node);
      } else {
        let cnt = moreSpan.getAttribute('data-count');
        cnt++;
        moreSpan.setAttribute('data-count', cnt);
        moreSpan.innerHTML = `+ ${cnt} ${moreText}`;
      }

      this.visibleEvents.push({ id: event.id, type: event.type, elem: node });
      return this;
    }

    node = document.createElement('a');
    DOM.addClass(node, 'calendar-event', event.color, type);
    node.setAttribute('data-id', event.id);

    node.innerHTML = `<div class="calendar-event-content">
      ${event.icon ? `<span class="calendar-event-icon"><svg class="icon" focusable="false" aria-hidden="true" role="presentation" data-status="${event.status}"><use xlink:href="#${event.icon}"></use></svg></span>` : ''}
      <span class="calendar-event-title">${event.shortSubject || event.subject}</span>
    </div>`;
    container.querySelector('.day-container').appendChild(node);

    // Show the full text if cut off
    if (!event.shortSubject) {
      node.setAttribute('title', event.subject);
      $(node).tooltip({
        beforeShow: (response, ui) => {
          const title = ui[0].querySelector('.calendar-event-title');
          const icon = ui[0].querySelector('.calendar-event-icon');
          const iconStatus = icon ? icon.querySelector('.icon').getAttribute('data-status') : '';

          if (title.offsetWidth > ui[0].scrollWidth - (icon ? icon.offsetWidth : 0)) {
            response(`${title.innerText}${iconStatus ? ` (${Locale.translate(iconStatus, false)})` : ''}`);
            return;
          }
          response(false);
        }
      });
    }

    this.visibleEvents.push({ id: event.id, type: event.type, elem: node });
    return this;
  },

  /**
   * Find the matching type and get the color.
   * @param {object} id The eventType id to find.
   * @param {object} event The event data object.
   * @returns {object} The Calendar prototype, useful for chaining.
   */
  getEventTypeColor(id) {
    let color = 'azure';
    if (!id) {
      return color;
    }

    const eventInfo = this.settings.eventTypes.filter(eventType => eventType.id === id);
    if (eventInfo.length === 1) {
      color = eventInfo[0].color || 'azure';
    }
    return color;
  },

  /**
   * Find the matching type and get the color.
   * @param {object} id The eventType id to find.
   * @param {object} event The event data object.
   * @returns {object} The Calendar prototype, useful for chaining.
   */
  getEventTypeLabel(id) {
    let type = '';
    if (!id) {
      return type;
    }

    const eventInfo = this.settings.eventTypes.filter(eventType => eventType.id === id);
    if (eventInfo.length === 1) {
      type = eventInfo[0].label;
    }
    return type;
  },

  /**
   * Sets up event handlers for this component and its sub-elements.
   * @returns {object} The Calendar prototype, useful for chaining.
   * @private
   */
  handleEvents() {
    this.element.on(`updated.${COMPONENT_NAME}`, () => {
      this.updated();
    });

    this.element.on(`monthrendered.${COMPONENT_NAME}`, () => {
      this.renderAllEvents();
    });

    this.element.on(`change.${COMPONENT_NAME}`, '.checkbox', () => {
      this.renderAllEvents(true);
    });

    $(this.monthViewContainer).on(`selected.${COMPONENT_NAME}`, () => {
      this.renderSelectedEventDetails();
    });

    this.element.on(`click.${COMPONENT_NAME}`, '.calendar-upcoming-event', (e) => {
      const key = e.currentTarget.getAttribute('data-key');
      this.monthView.selectDay(key);
    });
    return this;
  },

  /**
   * Handle updated settings and values.
   * @private
   */
  callOnRenderMonth() {
    const self = this;

    function response(events, eventTypes) {
      if (eventTypes && eventTypes.length > 0) {
        self.settings.eventTypes = eventTypes;
        self.renderEventTypes();
      }
      if (events && events.length > 0) {
        self.settings.events = events;
        self.renderAllEvents(true);
      }
    }
    this.settings.onRenderMonth(this.element, response);
  },

  /**
   * Get the events and date for the currently selected calendar day.
   * @param {date} date The date to find the events for.
   * @returns {object} dayEvents An object with all teh events and the event date.
   */
  getDayEvents(date) {
    if (!date) {
      date = this.isRTL ? this.monthView.currentIslamicDate : this.monthView.currentDate;
    }

    if (typeof date !== 'string' && !this.isRTL) {
      date = stringUtils.padDate(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
      );
    }

    if (this.isRTL) {
      date = stringUtils.padDate(
        date[0],
        date[1],
        date[2],
      );
    }

    const dayObj = this.monthView.dayMap.filter(dayFilter => dayFilter.key === date);

    const dayEvents = {
      date: this.monthView.currentDate,
      events: []
    };

    if (dayObj.length === 0) {
      return [];
    }

    dayEvents.events = dayObj[0].events;
    dayEvents.elem = dayObj[0].elem;
    return dayEvents;
  },

  /**
   * Render the template into the container.
   * @param {object} event The event object with common event properties.
   * @param {object} template The template id.
   * @param {object} container The container to put it in.
   */
  renderTmpl(event, template, container) {
    if (typeof Tmpl !== 'object' || !template) {
      return;
    }

    // create a copy of the template
    if (template instanceof $) {
      template = `${template.html()}`;
    } else if (typeof template === 'string') {
      // If a string doesn't contain HTML elments,
      // assume it's an element ID string and attempt to select with jQuery
      if (!stringUtils.containsHTML(template)) {
        template = $(`#${template}`).html();
      }
    }

    event.color = this.getEventTypeColor(event.type);
    event.startsLong = Locale.formatDate(event.starts, { date: 'long' });
    event.endsLong = Locale.formatDate(event.ends, { date: 'long' });
    event.typeLabel = this.getEventTypeLabel(event.type);

    const renderedTmpl = Tmpl.compile(template, { event });
    container.innerHTML = renderedTmpl;
  },

  /**
   * Add a new event via the event object and show it if it should be visible in the calendar.
   * @param {object} event The event object with common event properties.
   */
  addEvent(event) {
    this.cleanEventData(event);
    this.settings.events.push(event);
    this.renderEvent(event);
    this.renderSelectedEventDetails();
  },

  /**
   * Fix missing / incomlete event data
   * @param {object} event The event object with common event properties.
   * @private
   */
  cleanEventData(event) {
    const isAllDay = event.isAllDay === 'on' || event.isAllDay === 'true' || event.isAllDay;

    if (event.starts === event.ends && !isAllDay) {
      event.starts = Locale.formatDate(new Date(event.starts), { pattern: 'yyyy-MM-ddTHH:mm:ss.SSS' });
      const endDate = new Date(event.ends);
      endDate.setHours(endDate.getHours() + parseInt(event.durationHours, 10));
      event.ends = Locale.formatDate(endDate.toISOString(), { pattern: 'yyyy-MM-ddTHH:mm:ss.SSS' });
      event.duration = null;
      event.isAllDay = false;
    }

    if (event.starts === event.ends && isAllDay) {
      event.starts = Locale.formatDate(new Date(event.starts), { pattern: 'yyyy-MM-ddTHH:mm:ss.SSS' });
      const endDate = new Date(event.ends);
      endDate.setHours(23, 59, 59, 999);
      event.ends = Locale.formatDate(new Date(event.endDate), { pattern: 'yyyy-MM-ddTHH:mm:ss.SSS' });
      event.duration = 1;
      event.isAllDay = true;
    } else if (event.starts !== event.ends && isAllDay) {
      const startDate = new Date(event.starts);
      startDate.setHours(0, 0, 0, 0);
      event.starts = Locale.formatDate(new Date(startDate), { pattern: 'yyyy-MM-ddTHH:mm:ss.SSS' });

      const endDate = new Date(event.ends);
      endDate.setHours(23, 59, 59, 999);
      event.ends = Locale.formatDate(new Date(endDate), { pattern: 'yyyy-MM-ddTHH:mm:ss.SSS' });
      event.isAllDay = true;
    }
  },

  /**
   * Show a modal used to add/edit events. This uses the modalTemplate setting for the modal contents.
   * @param {object} event The event object with common event properties for defaulting fields in the template.
   * @param {function} done The callback for when the modal closes.
   */
  showEventModal(event, done) {
    this.modalContents = document.querySelector('.calendar-event-modal');
    if (!this.modalContents) {
      this.modalContents = document.createElement('div');
      DOM.addClass(this.modalContents, 'calendar-event-modal', 'hidden');
      document.getElementsByTagName('body')[0].appendChild(this.modalContents);
    }

    event = this.addCalculatedFields(event);
    this.renderTmpl(event || {}, this.settings.modalTemplate, this.modalContents);
    const dayObj = this.getDayEvents();
    const modalOptions = this.settings.modalOptions || {
      content: $(this.modalContents),
      closebutton: true,
      // Placement logic wasnt working, flip left most cell
      placement: dayObj.elem.index() === 6 ? 'left' : 'right',
      popover: true,
      offset: {
        y: 10
      },
      title: event.title || event.subject,
      trigger: 'immediate',
      keepOpen: true,
      extraClass: 'calendar-popup',
      tooltipElement: '#calendar-popup',
      headerClass: event.color
    };

    dayObj.elem
      .off('hide.calendar')
      .on('hide.calendar', () => {
        done(this.modalContents, event);
        this.element.trigger('hidemodal', { elem: this.modalContents, event });
        this.removeModal();
      })
      .popover(modalOptions)
      .off('show.calendar')
      .on('show.calendar', () => {
        this.element.trigger('showmodal', { elem: this.modalContents, event });

        // Wire the click on isAllDay to disable spinbox.
        $('#isAllDay').off().on('click.calendar', (e) => {
          const isDisabled = $(e.currentTarget).prop('checked');
          if (isDisabled) {
            $('#durationHours').data('spinbox').disable();
          } else {
            $('#durationHours').data('spinbox').enable();
          }
        });
      });

    this.activeElem = dayObj.elem;
  },

  removeModal() {
    this.modalContents = null;
    if (this.activeElem) {
      this.activeElem.off();
      this.activeElem.data('tooltip').destroy();
    }
    DOM.remove(document.getElementById('calendar-popup'));
    DOM.remove(document.querySelector('.calendar-event-modal'));
  },

  /**
   * Remove all events from the calendar
   */
  clearEvents() {
    this.settings.events = [];
    this.renderAllEvents();
  },

  /**
   * Handle updated settings and values.
   * @returns {object} [description]
   */
  updated() {
    return this
      .teardown()
      .init();
  },

  /**
   * Simple Teardown - remove events & rebuildable markup.
   * @returns {object} The Component prototype, useful for chaining.
   * @private
   */
  teardown() {
    this.element.off(`updated.${COMPONENT_NAME}`);
    this.element.off(`monthrendered.${COMPONENT_NAME}`);
    this.element.off(`change.${COMPONENT_NAME}`);
    this.element.on(`click.${COMPONENT_NAME}`);
    $(this.monthViewContainer).off();

    return this;
  },

  /**
   * Teardown - Remove added markup and events.
   * @private
   */
  destroy() {
    if (this.eventTypeContainer) {
      this.eventTypeContainer.innerHTML = '';
    }
    if (this.monthViewContainer) {
      this.monthViewContainer.innerHTML = '';
    }
    if (this.upcomingEventsContainer) {
      this.upcomingEventsContainer.innerHTML = '';
    }
    if (this.eventDetailsContainer) {
      this.eventDetailsContainer.innerHTML = '';
    }
    this.removeModal();
    this.teardown();
    $.removeData(this.element[0], COMPONENT_NAME);
  }
};

export { Calendar, COMPONENT_NAME };
