const express = require("express");
const {
  getAllProducts,
  getProductById,
  getAllSizesByCategory,
  filterProducts,
  getColorsByCategory,
} = require("../controllers/products");

const router = express();

router.get("/", getAllProducts);
router.get("/search/:name", getAllProducts);
router.get("/sizes/:category", getAllSizesByCategory);
router.get("/color/:category", getColorsByCategory);
router.get("/:id", getProductById);
router.put("/filter", filterProducts);
module.exports = router;
