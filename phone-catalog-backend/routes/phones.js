const express = require("express");
const router = express.Router();
const PHONES = require("../data/phones");

// GET /api/phones - Получить все телефоны
router.get("/", (req, res) => {
  const { model, sortBy, hotPrices } = req.query;

  try {
    let result = PHONES;

    if (model) {
      result = PHONES.filter((phone) => phone.id.includes(model));

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

    if (hotPrices === "true") {
      result = result.filter(
        (phone) => phone.priceDiscount < phone.priceRegular
      );

      result.sort((a, b) => {
        const discountA = a.priceRegular - b.priceDiscount;
        const discountB = b.priceRegular - b.priceDiscount;
        return discountB - discountA;
      });
    }

    res.json({
      data: result,
    });
  } catch (err) {
    res.json({
      message: "Error fetching phones",
      error: err.message,
    });
  }
});

router.get("/:id", (req, res) => {
  res.status(404).json({ message: "Phone not found" });
  try {
    const id = req.params.id;
    const phone = PHONES.find((phon) => phon.id === id);

    if (!phone) {
      return res.status(404).json({ message: "Phone not found" });
    }

    res.json(phone);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching phone",
      error: error.message,
    });
  }
});

module.exports = router;
