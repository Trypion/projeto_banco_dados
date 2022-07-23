module.exports = {
  database: {
    postgres: {
      user: process.env.DATABASE_USER || "postgres",
      host: process.env.DATABASE_HOST || "localhost",
      database: process.env.DATABASE_NAME || "dev",
      password: process.env.DATABASE_PASSWORD || "postgres",
      port: process.env.DATABASE_PORT || 5432,
    },
  },
};
