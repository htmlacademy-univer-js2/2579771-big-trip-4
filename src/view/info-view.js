import { createElement } from '../render';

function createTripInfoTemplate({ title, dateRange, totalCost }) {
  return (
    `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${title}</h1>
              <p class="trip-info__dates">${dateRange}</p>
            </div>
            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
            </p>
          </section>`
  );
}

export default class TripInfoView {
  constructor({ points, getDestinationById }) {
    this.points = points;
    this.getDestinationById = getDestinationById;
  }

  // Вычисляет заголовок маршрута, используя имена пунктов назначения
  _computeTitle() {
    const sortedPoints = this.points.slice().sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));
    const destinationNames = sortedPoints.map((point) => {
      const destination = this.getDestinationById(point.destinationId);
      return destination ? destination.name : '';
    }).filter(Boolean);

    // Если пунктов более трёх, показываем первый и последний с многоточием
    const uniqueNames = destinationNames.filter((name, index) => index === 0 || name !== destinationNames[index - 1]);
    if (uniqueNames.length > 3) {
      return `${uniqueNames[0]} &mdash; ... &mdash; ${uniqueNames[uniqueNames.length - 1]}`;
    }
    return uniqueNames.join(' &mdash; ');
  }

  // Вычисляет диапазон дат маршрута (от начала до конца)
  _computeDateRange() {
    const sortedPoints = this.points.slice().sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));
    const startDate = sortedPoints[0].dateFrom;
    const endDate = sortedPoints[sortedPoints.length - 1].dateTo;
    const start = new Date(startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const end = new Date(endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${start} &mdash; ${end}`;
  }

  // Вычисляет общую стоимость маршрута (цена точки + цена опций)
  _computeTotalCost() {
    return this.points.reduce((sum, point) => {
      const offersCost = point.offers.reduce((offerSum, offer) => offerSum + offer.price, 0);
      return sum + point.price + offersCost;
    }, 0);
  }

  getTemplate() {
    const title = this._computeTitle();
    const dateRange = this._computeDateRange();
    const totalCost = this._computeTotalCost();
    return createTripInfoTemplate({ title, dateRange, totalCost });
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
