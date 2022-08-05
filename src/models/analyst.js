class AnalystModel {
  constructor(analyst) {
    this.analyst_id = analyst.analyst_id;
    this.name = analyst.name;
    this.created_at = analyst.created_at;
    this.updated_at = analyst.updated_at;
  }
}

module.exports = AnalystModel;
