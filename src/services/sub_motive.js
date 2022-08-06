const factory = ({ router, sub_motive_repository }) => {
  router.get("/sub-motives", async (req, res) => {
    const sub_motives = await sub_motive_repository.find_all();
    res.json(sub_motives);
  });

  router.get("/sub-motives/:id", async (req, res) => {
    const sub_motive = await sub_motive_repository.find_by_id(req.params.id);
    res.json(sub_motive);
  });

  router.post("/sub-motives", async (req, res) => {
    const sub_motive = await sub_motive_repository.create(req.body);
    res.json(sub_motive);
  });

  router.put("/sub-motives/:id", async (req, res) => {
    const sub_motive = await sub_motive_repository.update({
      status_submotive_id: req.params.id,
      ...req.body,
    });
    res.json(sub_motive);
  });

  router.delete("/sub-motives/:id", async (req, res) => {
    const sub_motive = await sub_motive_repository.delete(req.params.id);
    res.json(sub_motive);
  });

  return router;
};

module.exports = factory;
