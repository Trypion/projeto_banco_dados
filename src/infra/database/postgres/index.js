const { Pool } = require("pg");

const factory = (options) => {
  const { user, host, database, password, port } = options;

  const client = new Pool({
    user,
    host,
    database,
    password,
    port,
  });

  return client;
};

module.exports = factory;
