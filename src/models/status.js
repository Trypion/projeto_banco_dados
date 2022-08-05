class StatusModel {
  constructor(status) {
    this.status_id = status.status_id;
    this.name = status.name;
    this.created_at = status.created_at;
    this.deleted_at = status.deleted_at;
  }
}

module.exports = StatusModel;
