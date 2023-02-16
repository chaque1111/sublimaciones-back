const {Producto} = require("../db.js");
const json = require("./products.json");

const preloadProduct = async () => {
  let allProducts = json;
  await Producto.bulkCreate(allProducts);
  //   for (let i = 0; i < allProducts.length; i++) {
  //     await Producto.findOrCreate({
  //       where: {name: allProducts[i].name},
  //       defaults: {...allProducts[i]},
  //     });
  //   }
};

const getAllProducts = async (req, res) => {
  try {
    const {name} = req.params;
    const allProducts = await Producto.findAll();
    if (name) {
      let productByName = await allProducts.filter((e) =>
        e.name.toUpperCase().includes(name.toUpperCase())
      );
      productByName.length
        ? res.status(200).send(productByName)
        : res.status(300).send("No se encontraron councidencias");
    } else {
      allProducts.length
        ? res.status(200).send(allProducts)
        : res.status(300).send("algo salió mal");
    }
  } catch (e) {
    res.status(400).send(e);
  }
};
const getAllSizesByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const sizesByCategory = await Producto.findAll({
      where: {category: category},
      attributes: ["capacity"],
    });
    const arrayToSizes = [];
    sizesByCategory.map((e) =>
      e.capacity && !arrayToSizes.includes(e.capacity)
        ? arrayToSizes.push(e.capacity)
        : e.capacity
    );
    res.status(200).send(arrayToSizes);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getProductById = async (req, res) => {
  const id = req.params.id;
  const product = await Producto.findByPk(id);
  res.send(product);
};

const filterProducts = async (req, res) => {
  const obj = req.body;
  const size = obj.sizes;
  const color = obj.color;
  await Producto.findAll({where: {color: color, size: size}});
  res.send(obj);
};

module.exports = {
  getAllProducts,
  preloadProduct,
  getProductById,
  getAllSizesByCategory,
  filterProducts,
};
