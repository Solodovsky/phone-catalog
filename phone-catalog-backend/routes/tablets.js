const express = require("express");
const router = express.Router();
const TABLETS = require("../data/tablets");

// GET /api/tablets - Получить все планшеты
router.get("/", (req, res) => {
  const { sort, page, perPage } = req.query;

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

    let paginatedResult = result;

    if (perPage && perPage !== "all") {
      const perPageNum = parseInt(perPage, 10);
      const pageNum = parseInt(page || "1", 10);

      if (!isNaN(perPageNum) && perPageNum > 0) {
        const currentPage = !isNaN(pageNum) && pageNum > 0 ? pageNum : 1;
        const startIndex = (currentPage - 1) * perPageNum;
        const endIndex = startIndex + perPageNum;

        paginatedResult = result.slice(startIndex, endIndex);
      }
    }

    if (perPage && perPage !== "all") {
      res.json({
        data: paginatedResult,
        pagination: {
          total,
          page: parseInt(page || "1", 10),
          perPage: parseInt(perPage, 10),
          totalPages: Math.ceil(total / parseInt(perPage, 10)),
        },
      });
    } else {
      res.json({
        data: result,
      });
    }
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
