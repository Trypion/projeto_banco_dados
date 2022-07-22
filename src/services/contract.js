const Contract = require("../models/contract")

const factory = ({ router, postgresConnection }) => {

  router.get("/", async (req, res)=>{

    const {rows} = await postgresConnection.query("SELECT * FROM contracts");

    const resp = []

    rows.forEach(element => {
      resp.push(Object.assign(Contract, element))
    });
    
    res.json(resp)
  })

  return router;
};

module.exports = factory;
