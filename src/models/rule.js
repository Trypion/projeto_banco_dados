class RuleModel {
  constructor(rule) {
    this.rule_id = rule.rule_id;
    this.box_id = rule.box_id;
    this.name = rule.name;
    this.field = rule.field;
    this.operator = rule.operator;
    this.value = rule.value;
    this.created_at = rule.created_at;
    this.deleted_at = rule.deleted_at;
  }
}

module.exports = RuleModel;
