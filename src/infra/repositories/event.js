const EventModel = require("../../models/event");

class EventRepository {
  constructor(db) {
    this.db = db;
  }

  serialyze(event) {
    return new EventModel(event);
  }

  async find_by_id(id) {
    const { rows } = await this.db.query(
      `select contract_events_id, contract_id, analyst_id, name, created_at from contract_events
      where event_id = $1
      limit 1`,
      [id]
    );

    return this.serialyze(rows[0]);
  }

  async find_all() {
    const { rows } = await this.db.query(
      `select contract_event_id, contract_id, analyst_id, name, created_at from contract_events`
    );

    return rows.map(this.serialyze);
  }

  async create(event) {
    const { rows } = await this.db.query(
      `insert into contract_events (contract_id, analyst_id, name, created_at) values ($1, $2, $3, $4) returning contract_events_id`,
      [event.contract_id, event.analyst_id, event.name, event.created_at]
    );

    return this.serialyze(rows[0]);
  }

  async update(event) {
    const { rows } = await this.db.query(
      `update contract_events set contract_id = $1, analyst_id = $2, name = $3, created_at = $4 where contract_events_id = $5 returning contract_events_id`,
      [
        event.contract_id,
        event.analyst_id,
        event.name,
        event.created_at,
        event.contract_events_id,
      ]
    );

    return this.serialyze(rows[0]);
  }

  async delete(id) {
    const { rows } = await this.db.query(
      `update contract_events set deleted_at = $1 where contract_events_id = $2 returning contract_events_id`,
      [new Date(), id]
    );

    return this.serialyze(rows[0]);
  }
}

module.exports = EventRepository;
