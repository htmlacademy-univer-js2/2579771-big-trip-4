import TripEventListView from '../view/event-list-view.js';
import TripSortView from '../view/sort-view.js';
import TripPointEditView from '../view/point-edit-view.js';
import TripPointView from '../view/point-view.js';
import { render } from '../render.js';

const POINT_COUNT = 3;

export default class TripPresenter {
  #container = null;
  #sortComponent = new TripSortView();
  #eventListComponent = new TripEventListView();

  constructor({ container }) {
    this.#container = container;
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
    render(new TripPointEditView(), this.#eventListComponent.getElement());
  }

  #renderTripPoints() {
    for (let i = 0; i < POINT_COUNT; i++) {
      render(new TripPointView(), this.#eventListComponent.getElement());
    }
  }
}
