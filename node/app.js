const path = require("path");
const express = require("express");
const mysql = require("mysql2/promise");
const { faker } = require("@faker-js/faker");

const mysqlHost = process.env.MYSQL_HOST || "MYSQL_HOST";
const mysqlUser = process.env.MYSQL_USER || "MYSQL_USER";
const mysqlPassword = process.env.MYSQL_PASSWORD || "MYSQL_PASSWORD";
const mysqlDatabase = process.env.MYSQL_DATABASE || "MYSQL_DATABASE";
const mysqlPort = process.env.MYSQL_PORT || 3306;
const port = process.env.PORT || 3000;

let mysqlConnection;

(async function connectToMySQL() {
  try {
    mysqlConnection = await mysql.createConnection({
      host: mysqlHost,
      user: mysqlUser,
      password: mysqlPassword,
      database: mysqlDatabase,
      port: mysqlPort,
    });
    const createTableSql = `
		CREATE TABLE IF NOT EXISTS people (
		  id INT AUTO_INCREMENT PRIMARY KEY,
		  name VARCHAR(255) NOT NULL
		)
	  `;
    await mysqlConnection.query(createTableSql);
  } catch (err) {
    console.error(err);
  }
})();

async function createPerson(name) {
  try {
    const createPersonSql = `INSERT INTO \`people\`(\`name\`) VALUES ('${name}')`;
    await mysqlConnection.query(createPersonSql);
  } catch (err) {
    console.error(err);
  }
}

async function getPeople() {
  try {
    const getPeopleSql = "SELECT * FROM people";
    const [rows] = await mysqlConnection.query(getPeopleSql);
    return rows;
  } catch (err) {
    console.error(err);
  }
}

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", async (_, res) => {
  const [, people] = await Promise.all([
    createPerson(faker.person.fullName()),
    getPeople(),
  ]);
  res.render("index", { people });
});

app.get("/healthz", (_, res) => {
  res.status(200).send("OK");
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
