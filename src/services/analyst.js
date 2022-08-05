const factory = ({ router, analyst_repository }) => {
  router.get("/analyst", async (req, res) => {
    const analysts = await analyst_repository.find_all();
    res.json(analysts);
  });

  router.get("/analyst/:id", async (req, res) => {
    const contract = await analyst_repository.find_by_id(req.params.id);
    res.json(contract);
  });

  router.post("/analyst", async (req, res) => {
    const contract = await analyst_repository.create(req.body);
    res.json(contract);
  });

  router.put("/analyst/:id", async (req, res) => {
    const contract = await analyst_repository.update(req.params.id, req.body);
    res.json(contract);
  });

  router.delete("/analyst/:id", async (req, res) => {
    const contract = await analyst_repository.delete(req.params.id);
    res.json(contract);
  });

  
  return router;
};

module.exports = factory;
