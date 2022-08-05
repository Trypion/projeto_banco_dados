class ClientModel {
  constructor(client) {
    this.client_id = client.client_id;
    this.name = client.name;
    this.cpf = client.cpf;
    this.phone = client.phone;
    this.created_at = client.created_at;
    this.deleted_at = client.deleted_at;
  }
}

module.exports = ClientModel;
