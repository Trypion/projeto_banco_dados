const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const service = require("./src/services/contract");
const database = require("./src/infra/database");
const options = require("./options");
const router = express.Router();

const { postgresConnection } = database(options.database);
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(service({ router, postgresConnection }));

app.use(logger("dev"));

//Servidor
let porta = 5000;
app.listen(porta, () => {
  console.log("Servidor em execução na porta: " + porta);
});
