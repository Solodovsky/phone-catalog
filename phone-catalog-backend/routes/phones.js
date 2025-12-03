const express = require("express");
const router = express.Router();
const PHONES = require("../data/phones");

// GET /api/phones - Получить все телефоны
router.get("/", (req, res) => {
  const { model, sort, hotPrices, page, perPage } = req.query;

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

    const perPageNum = parseInt(perPage || "16", 10);
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
        perPage: validPerPage,
        totalPages: Math.ceil(total / validPerPage),
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching phones",
      error: err.message,
    });
  }
});

module.exports = router;
