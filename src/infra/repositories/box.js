const BoxModel = require("../../models/box");

class BoxRepository {
  constructor(db) {
    this.db = db;
  }

  serialyze(box) {
    return Object.assign(box, BoxModel);
  }

  async find_by_id(id) {
    const { rows } = await this.db.query(
      `select box_id, name, created_at, deleted_at from boxes
      where box_id = $1
      limit 1`,
      [id]
    );

    return this.serialyze(rows[0]);
  }

  async find_all() {
    const { rows } = await this.db.query(
      `select box_id, name, created_at, deleted_at from boxes`
    );

    return rows.map(this.serialyze);
  }

  async create(box) {
    const { rows } = await this.db.query(
      `insert into boxes (name, number, created_at) values ($1) returning box_id`,
      [box.name, box.number, box.created_at]
    );

    return this.serialyze(rows[0]);
  }

  async update(box) {
    const { rows } = await this.db.query(
      `update boxes set name = $1, number = $2, deleted_at = $3 where box_id = $4 returning box_id`,
      [box.name, box.number, box.deleted_at, box.box_id]
    );

    return this.serialyze(rows[0]);
  }

  async delete(id) {
    const { rows } = await this.db.query(
      `update boxes set deleted_at = $1 where box_id = $1 returning box_id`,
      [new Date(), id]
    );

    return this.serialyze(rows[0]);
  }
}

module.exports = BoxRepository;
