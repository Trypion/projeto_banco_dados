const StatusModel = require('../../models/status');

class StatusRepository {
  constructor(db) {
    this.db = db;
  }

  serialyze(status) {
    return new StatusModel(status);
  }

  async find_by_id(id) {
    const { rows } = await this.db.query(
      `select status_id, name, created_at, deleted_at from status
      where status_id = $1
      limit 1`,
      [id]
    );

    return this.serialyze(rows[0]);
  }

  async find_all() {
    const { rows } = await this.db.query(
      `select status_id, name, created_at, deleted_at from status`
    );

    return rows.map(this.serialyze);
  }

  async create(status) {
    const { rows } = await this.db.query(
      `insert into status (name, created_at) values ($1, $2) returning status_id`,
      [status.name, status.created_at]
    );

    return this.serialyze(rows[0]);
  }

  async update(status) {
    const { rows } = await this.db.query(
      `update status set name = $1, deleted_at = $2 where status_id = $3 returning status_id`,
      [status.name, status.deleted_at, status.status_id]
    );

    return this.serialyze(rows[0]);
  }

  async delete(id) {
    const { rows } = await this.db.query(
      `update status set deleted_at = $1 where status_id = $2 returning status_id`,
      [new Date(), id]
    );

    return this.serialyze(rows[0]);
  }
}

module.exports = StatusRepository;
