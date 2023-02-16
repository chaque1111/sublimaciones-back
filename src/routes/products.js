const express = require("express");
const {
  getAllProducts,
  getProductById,
  getAllSizesByCategory,
  filterProducts,
} = require("../controllers/products");

const router = express();

router.get("/", getAllProducts);
router.get("/:name", getAllProducts);
router.get("/sizes/:category", getAllSizesByCategory);
router.get("/:id", getProductById);
router.put("/filter", filterProducts);

module.exports = router;
