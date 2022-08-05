class ContractModel {
  constructor(contract) {
    this.contract_id = contract.contract_id;
    this.client_id = contract.client_id;
    this.status_id = contract.status_id;
    this.box_id = contract.box_id;
    this.value = contract.value;
    this.created_at = contract.created_at;
    this.deleted_at = contract.deleted_at;
  }
}

module.exports = ContractModel;
