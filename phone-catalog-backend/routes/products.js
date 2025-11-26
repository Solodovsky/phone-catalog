const express = require("express");
const router = express.Router();
const PRODUCTS = require("../data/products");
const PHONES = require("../data/phones");
const TABLETS = require("../data/tablets");
const ACCESSORIES = require("../data/accessories");

// GET /api/products - Получить все продукты
router.get("/", (req, res) => {
  try {
    res.json({
      data: PRODUCTS,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching tablets",
      error: error.message,
    });
  }
});

// GET /api/products/:id - Универсальный поиск по ID во всех категориях
router.get("/:id", (req, res) => {
  try {
    const id = req.params.id;

    let product = PRODUCTS.find(
      (prod) => String(prod.id) === id || prod.itemId === id
    );

    if (!product) {
      product = PHONES.find((phone) => phone.id === id);
    }

    if (!product) {
      product = TABLETS.find((tablet) => tablet.id === id);
    }

    if (!product) {
      product = ACCESSORIES.find((accessory) => accessory.id === id);
    }

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching product",
      error: error.message,
    });
  }
});

module.exports = router;
