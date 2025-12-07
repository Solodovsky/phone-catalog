const express = require("express");
const router = express.Router();
const ACCESSORIES = require("../data/accessories");

// GET /api/accessories - Получить все аксессуары
router.get("/", (req, res) => {
  const { sort, page, items } = req.query;

  try {
    let result = [...ACCESSORIES];

    if (sort) {
      switch (sort) {
        case "age":
          result.sort((a, b) => {
            if (a.isNew && !b.isNew) return -1;
            if (!a.isNew && b.isNew) return 1;
            return b.id.localeCompare(a.id);
          });
          break;
        case "title":
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "price":
          result.sort((a, b) => a.priceDiscount - b.priceDiscount);
          break;
        default:
          break;
      }
    }

    const total = result.length;

    const perPageNum = parseInt(items || "16", 10);
    const pageNum = parseInt(page || "1", 10);

    const validPerPage = !isNaN(perPageNum) && perPageNum > 0 ? perPageNum : 16;
    const validPage = !isNaN(pageNum) && pageNum > 0 ? pageNum : 1;

    const startIndex = (validPage - 1) * validPerPage;
    const endIndex = startIndex + validPerPage;

    const paginatedResult = result.slice(startIndex, endIndex);

    res.json({
      data: paginatedResult,
      pagination: {
        total,
        page: validPage,
        items: validPerPage,
        totalPages: Math.ceil(total / validPerPage),
      },
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
