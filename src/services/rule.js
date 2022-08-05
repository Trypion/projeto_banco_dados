const factory = ({ router, rule_repository }) => {
  router.get("/rules", async (req, res) => {
    const rules = await rule_repository.find_all();
    res.json(rules);
  });

  router.get("/rules/:id", async (req, res) => {
    const rule = await rule_repository.find_by_id(req.params.id);
    res.json(rule);
  });

  router.post("/rules", async (req, res) => {
    const rule = await rule_repository.create(req.body);
    res.json(rule);
  });

  router.put("/rules/:id", async (req, res) => {
    const rule = await rule_repository.update(req.params.id, req.body);
    res.json(rule);
  });

  router.delete("/rules/:id", async (req, res) => {
    const rule = await rule_repository.delete(req.params.id);
    res.json(rule);
  });

  return router;
};

module.exports = factory;
