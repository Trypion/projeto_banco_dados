const factory = ({ router, contract_repository }) => {
  router.get("/contracts", async (req, res) => {
    const contracts = await contract_repository.find_all();
    res.json(contracts);
  });

  router.get("/contracts/history/:id", async (req, res) => {
    const history = await contract_repository.contract_history(req.params.id);
    res.json(history);
  });

  router.get("/contracts/count/status", async (req, res) => {
    const count = await contract_repository.count_by_status();

    res.json(count);
  });

  router.get("/contracts/details", async (req, res) => {
    const details = await contract_repository.all_contracts_details();
    res.json(details);
  });

  router.get("/contracts/:id", async (req, res) => {
    const contract = await contract_repository.find_by_id(req.params.id);
    res.json(contract);
  });

  router.post("/contracts", async (req, res) => {
    const contract = await contract_repository.create(req.body);
    res.json(contract);
  });

  router.put("/contracts/:id", async (req, res) => {
    const contract = await contract_repository.update({
      contract_id: req.params.id,
      ...req.body,
    });
    res.json(contract);
  });

  router.delete("/contracts/:id", async (req, res) => {
    const contract = await contract_repository.delete(req.params.id);
    res.json(contract);
  });

  router.get("/contracts/total_revenue", async (req, res) => {
    const total_revenue = await contract_repository.total_revenue();
    res.json(total_revenue);
  });

  return router;
};

module.exports = factory;
