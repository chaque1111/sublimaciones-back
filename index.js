const server = require("./src/app");
const {preloadProduct} = require("./src/controllers/products");
const {conn} = require("./src/db");

conn.sync({force: false}).then(() => {
  preloadProduct();
  server.listen(3001);
  console.log("server is running on port 3001");
});
