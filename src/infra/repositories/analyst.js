const AnalystModel = require("../../models/analyst");

class AnalystRepository {
  constructor(db) {
    this.db = db;
  }

  serialyze(analyst) {
    return new AnalystModel(analyst);
  }

  async find_by_id(id) {
    const { rows } = await this.db.query(
      `select analyst_id, name, created_at, deleted_at from analysts
      where contract_id = $1
      limit 1`,
      [id]
    );

    return this.serialyze(rows[0]);
  }

  async find_all() {
    const { rows } = await this.db.query(
      `select analyst_id, name, created_at, deleted_at from analysts`
    );

    return rows.map(this.serialyze);
  }

  async create(analyst) {
    const { rows } = await this.db.query(
      `insert into analysts (name, created_at) values ($1, $2) returning analyst_id`,
      [analyst.name, analyst.created_at]
    );

    return this.serialyze(rows[0]);
  }

  async update(analyst) {
    const { rows } = await this.db.query(
      `update analysts set name = $1, deleted_at = $2 where analyst_id = $3 returning analyst_id`,
      [analyst.name, analyst.deleted_at, analyst.analyst_id]
    );

    return this.serialyze(rows[0]);
  }

  async delete(id) {
    const { rows } = await this.db.query(
      `update analysts set deleted_at = $1 where analyst_id = $2 returning analyst_id`,
      [new Date(), id]
    );

    return this.serialyze(rows[0]);
  }
}

module.exports = AnalystRepository;
