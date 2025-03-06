import { generateDestination, generateTripPoint } from '../mock/data-generator.js';

const DESTINATIONS_COUNT = 3;
const POINTS_COUNT = 3;

const destinations = Array.from({ length: DESTINATIONS_COUNT }, (_, i) => generateDestination(i + 1));
const points = Array.from({ length: POINTS_COUNT }, (_, i) => generateTripPoint(i + 1, destinations));

export default class TripModel {
  #destinations = destinations;
  #points = points;

  getDestinations() {
    return this.#destinations;
  }

  getPoints() {
    return this.#points;
  }

  getDestinationById(id) {
    return this.#destinations.find((dest) => dest.id === id);
  }
}
