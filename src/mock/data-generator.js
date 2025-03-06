import { Destination } from '../models/destination.js';
import { Offer } from '../models/offer.js';
import { TripPoint } from '../models/trip-point.js';

const DESTINATIONS_DATA = [
  {
    id: 1,
    name: 'Amsterdam',
    description: 'Amsterdam – город в Нидерландах, известный своими каналами и музеями.',
    photos: ['https://loremflickr.com/248/152?random=1', 'https://loremflickr.com/248/152?random=2'],
  },
  {
    id: 2,
    name: 'Geneva',
    description: 'Geneva – красивый город в Швейцарии, знаменитый часовыми мастерами и дипломатией.',
    photos: ['https://loremflickr.com/248/152?random=3', 'https://loremflickr.com/248/152?random=4'],
  },
  {
    id: 3,
    name: 'Chamonix',
    description: 'Chamonix – горнолыжный курорт с живописными видами на Альпы.',
    photos: ['https://loremflickr.com/248/152?random=5', 'https://loremflickr.com/248/152?random=6'],
  },
];

const OFFERS_DATA = {
  taxi: [
    { id: 1, title: 'Choose taxi service', price: 10 },
    { id: 2, title: 'Order a larger taxi', price: 20 },
  ],
  bus: [
    { id: 3, title: 'Add bus pass', price: 5 },
  ],
  train: [
    { id: 4, title: 'Switch to comfort class', price: 100 },
  ],
  ship: [
    { id: 5, title: 'Choose cabin', price: 50 },
  ],
  drive: [
    { id: 6, title: 'Rent a car', price: 100 },
  ],
  flight: [
    { id: 7, title: 'Add luggage', price: 30 },
    { id: 8, title: 'Choose seats', price: 5 },
    { id: 9, title: 'Add meal', price: 15 },
    { id: 10, title: 'Switch to comfort class', price: 100 },
  ],
  checkin: [],
  sightseeing: [
    { id: 11, title: 'Book tickets', price: 40 },
  ],
  restaurant: [
    { id: 12, title: 'Reserve table', price: 50 },
  ],
};

const TRIP_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const LOREM_SENTENCES = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'
];

function getRandomArrayItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomOffers(type) {
  const offersByType = OFFERS_DATA[type] || [];
  if (offersByType.length === 0) {
    return [];
  }
  const count = Math.floor(Math.random() * offersByType.length) + 1;
  const shuffled = offersByType.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map((offerData) => new Offer(offerData));
}

function generateRandomDescription() {
  const count = Math.floor(Math.random() * 5) + 1;
  const sentences = [];
  for (let i = 0; i < count; i++) {
    sentences.push(getRandomArrayItem(LOREM_SENTENCES));
  }
  return sentences.join(' ');
}

export function generateDestination(id) {
  const data = getRandomArrayItem(DESTINATIONS_DATA);
  return new Destination({
    id,
    name: data.name,
    description: generateRandomDescription(),
    photos: data.photos,
  });
}

export function generateTripPoint(id, destinations) {
  const type = getRandomArrayItem(TRIP_TYPES);
  const destination = getRandomArrayItem(destinations);
  const offers = getRandomOffers(type);
  const price = Math.floor(Math.random() * 450) + 50;
  const now = new Date();
  const dateFrom = new Date(now.getTime() + Math.floor(Math.random() * 24) * 3600000);
  const dateTo = new Date(dateFrom.getTime() + (Math.floor(Math.random() * 3) + 1) * 3600000);

  return new TripPoint({
    id,
    type,
    destinationId: destination.id,
    offers,
    price,
    dateFrom: dateFrom.toISOString(),
    dateTo: dateTo.toISOString(),
  });
}

export { TRIP_TYPES, OFFERS_DATA, DESTINATIONS_DATA };
