class EventModel {
  constructor(event) {
    this.event_id = event.event_id;
    this.contract_id = event.contract_id;
    this.analyst_id = event.analyst_id;
    this.name = event.name;
    this.created_at = event.created_at;
  }
}

module.exports = EventModel;