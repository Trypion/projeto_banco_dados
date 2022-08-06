const factory = ({ router, motive_repository }) => {
  router.get("/motive", async (req, res) => {
    const motives = await motive_repository.find_all();
    res.json(motives);
  });

  router.get("/motive/:id", async (req, res) => {
    const motive = await motive_repository.find_by_id(req.params.id);
    res.json(motive);
  });

  router.post("/motive", async (req, res) => {
    const motive = await motive_repository.create(req.body);
    res.json(motive);
  });

  router.put("/motive/:id", async (req, res) => {
    const motive = await motive_repository.update({
      status_motive_id: req.params.id,
      ...req.body,
    });
    res.json(motive);
  });

  router.delete("/motive/:id", async (req, res) => {
    const motive = await motive_repository.delete(req.params.id);
    res.json(motive);
  });

  router.get("/motive/total_revenue", async (req, res) => {
    const total_revenue = await motive_repository.total_revenue();
    res.json(total_revenue);
  });

  return router;
};

module.exports = factory;
