const express = require("express");
const router = express.Router();
const TABLETS = require("../data/tablets");

// GET /api/tablets - Получить все планшеты
router.get("/", (req, res) => {
  const { sort, page, items } = req.query;

  try {
    let result = [...TABLETS];

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
