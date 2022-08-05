const RuleModel = require("../../models/rule");

class RuleRepository {
  constructor(db) {
    this.db = db;
  }

  serialyze(rule) {
    return new RuleModel(rule);
  }

  async find_by_id(id) {
    const { rows } = await this.db.query(
      `select rule_id, box_id, name, field, operator, value, created_at, deleted_at from rules
      where rule_id = $1
      limit 1`,
      [id]
    );

    return this.serialyze(rows[0]);
  }

  async find_all() {
    const { rows } = await this.db.query(
      `select rule_id, box_id, name, field, operator, value, created_at, deleted_at from rules`
    );

    return rows.map(this.serialyze);
  }

  async create(rule) {
    const { rows } = await this.db.query(
      `insert into rules (box_id, name, field, operator, value, created_at) values ($1, $2, $3, $4, $5, $6) returning rule_id`,
      [
        rule.box_id,
        rule.name,
        rule.field,
        rule.operator,
        rule.value,
        rule.created_at,
      ]
    );

    return this.serialyze(rows[0]);
  }

  async update(rule) {
    const { rows } = await this.db.query(
      `update rules set box_id = $1, name = $2, field = $3, operator = $4, value = $5, created_at = $6, deleted_at = $7 where rule_id = $8 returning rule_id`,
      [
        rule.box_id,
        rule.name,
        rule.field,
        rule.operator,
        rule.value,
        rule.created_at,
        rule.deleted_at,
        rule.rule_id,
      ]
    );

    return this.serialyze(rows[0]);
  }

  async delete(id) {
    const { rows } = await this.db.query(
      `update rules set deleted_at = $1 where rule_id = $2 returning rule_id`,
      [new Date(), id]
    );

    return this.serialyze(rows[0]);
  }
}

module.exports = RuleRepository;
