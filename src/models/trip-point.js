export class TripPoint {
  constructor({ id, type, destinationId, offers, price, dateFrom, dateTo }) {
    this.id = id;
    this.type = type;
    this.destinationId = destinationId;
    this.offers = offers;
    this.price = price;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
  }
}
