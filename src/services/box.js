const factory = ({ router, box_repository }) => {
  router.get("/box", async (req, res) => {
    const boxes = await box_repository.find_all();
    res.json(boxes);
  });

  router.get("/box/:id", async (req, res) => {
    const box = await box_repository.find_by_id(req.params.id);
    res.json(box);
  });

  router.post("/box", async (req, res) => {
    const box = await box_repository.create(req.body);
    res.json(box);
  });

  router.put("/box/:id", async (req, res) => {
    const box = await box_repository.update(req.params.id, req.body);
    res.json(box);
  });

  router.delete("/box/:id", async (req, res) => {
    const box = await box_repository.delete(req.params.id);
    res.json(box);
  });

  router.get("/box/total_revenue", async (req, res) => {
    const total_revenue = await box_repository.total_revenue();
    res.json(total_revenue);
  });

  return router;
};

module.exports = factory;
