const BankModel = require('../../models/bank.js');

class BankRepository {
  constructor(db) {
    this.db = db;
  }

  serialyze(bank) {
    return Object.assign(bank, BankModel);
  }

  async find_by_id(id) {
    const { rows } = await this.db.query(
      `select bank_id, name, number, created_at, deleted_at from banks
      where bank_id = $1
      limit 1`,
      [id]
    );

    return this.serialyze(rows[0]);
  }
  
  async find_all() {
    const { rows } = await this.db.query(
      `select bank_id, name, number, created_at, deleted_at from banks`
    );

    return rows.map(this.serialyze);
  }
  
  async create(bank) {
    const { rows } = await this.db.query(
      `insert into banks (name, number, created_at) values ($1) returning bank_id`,
      [bank.name, bank.created_at]
    );

    return this.serialyze(rows[0]);
  }
  
  async update(bank) {
    const { rows } = await this.db.query(
      `update banks set name = $1, number = $2, deleted_at = $3 where bank_id = $4 returning bank_id`,
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