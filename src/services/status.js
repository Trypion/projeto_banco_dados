const factory = ({ router, status_repository }) => {
  router.get("/statuses", async (req, res) => {
    const statuses = await status_repository.find_all();
    res.json(statuses);
  });

  router.get("/statuses/:id", async (req, res) => {
    const status = await status_repository.find_by_id(req.params.id);
    res.json(status);
  });

  router.post("/statuses", async (req, res) => {
    const status = await status_repository.create(req.body);
    res.json(status);
  });

  router.put("/statuses/:id", async (req, res) => {
    const status = await status_repository.update({
      status_id: req.params.id,
      ...req.body,
    });
    res.json(status);
  });

  router.delete("/statuses/:id", async (req, res) => {
    const status = await status_repository.delete(req.params.id);
    res.json(status);
  });

  return router;
};

module.exports = factory;
