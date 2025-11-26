const express = require("express");
const router = express.Router();
const TABLETS = require("../data/tablets");

// GET /api/tablets - Получить все планшеты
router.get("/", (rea, res) => {
  try {
    res.json({
      data: TABLETS,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching tablets",
      error: error.message,
    });
  }
});

// GET /api/tablets/:id - Получить планшет по ID
router.get("/:id", (req, res) => {
  try {
    const id = req.params.id;

    const tablet = TABLETS.find((tabl) => tabl.id === id);

    if (!tablet) {
      return res.status(404).json({ message: "Tablet not found" });
    }

    res.json(tablet);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching tablet",
      error: error.message,
    });
  }
});

module.exports = router;
