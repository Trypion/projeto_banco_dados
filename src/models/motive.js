class MotiveModel {
  constructor(motive) {
    this.motive_id = motive.motive_id;
    this.status_id = motive.status_id;
    this.name = motive.name;
    this.created_at = motive.created_at;
    this.deleted_at = motive.deleted_at;
  }
}

module.exports = MotiveModel;