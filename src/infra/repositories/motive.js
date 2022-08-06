const MotiveModel = require("../../models/motive");

class MotiveRepository {
  constructor(db) {
    this.db = db;
  }

  serialyze(motive) {
    return new MotiveModel(motive);
  }

  async find_by_id(id) {
    const { rows } = await this.db.query(
      `select motive_id, status_id, name, created_at, deleted_at from status_motives
      where motive_id = $1
      limit 1`,
      [id]
    );

    return this.serialyze(rows[0]);
  }

  async find_all() {
    const { rows } = await this.db.query(
      `select motive_id, status_id, name, created_at, deleted_at from status_motives`
    );

    return rows.map(this.serialyze);
  }

  async create(motive) {
    const { rows } = await this.db.query(
      `insert into status_motives (status_id, name, created_at) values ($1, $2, $3) returning motive_id`,
      [motive.status_id, motive.name, motive.created_at]
    );

    return this.serialyze(rows[0]);
  }

  async update(motive) {
    const { rows } = await this.db.query(
      `update status_motives set status_id = $1, name = $2, deleted_at = $3 where motive_id = $4 returning motive_id`,
      [motive.status_id, motive.name, motive.deleted_at, motive.motive_id]
    );

    return this.serialyze(rows[0]);
  }

  async delete(id) {
    const { rows } = await this.db.query(
      `update status_motives set deleted_at = $1 where motive_id = $2 returning motive_id`,
      [new Date(), id]
    );

    return this.serialyze(rows[0]);
  }
}

module.exports = MotiveRepository;
