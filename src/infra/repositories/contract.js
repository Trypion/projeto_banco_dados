const ContractModel = require("../../models/contract");

class ContractRepository {
  constructor(db) {
    this.db = db;
  }

  serialyze(contract) {
    return Object.assign(contract, ContractModel);
  }

  async count_by_status() {
    const { rows } = await this.db.query(
      `select status.name, count(*) from contracts
      join status using(status_id)
      group by status.name`
    );

    return rows;
  }

  async contract_history(id) {
    const { rows } = await this.tb.query(
      `select analysts.name as analyst_name, ce.name as contract_event_name, ce.created_at from contract_events ce
      join analysts using (analyst_id)
      where contract_id = $1
      order by created_at asc`,
      [id]
    );

    return rows;
  }

  async all_contracts_details() {
    const { rows } = await this.tb.query(`
    select clients.name as client_name, banks.name as bank_name, contracts.value, contracts.created_at from contracts
    join clients using(client_id)
    join boxes using(box_id)
    join banks using(bank_id)`);

    return rows;
  }

  async find_by_id(id) {
    const { rows } = await this.db.query(
      `select contract_id, client_id, status_id, bank_id, value, created_at, deleted_at from contracts
      where contract_id = $1
      limit 1`,
      [id]
    );

    return this.serialyze(rows[0]);
  }

  async find_all() {
    const { rows } = await this.db.query(
      `select contract_id, client_id, status_id, bank_id, value, created_at, deleted_at from contracts`
    );

    return rows.map(this.serialyze);
  }

  async create(contract) {
    const { rows } = await this.db.query(
      `insert into contracts (client_id, status_id, bank_id, value, created_at) values ($1, $2, $3, $4, $5) returning contract_id`,
      [
        contract.client_id,
        contract.status_id,
        contract.bank_id,
        contract.value,
        contract.created_at,
      ]
    );

    return this.serialyze(rows[0]);
  }

  async update(contract) {
    const { rows } = await this.db.query(
      `update contracts set client_id = $1, status_id = $2, bank_id = $3, value = $4, deleted_at = $5 where contract_id = $6 returning contract_id`,
      [
        contract.client_id,
        contract.status_id,
        contract.bank_id,
        contract.value,
        contract.deleted_at,
        contract.contract_id,
      ]
    );

    return this.serialyze(rows[0]);
  }

  async delete(id) {
    const { rows } = await this.db.query(
      `update contracts set deleted_at = $1 where contract_id = $2 returning contract_id`,
      [new Date(), id]
    );

    return this.serialyze(rows[0]);
  }
}

module.exports = ContractRepository;
