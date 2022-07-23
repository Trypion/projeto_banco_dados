const factory = ({ router, postgresConnection }) => {
  router.get("/clients", async (req, res) => {
    const { rows } =
      await postgresConnection.query(`select name, sum(value) as total from contracts
    join clients using(client_id)
    group by name
    order by total desc`);

    res.json(rows);
  });

  router.get("/banks", async (req, res) => {
    const { rows } =
      await postgresConnection.query(`select banks.name, sum(value) as total from contracts
      join boxes using(box_id)
      join banks using(bank_id)
      group by banks.name
      order by total desc`);

    res.json(rows);
  });

  router.get("/boxes", async (req, res) => {
    const { rows } = await postgresConnection.query(`
    select boxes.name as box_name, banks.name as bank_name, sum(value) as total from contracts
    join boxes using(box_id)
    join banks using(bank_id)
    group by boxes.name, banks.name
    order by total desc`);

    res.json(rows);
  });

  router.get("/status/count", async (req, res) => {
    const { rows } = await postgresConnection.query(`
      select status.name, count(*) from contracts
      join status using(status_id)
      group by status.name`);

    res.json(rows);
  });

  router.get("/contracts", async (req, res) => {
    const { rows } = await postgresConnection.query(`
      select clients.name as client_name, banks.name as bank_name, contracts.value, contracts.created_at from contracts
      join clients using(client_id)
      join boxes using(box_id)
      join banks using(bank_id)`);

    res.json(rows);
  });

  router.get("/contracts/history/:id", async (req, res) => {
    const { rows } = await postgresConnection.query(
      `select analysts.name as analyst_name, ce.name as contract_event_name, ce.created_at from contract_events ce
      join analysts using (analyst_id)
      where contract_id = $1
      order by created_at asc`,
      [req.params.id]
    );

    res.json(rows);
  });

  return router;
};

module.exports = factory;
