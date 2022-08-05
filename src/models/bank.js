class BankModel {
  constructor(bank) {
    this.bank_id = bank.bank_id;
    this.name = bank.name;
    this.number = bank.number;
    this.created_at = bank.created_at;
    this.updated_at = bank.updated_at;
  }
}

module.exports = BankModel;
