const express = require("express");
const router = express.Router();
const PHONES = require("../data/phones");

// GET /api/phones - Получить все телефоны
router.get("/", (req, res) => {
  const { model, sort, hotPrices, page, items } = req.query;

  try {
    let result = [...PHONES];

    if (model) {
      result = result.filter((phone) => phone.id.includes(model));

      if (model.includes("iphone-14")) {
        result.sort((a, b) => {
          const aIsPro = a.id.includes("iphone-14-pro");
          const bIsPro = b.id.includes("iphone-14-pro");

          if (aIsPro && !bIsPro) return -1;
          if (!aIsPro && bIsPro) return 1;

          return 0;
        });
      }
    }

    if (hotPrices) {
      result = result.filter(
        (phone) => phone.priceDiscount < phone.priceRegular
      );

      result.sort((a, b) => {
        const discountA = a.priceRegular - b.priceDiscount;
        const discountB = b.priceRegular - b.priceDiscount;
        return discountB - discountA;
      });
    }

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

    const perPageNum = Number(items || "16");
    const pageNum = Number(page || "1");

    const startIndex = (pageNum - 1) * perPageNum;
    const endIndex = startIndex + perPageNum;

    const paginatedResult = result.slice(startIndex, endIndex);

    res.json({
      data: paginatedResult,
      pagination: {
        total,
        page: pageNum,
        items: perPageNum,
        totalPages: Math.ceil(total / perPageNum),
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching phones",
      error: err.message,
    });
  }
});

// GET /api/phones/:id - Получить телефон по ID
router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const phone = PHONES.find((item) => item.id === id);

    if (!phone) {
      return res.status(404).json({ message: "Phone not found" });
    }

    res.json(phone);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching phone",
      error: err.message,
    });
  }
});

module.exports = router;
