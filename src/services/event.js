const factory = ({ router, event_repository }) => {
  router.get("/events", async (req, res) => {
    const events = await event_repository.find_all();
    res.json(events);
  });

  router.get("/events/:id", async (req, res) => {
    const event = await event_repository.find_by_id(req.params.id);
    res.json(event);
  });

  router.post("/events", async (req, res) => {
    const event = await event_repository.create(req.body);
    res.json(event);
  });

  router.put("/events/:id", async (req, res) => {
    const event = await event_repository.update({
      contract_event_id: req.params.id,
      ...req.body,
    });
    res.json(event);
  });

  router.delete("/events/:id", async (req, res) => {
    const event = await event_repository.delete(req.params.id);
    res.json(event);
  });

  return router;
};

module.exports = factory;
