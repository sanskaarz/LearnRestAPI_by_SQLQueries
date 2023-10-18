const Pool = require("pg").Pool;

const pool = new Pool({
user: "postgres",
host: "localhost",
database: "students",
password: "test",
port: 5432,

});

// const testDbConnection = async () => {
//     try {
//       await sequelize.authenticate();
//       console.log("Connection has been established successfully.");
//     } catch (error) {
//       console.error("Unable to connect to the database:", error);
//     }
// };

module.exports =pool;