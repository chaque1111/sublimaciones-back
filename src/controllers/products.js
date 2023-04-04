const {Jarro, Indumentaria} = require("../db.js");
const json = require("./products.json");

const preloadProduct = async () => {
  let allProducts = json;
  await Jarro.bulkCreate(allProducts);
  //   for (let i = 0; i < allProducts.length; i++) {
  //     await Jarro.findOrCreate({
  //       where: {name: allProducts[i].name},
  //       defaults: {...allProducts[i]},
  //     });
  //   }
};

const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.categoria;
    if (category === "jarros") {
      const jarros = await Jarro.findAll({
        attributes: [
          "id",
          "name",
          "image",
          "image2",
          "category",
          "price",
          "color",
          "capacity",
        ],
      });
      jarros.length
        ? res.status(200).send(jarros)
        : res.status(200).send("algo salió mal");
    }
    console.log(category);
    if (category === "indumentaria") {
      const products = await Indumentaria.findAll({
        attributes: [
          "id",
          "name",
          "image",
          "image2",
          "category",
          "price",
          "color",
          "size",
        ],
      });
      products.length
        ? res.status(200).send(products)
        : res.status(200).send("algo salió mal");
    } else if (!category) {
      const jarros = await Jarro.findAll({
        attributes: [
          "id",
          "name",
          "image",
          "image2",
          "category",
          "price",
          "color",
          "capacity",
        ],
      });
      const indumentaria = await Indumentaria.findAll({
        attributes: [
          "id",
          "name",
          "image",
          "image2",
          "category",
          "price",
          "color",
          "size",
        ],
      });
      let products = jarros.concat(indumentaria);
      products.length
        ? res.status(200).send(products)
        : res.status(200).send("algo salió mal");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
const searchProductByName = async (req, res) => {
  try {
    const {name, category} = req.body;

    if (!category) {
      const allJarros = await Jarro.findAll({
        attributes: [
          "id",
          "name",
          "image",
          "image2",
          "category",
          // "capacity",
          "price",
          "color",
        ],
      });
      const allIndumentary = await Indumentaria.findAll({
        attributes: [
          "id",
          "name",
          "image",
          "image2",
          "category",
          // "size",
          "price",
          "color",
        ],
      });
      const allProducts = allJarros.concat(allIndumentary);
      let productByName = await allProducts.filter((e) =>
        e.name.toUpperCase().includes(name.toUpperCase())
      );
      productByName.length
        ? res.status(200).send(productByName)
        : res.status(200).send("No se encontraron councidencias");
    }

    if (category) {
      if (category == "jarros") {
        let jarros = await Jarro.findAll({
          attributes: [
            "id",
            "name",
            "image",
            "image2",
            "category",
            "capacity",
            "price",
            "color",
          ],
        });
        let productByName = await jarros.filter((e) =>
          e.name.toUpperCase().includes(name.toUpperCase())
        );
        productByName.length
          ? res.status(200).send(productByName)
          : res.status(200).send("No se encontraron councidencias");
      }
      if (category == "indumentaria") {
        let indumentaria = await Indumentaria.findAll({
          attributes: [
            "id",
            "name",
            "image",
            "image2",
            "category",
            "size",
            "price",
            "color",
          ],
        });
        let productByName = await indumentaria.filter((e) =>
          e.name.toUpperCase().includes(name.toUpperCase())
        );
        productByName.length
          ? res.status(200).send(productByName)
          : res.status(200).send("No se encontraron councidencias");
      }
    }
  } catch (e) {
    res.status(400).send(e);
  }
};

const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    if (id.length < 13) {
      const product = await Jarro.findByPk(id);
      if (product) {
        res.status(200).send(product);
      } else {
        res.status(200).send(product);
      }
    } else {
      {
        const product = await Indumentaria.findByPk(id);
        if (product) {
          res.status(200).send(product);
        } else {
          res.status(200).send(product);
        }
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
const getOpcionesByCategory = async (req, res) => {
  try {
    const id = req.params.id;
    if (id.length <= 4) {
      const jarros = await Jarro.findAll({
        attributes: ["name", "image", "id"],
      });
      if (jarros.length >= 6) {
        let product = await Jarro.findByPk(id);
        let options = jarros.filter((e) => e.id != id);
        let arrayOpt = options.sort(function () {
          return Math.random() - 0.5;
        });
        let sliceOpt = arrayOpt.slice(0, 5);
        sliceOpt.push({
          id: product.id,
          name: product.name,
          image: product.image,
        });

        res.status(200).send(sliceOpt.reverse());
      } else {
        let product = await Jarro.findByPk(id, {
          attributes: ["name", "image", "id"],
        });
        let arrayOpt = jarros.filter((e) => e.id != product.id);
        arrayOpt = arrayOpt.sort(function () {
          return Math.random() - 0.5;
        });
        arrayOpt.push(product);
        res.status(200).send(arrayOpt.reverse());
      }
    } else {
      const indumentaria = await Indumentaria.findAll({
        attributes: ["image", "name", "id"],
      });

      if (indumentaria.length >= 6) {
        const product = await Indumentaria.findByPk(id, {
          attributes: ["name", "image", "id"],
        });

        let arrayOpt = indumentaria.filter((e) => e.id != id);
        arrayOpt = arrayOpt.sort(function () {
          return Math.random() - 0.5;
        });
        arrayOpt = arrayOpt.slice(0, 5);
        arrayOpt.push(product);
        res.status(200).send(arrayOpt.reverse());
      } else {
        const product = await Indumentaria.findByPk(id, {
          attributes: ["name", "image", "id"],
        });
        let arrayOpt = indumentaria.filter((e) => e.id != product.id);

        arrayOpt = arrayOpt.sort(function () {
          return Math.random() - 0.5;
        });
        arrayOpt.push(product);
        res.status(200).send(arrayOpt.reverse());
      }
    }
  } catch (e) {
    res.status(400).send(e);
  }
};

const getCarrouselDetail = async (req, res) => {
  try {
    const productsRandoms = await Jarro.findAll({
      attributes: ["id", "image", "name"],
    });
    res.status(200).send(
      productsRandoms.sort(function () {
        return Math.random() - 0.5;
      })
    );
  } catch (error) {
    res.status(400).send(error);
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      image1,
      image2,
      color,
      capacity,
      description,
      price,
      sizes,
    } = req.body;
    if (category === "jarros") {
      const [product, isCreated] = await Jarro.findOrCreate({
        where: {name: name},
        defaults: {
          name,
          category,
          image: image1,
          image2: image2 ? image2 : null,
          color,
          capacity,
          description,
          price,
          sizes,
        },
      });
      if (isCreated) {
        res.status(200).send("El producto fué creado correctamente");
      } else {
        res.status(200).send("Ya existe un Producto con ese nombre");
      }
    } else {
      console.log(sizes);
      const [product, isCreated] = await Indumentaria.findOrCreate({
        where: {name: name},
        defaults: {
          name,
          category,
          image: image1,
          image2: image2 ? image2 : null,
          color,
          size: sizes,
          description,
          price,
        },
      });
      if (isCreated) {
        res.status(200).send("El producto fué creado correctamente");
      } else {
        res.status(200).send("Ya existe un Producto con ese nombre");
      }
    }
  } catch (e) {
    console.log(e);
  }
};
const putProductById = async (req, res) => {
  try {
    const {id, name, category, capacity, description, image, image2, price} =
      req.body;

    await Jarro.update(
      {
        name: name,
        category: category,
        capacity,
        capacity,
        description: description,
        image: image,
        image2: image2,
        price: price,
      },
      {where: {id: id}}
    );

    res.status(200).send("Producto editado correctamente");
  } catch (error) {
    res.status(400).send(error);
  }
};
const deleteProductById = async (req, res) => {
  try {
    const {id} = req.params;
    await Jarro.destroy({where: {id: id}});
    res.status(200).send("Producto eliminado correctamente");
  } catch (error) {
    res.status(400).send(error);
  }
};
module.exports = {
  searchProductByName,
  preloadProduct,
  getProductById,

  createProduct,
  getOpcionesByCategory,
  getCarrouselDetail,
  deleteProductById,
  putProductById,
  getProductsByCategory,
};
