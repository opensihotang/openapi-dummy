const sql = require("mssql");
const config = {
  server: "localhost",
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: "test",
  port: +process.env.DBPORT,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

async () => {
  try {
    // make sure that any items are correctly URL encoded in the connection string
    await sql.connect(config);
    const result = await sql.query`select * from test`;
    console.dir(result);
  } catch (err) {
    console.log(err, "error>>>>>>>>>>>>>>>>>>>>>>>>>");
  }
};

module.exports = config;
