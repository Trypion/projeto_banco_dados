class BoxModel {
  constructor(box) {
    this.box_id = box.box_id;
    this.name = box.name;
    this.number = box.number;
    this.created_at = box.created_at;
    this.deleted_at = box.deleted_at;
  }
}

module.exports = BoxModel;