const factory = ({ router, bank_repository }) => {
  router.get("/banks", async (req, res) => {
    const banks = await bank_repository.find_all();
    res.json(banks);
  });

  router.get("/banks/total-revenue", async (req, res) => {
    const total_revenue = await bank_repository.total_revenue();
    res.json(total_revenue);
  });


  router.get("/banks/:id", async (req, res) => {
    const bank = await bank_repository.find_by_id(req.params.id);
    res.json(bank);
  });

  router.post("/banks", async (req, res) => {
    const bank = await bank_repository.create(req.body);
    res.json(bank);
  });

  router.put("/banks/:id", async (req, res) => {
    const bank = await bank_repository.update({
      bank_id: req.params.id,
      ...req.body,
    });
    res.json(bank);
  });

  router.delete("/banks/:id", async (req, res) => {
    const bank = await bank_repository.delete(req.params.id);
    res.json(bank);
  });

  return router;
};

module.exports = factory;
