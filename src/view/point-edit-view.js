import { createElement } from '../render.js';
import dayjs from 'dayjs';

export default class TripPointEditView {
  constructor(tripPoint = null, destinations = []) {
    this.tripPoint = tripPoint || {
      type: 'flight',
      destinationId: destinations.length ? destinations[0].id : 0,
      price: '',
      dateFrom: '',
      dateTo: '',
      offers: []
    };
    this.destinations = destinations;
  }

  getTemplate() {
    const destination = this.destinations.find((dest) => dest.id === this.tripPoint.destinationId);
    const destinationName = destination ? destination.name : '';

    // Форматируем даты для отображения в форме
    const formattedDateFrom = this.tripPoint.dateFrom ? dayjs(this.tripPoint.dateFrom).format('DD/MM/YY HH:mm') : '';
    const formattedDateTo = this.tripPoint.dateTo ? dayjs(this.tripPoint.dateTo).format('DD/MM/YY HH:mm') : '';

    // Капитализация типа события для вывода
    const eventTypeDisplay = this.tripPoint.type.charAt(0).toUpperCase() + this.tripPoint.type.slice(1);

    return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type event__type-btn" for="event-type-toggle">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${this.tripPoint.type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle visually-hidden" id="event-type-toggle" type="checkbox">
                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${this._createEventTypeOptions()}
                      </fieldset>
                    </div>
                  </div>
                  <div class="event__field-group event__field-group--destination">
                    <label class="event__label event__type-output" for="event-destination">
                      ${eventTypeDisplay}
                    </label>
                    <input class="event__input event__input--destination" id="event-destination" type="text" name="event-destination" value="${destinationName}" list="destination-list">
                    <datalist id="destination-list">
                      ${this._createDestinationOptions()}
                    </datalist>
                  </div>
                  <div class="event__field-group event__field-group--time">
                    <label class="visually-hidden" for="event-start-time">From</label>
                    <input class="event__input event__input--time" id="event-start-time" type="text" name="event-start-time" value="${formattedDateFrom}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time">To</label>
                    <input class="event__input event__input--time" id="event-end-time" type="text" name="event-end-time" value="${formattedDateTo}">
                  </div>
                  <div class="event__field-group event__field-group--price">
                    <label class="event__label" for="event-price">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input event__input--price" id="event-price" type="text" name="event-price" value="${this.tripPoint.price}">
                  </div>
                  <button class="event__save-btn btn btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Cancel</button>
                </header>
                <section class="event__details">
                  <section class="event__section event__section--offers">
                    <h3 class="event__section-title event__section-title--offers">Offers</h3>
                    <div class="event__available-offers">
                      ${this._createOffersTemplate()}
                    </div>
                  </section>
                  <section class="event__section event__section--destination">
                    <h3 class="event__section-title event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${this._getDestinationDescription()}</p>
                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${this._createPhotosTemplate()}
                      </div>
                    </div>
                  </section>
                </section>
              </form>
            </li>`;
  }

  _createEventTypeOptions() {
    const types = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
    return types.map((type) => {
      const isChecked = type === this.tripPoint.type ? 'checked' : '';
      return `<div class="event__type-item">
                <input id="event-type-${type}" class="event__type-input visually-hidden" type="radio" name="event-type" value="${type}" ${isChecked}>
                <label class="event__type-label event__type-label--${type}" for="event-type-${type}">${type.charAt(0).toUpperCase() + type.slice(1)}</label>
              </div>`;
    }).join('');
  }

  _createDestinationOptions() {
    return this.destinations.map((dest) => `<option value="${dest.name}"></option>`).join('');
  }

  _createOffersTemplate() {
    if (!this.tripPoint.offers || !this.tripPoint.offers.length) {
      return '<p>No offers available</p>';
    }
    return this.tripPoint.offers
      .map((offer) => `<div class="event__offer-selector">
                  <input class="event__offer-checkbox visually-hidden" id="event-offer-${offer.type}" type="checkbox" name="event-offer-${offer.type}" checked>
                  <label class="event__offer-label" for="event-offer-${offer.type}">
                    <span class="event__offer-title">${offer.title}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${offer.price}</span>
                  </label>
                </div>`)
      .join('');
  }

  _getDestinationDescription() {
    const destination = this.destinations.find((dest) => dest.id === this.tripPoint.destinationId);
    return destination ? destination.description : '';
  }

  _createPhotosTemplate() {
    const destination = this.destinations.find((dest) => dest.id === this.tripPoint.destinationId);
    if (!destination || !destination.photos || !destination.photos.length) {
      return '';
    }
    return destination.photos.map((photo) => `<img class="event__photo" src="${photo}" alt="Destination photo">`).join('');
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
