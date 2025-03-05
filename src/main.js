import TripInfoView from './view/info-view.js';
import TripFiltersView from './view/filters-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import TripModel from './utils/trip-model.js';
import { render, RenderPosition } from './render.js';

const headerElement = document.querySelector('.page-header');
const tripMainElement = headerElement.querySelector('.trip-main');
const filtersContainer = tripMainElement.querySelector('.trip-controls__filters');
const pageBodyElement = document.querySelector('.page-body__page-main');
const siteBodyContainerElement = pageBodyElement.querySelector('.page-body__container');

const tripModel = new TripModel();

render(new TripInfoView({
  points: tripModel.getPoints(),
  getDestinationById: tripModel.getDestinationById.bind(tripModel)
}), tripMainElement, RenderPosition.AFTERBEGIN);

render(new TripFiltersView(tripModel.getPoints()), filtersContainer);

const tripPresenter = new TripPresenter({
  container: siteBodyContainerElement,
  tripModel: tripModel,
});
tripPresenter.init();
