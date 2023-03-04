const express = require("express");
const {
  getAllProducts,
  getProductById,
  getAllSizesByCategory,
  filterProducts,
  getColorsByCategory,
  createProduct,
  getOpcionesByCategory,
  getCarrouselDetail,
} = require("../controllers/products");

const router = express();

router.get("/", getAllProducts);
router.get("/options", getCarrouselDetail);
router.get("/options/:id", getOpcionesByCategory);
router.get("/search/:name", getAllProducts);
router.get("/sizes/:category", getAllSizesByCategory);
router.get("/color/:category", getColorsByCategory);
router.get("/:id", getProductById);
router.put("/filter", filterProducts);
router.post("/create", createProduct);
module.exports = router;
