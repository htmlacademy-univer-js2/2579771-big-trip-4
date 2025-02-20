import TripInfoView from './view/info-view';
import TripFiltersView from './view/filters-view.js';
import TripPresenter from './presenter/trip-presenter.js';

import { render, RenderPosition } from './render.js';

const bodyElement = document.body;
const headerElement = bodyElement.querySelector('.page-header');
const tripInfoElement = headerElement?.querySelector('.trip-main');
const filtersBlock = tripInfoElement?.querySelector('.trip-controls__filters');
const pageBodyElement = document.querySelector('.page-body__page-main');
const siteBodyContainerElement = pageBodyElement?.querySelector('.page-body__container');

render(new TripInfoView(), tripInfoElement, RenderPosition.AFTERBEGIN);

render(new TripFiltersView(), filtersBlock);

const tripPresenter = new TripPresenter({ container: siteBodyContainerElement });
tripPresenter.init();

