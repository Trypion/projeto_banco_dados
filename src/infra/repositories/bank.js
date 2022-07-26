const BankModel = require("../../models/bank.js");

class BankRepository {
  constructor(db) {
    this.db = db;
  }

  serialyze(bank) {
    return new BankModel(bank);
  }

  async total_revenue() {
    const { rows } = await this.db.query(
      `select banks.name, sum(value) as total from contracts
      join boxes using(box_id)
      join banks using(bank_id)
      group by banks.name
      order by total desc`
    );

    return rows;
  }

  async find_by_id(id) {
    const { rows } = await this.db.query(
      `select bank_id, name, created_at, deleted_at from banks
      where bank_id = $1
      limit 1`,
      [id]
    );

    return this.serialyze(rows[0]);
  }

  async find_all() {
    const { rows } = await this.db.query(
      `select bank_id, name, created_at, deleted_at from banks`
    );

    return rows.map(this.serialyze);
  }

  async create(bank) {
    const { rows } = await this.db.query(
      `insert into banks (name, created_at) values ($1, $2) returning bank_id`,
      [bank.name, new Date()]
    );

    return this.serialyze(rows[0]);
  }

  async update(bank) {
    const { rows } = await this.db.query(
      `update banks set name = $1, deleted_at = $2 where bank_id = $3 returning bank_id`,
      [bank.name, bank.deleted_at, bank.bank_id]
    );

    return this.serialyze(rows[0]);
  }

  async delete(id) {
    const { rows } = await this.db.query(
      `update banks set deleted_at = $1 where bank_id = $2 returning bank_id`,
      [new Date(), id]
    );

    return this.serialyze(rows[0]);
  }
}

module.exports = BankRepository;
