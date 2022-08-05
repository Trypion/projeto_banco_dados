class SubMotiveModel {
  constructor(sub_motive) {
    this.sub_motive_id = sub_motive.sub_motive_id;
    this.motive_id = sub_motive.motive_id;
    this.name = sub_motive.name;
    this.created_at = sub_motive.created_at;
    this.deleted_at = sub_motive.deleted_at;
  }
}

module.exports = SubMotiveModel;
