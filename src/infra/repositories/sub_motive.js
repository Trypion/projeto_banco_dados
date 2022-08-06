const SubMotiveModel = require("../../models/sub_motive");

class SubMotiveRepository {
  constructor(db) {
    this.db = db;
  }

  serialyze(sub_motive) {
    return new SubMotiveModel(sub_motive);
  }

  async find_by_id(id) {
    const { rows } = await this.db.query(
      `select submotive_id, motive_id, name, created_at, deleted_at from status_submotives
      where submotive_id = $1
      limit 1`,
      [id]
    );

    return this.serialyze(rows[0]);
  }

  async find_all() {
    const { rows } = await this.db.query(
      `select submotive_id, motive_id, name, created_at, deleted_at from status_submotives`
    );

    return rows.map(this.serialyze);
  }

  async create(sub_motive) {
    const { rows } = await this.db.query(
      `insert into status_submotives (motive_id, name, created_at) values ($1, $2, $3) returning submotive_id`,
      [sub_motive.motive_id, sub_motive.name, sub_motive.created_at]
    );

    return this.serialyze(rows[0]);
  }

  async update(sub_motive) {
    const { rows } = await this.db.query(
      `update status_submotives set motive_id = $1, name = $2, deleted_at = $3 where submotive_id = $4 returning submotive_id`,
      [
        sub_motive.motive_id,
        sub_motive.name,
        sub_motive.deleted_at,
        sub_motive.submotive_id,
      ]
    );

    return this.serialyze(rows[0]);
  }

  async delete(id) {
    const { rows } = await this.db.query(
      `update status_submotives set deleted_at = $1 where submotive_
      id = $2 returning submotive_id`,
      [new Date(), id]
    );

    return this.serialyze(rows[0]);
  }
}

module.exports = SubMotiveRepository;
