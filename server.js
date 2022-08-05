const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const database = require("./src/infra/database");
const options = require("./options");
const router = express.Router();

// REPOSITORIES
const EventRepository = require("./src/infra/repositories/event");
const RuleRepository = require("./src/infra/repositories/rule");
const BankRepository = require("./src/infra/repositories/bank");
const ContractRepository = require("./src/infra/repositories/contract");
const AnalystRepository = require("./src/infra/repositories/analyst");
const BoxRepository = require("./src/infra/repositories/box");
const MotiveRepository = require("./src/infra/repositories/motive");
const SubMotiveRepository = require("./src/infra/repositories/sub_motive");
const StatusRepository = require("./src/infra/repositories/status");
const ClientRepository = require("./src/infra/repositories/client");

// SERVICES
const ContractService = require("./src/services/contract");
const RuleService = require("./src/services/rule");
const EventService = require("./src/services/event");
const BankService = require("./src/services/bank");
const AnalystService = require("./src/services/analyst");
const BoxService = require("./src/services/box");
const MotiveService = require("./src/services/motive");
const SubMotiveService = require("./src/services/sub_motive");
const StatusService = require("./src/services/status");
const ClientService = require("./src/services/client");

const { postgresConnection } = database(options.database);

const event_repository = new EventRepository(postgresConnection);
const rule_repository = new RuleRepository(postgresConnection);
const bank_repository = new BankRepository(postgresConnection);
const contract_repository = new ContractRepository(postgresConnection);
const analyst_repository = new AnalystRepository(postgresConnection);
const box_repository = new BoxRepository(postgresConnection);
const motive_repository = new MotiveRepository(postgresConnection);
const sub_motive_repository = new SubMotiveRepository(postgresConnection);
const status_repository = new StatusRepository(postgresConnection);
const client_repository = new ClientRepository(postgresConnection);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(ContractService({ router, contract_repository }));
app.use(RuleService({ router, rule_repository }));
app.use(EventService({ router, event_repository }));
app.use(BankService({ router, bank_repository }));
app.use(AnalystService({ router, analyst_repository }));
app.use(BoxService({ router, box_repository }));
app.use(MotiveService({ router, motive_repository }));
app.use(SubMotiveService({ router, sub_motive_repository }));
app.use(StatusService({ router, status_repository }));
app.use(ClientService({ router, client_repository }));

app.use(logger("dev"));

//Servidor
let porta = 5000;
app.listen(porta, () => {
  console.log("Servidor em execução na porta: " + porta);
});
