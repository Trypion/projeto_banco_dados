class BankModel {
  constructor(bank) {
    this.bank_id = bank.bank_id;
    this.name = bank.name;
    this.created_at = bank.created_at;
    this.deleted_at = bank.deleted_at;
  }
}

module.exports = BankModel;
