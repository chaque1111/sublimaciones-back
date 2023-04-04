const express = require("express");
const {
  searchProductByName,
  getProductById,

  createProduct,
  getOpcionesByCategory,
  getCarrouselDetail,
  deleteProductById,
  putProductById,
  getProductsByCategory,
} = require("../controllers/products");

const router = express();
router.get("/categorie", getProductsByCategory);
router.get("/categorie/:categoria", getProductsByCategory);
router.get("/options", getCarrouselDetail);
router.get("/options/:id", getOpcionesByCategory);

router.get("/detail/:id", getProductById);
router.put("/search", searchProductByName);

router.put("/edit", putProductById);
router.post("/create", createProduct);
router.delete("/delete/:id", deleteProductById);
module.exports = router;
