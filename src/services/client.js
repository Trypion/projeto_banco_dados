const factory = ({ router, client_repository }) => {
  router.get("/clients", async (req, res) => {
    const clients = await client_repository.find_all();
    res.json(clients);
  });

  router.get("/clients/:id", async (req, res) => {
    const client = await client_repository.find_by_id(req.params.id);
    res.json(client);
  });

  router.post("/clients", async (req, res) => {
    const client = await client_repository.create(req.body);
    res.json(client);
  });

  router.put("/clients/:id", async (req, res) => {
    const client = await client_repository.update(req.params.id, req.body);
    res.json(client);
  });

  router.delete("/clients/:id", async (req, res) => {
    const client = await client_repository.delete(req.params.id);
    res.json(client);
  });

  router.get("/clients/total_revenue", async (req, res) => {
    const total_revenue = await client_repository.total_revenue();
    res.json(total_revenue);
  });

  return router;
};

module.exports = factory;
