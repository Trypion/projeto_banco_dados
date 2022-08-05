const ClientModel = require("../../models/client");

class ClientRepository {
  constructor(db) {
    this.db = db;
  }

  serialyze(client) {
    return Object.assign(client, ClientModel);
  }

  async total_revenue() {
    const { rows } = await this.db.query(
      `select name, sum(value) as total from contracts
      join clients using(client_id)
      group by name
      order by total desc`
    );

    return rows;
  }

  async find_by_id(id) {
    const { rows } = await this.db.query(
      `select client_id, name, cpf, phone, created_at, deleted_at from clients
      where client_id = $1
      limit 1`,
      [id]
    );

    return this.serialyze(rows[0]);
  }

  async find_all() {
    const { rows } = await this.db.query(
      `select client_id, name, cpf, phone created_at, deleted_at from clients`
    );

    return rows.map(this.serialyze);
  }

  async create(client) {
    const { rows } = await this.db.query(
      `insert into clients (name, cpf, phone, created_at) values ($1, $2, $3, $4) returning client_id`,
      [client.name, client.cpf, client.phone, client.created_at]
    );

    return this.serialyze(rows[0]);
  }

  async update(client) {
    const { rows } = await this.db.query(
      `update clients set name = $1, cpf = $2, phone = $3, deleted_at = $4 where client_id = $5 returning client_id`,
      [
        client.name,
        client.cpf,
        client.phone,
        client.deleted_at,
        client.client_id,
      ]
    );

    return this.serialyze(rows[0]);
  }

  async delete(id) {
    const { rows } = await this.db.query(
      `update clients set deleted_at = $1 where client_id = $2 returning client_id`,
      [new Date(), id]
    );

    return this.serialyze(rows[0]);
  }
}

module.exports = ClientRepository;
