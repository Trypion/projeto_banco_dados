const PostgressClient = require("./postgres");

const factory = (config) => {
  const postgresConnection = PostgressClient(config.postgres);

  return { postgresConnection };
};

module.exports = factory
