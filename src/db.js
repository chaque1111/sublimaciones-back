require("dotenv").config();
const {Sequelize} = require("sequelize");
const fs = require("fs");
const path = require("path");
const exp = require("constants");
const {DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_DEPLOY = ""} = process.env;

const sequelize =
  DB_DEPLOY === "localhost"
    ? new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
        {logging: false, native: false}
      )
    : new Sequelize("postgres", "Deimos2", "sublimaciones1234-", {
        host: "sublimacionesdb.ccigqsmdszrz.us-east-1.rds.amazonaws.com",
        port: 5432,
        logging: false,
        maxConcurrentQueries: 100,
        dialect: "postgres",
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
        pool: {maxConnections: 5, maxIdleTime: 30},
        language: "en",
      });
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {Prducto, User} = sequelize.models;

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
