import TripEventListView from '../view/event-list-view.js';
import TripSortView from '../view/sort-view.js';
import TripPointEditView from '../view/point-edit-view.js';
import TripPointView from '../view/point-view.js';
import { render } from '../render.js';

export default class TripPresenter {
  #container = null;
  #sortComponent = new TripSortView();
  #eventListComponent = new TripEventListView();

  constructor({ container, tripModel }) {
    this.#container = container;
    this.tripModel = tripModel;
  }

  init() {
    this.#renderSort();
    this.#renderEventList();
    this.#renderPointEdit();
    this.#renderTripPoints();
  }

  #renderSort() {
    render(this.#sortComponent, this.#container);
  }

  #renderEventList() {
    render(this.#eventListComponent, this.#container);
  }

  #renderPointEdit() {
    const mockPoint = this.tripModel.getPoints()[0];
    render(new TripPointEditView(mockPoint, this.tripModel.getDestinations()), this.#eventListComponent.getElement());
  }

  #renderTripPoints() {
    this.tripModel.getPoints().forEach((point) => {
      const destination = this.tripModel.getDestinationById(point.destinationId);
      render(new TripPointView({
        point,
        pointDestination: destination,
        pointOffers: point.offers
      }), this.#eventListComponent.getElement());
    });
  }
}
