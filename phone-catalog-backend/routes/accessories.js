const express = require("express");
const router = express.Router();
const ACCESSORIES = require("../data/accessories");

// GET /api/accessories - Получить все аксессуары
router.get("/", (req, res) => {
  try {
    res.json({
      data: ACCESSORIES,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching accessories",
      error: error.message,
    });
  }
});

// GET /api/accessories/:id - Получить аксессуар по ID
router.get("/:id", (req, res) => {
  try {
    const id = req.params.id;
    const accessory = ACCESSORIES.find((acc) => acc.id === id);

    if (!accessory) {
      return res.status(404).json({ message: "Accessory not found" });
    }

    res.json(accessory);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching accessory",
      error: error.message,
    });
  }
});

module.exports = router;
