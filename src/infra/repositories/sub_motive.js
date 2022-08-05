const SubMotiveModel = require("../../models/sub_motive");

class SubMotiveRepository {
  constructor(db) {
    this.db = db;
  }

  serialyze(sub_motive) {
    return Object.assign(sub_motive, SubMotiveModel);
  }

  async find_by_id(id) {
    const { rows } = await this.db.query(
      `select submotive_id, motive_id, name, created_at, deleted_at from sub_motives
      where submotive_id = $1
      limit 1`,
      [id]
    );

    return this.serialyze(rows[0]);
  }

  async find_all() {
    const { rows } = await this.db.query(
      `select submotive_id, motive_id, name, created_at, deleted_at from sub_motives`
    );

    return rows.map(this.serialyze);
  }

  async create(sub_motive) {
    const { rows } = await this.db.query(
      `insert into sub_motives (motive_id, name, created_at) values ($1, $2, $3) returning submotive_id`,
      [sub_motive.motive_id, sub_motive.name, sub_motive.created_at]
    );

    return this.serialyze(rows[0]);
  }

  async update(sub_motive) {
    const { rows } = await this.db.query(
      `update sub_motives set motive_id = $1, name = $2, deleted_at = $3 where submotive_id = $4 returning submotive_id`,
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
      `update sub_motives set deleted_at = $1 where submotive_
      id = $2 returning submotive_id`,
      [new Date(), id]
    );

    return this.serialyze(rows[0]);
  }
}

module.exports = SubMotiveRepository;