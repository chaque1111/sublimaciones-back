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
    const name = req.params.name;
    const allProducts = await Producto.findAll();
    if (name) {
      let productByName = await allProducts.filter((e) =>
        e.name.toUpperCase().includes(name.toUpperCase())
      );
      productByName.length
        ? res.status(200).send(productByName)
        : res.status(200).send("No se encontraron councidencias");
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
    const arrayForSize = [];
    sizesByCategory.map((e) =>
      e.capacity && !arrayForSize.includes(e.capacity)
        ? arrayForSize.push(e.capacity)
        : e.capacity
    );
    res.status(200).send(arrayForSize);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getColorsByCategory = async (req, res) => {
  try {
    const {category} = req.params;

    const colors = await Producto.findAll({
      where: {category: category},
      attributes: ["color"],
    });
    const arrayForColor = [];
    colors.map((e) =>
      e.color && !arrayForColor.includes(e.color)
        ? arrayForColor.push(e.color)
        : e.color
    );
    res.status(200).send(arrayForColor);
  } catch (error) {
    res.status(404).send(e);
  }
};

const getProductById = async (req, res) => {
  const id = req.params.id;
  const product = await Producto.findByPk(id);
  res.send(product);
};

const filterProducts = async (req, res) => {
  try {
    const obj = req.body;
    const color = obj.color ? obj.color.toLowerCase() : null;
    const sizes = obj.sizes ? obj.sizes : null;

    if (color && !sizes) {
      const products = await Producto.findAll({
        where: {color: color},
      });
      products.length
        ? res.status(200).send(products)
        : res.status(300).send("No encontrado");
    }
    if (sizes && !color) {
      const products = await Producto.findAll({
        where: {capacity: sizes},
      });
      products.length
        ? res.status(200).send(products)
        : res.status(300).send("No encontrado");
    }
    if (sizes && color) {
      const products = await Producto.findAll({
        where: {capacity: sizes, color: color},
      });
      products.length
        ? res.status(200).send(products)
        : res.status(300).send("No encontrado");
    }
  } catch (e) {
    res.send(e);
  }
};

module.exports = {
  getAllProducts,
  preloadProduct,
  getProductById,
  getAllSizesByCategory,
  filterProducts,
  getColorsByCategory,
};
