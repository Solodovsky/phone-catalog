const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/products", require("./routes/products"));
app.use("/api/phones", require("./routes/phones"));
app.use("/api/tablets", require("./routes/tablets"));
app.use("/api/accessories", require("./routes/accessories"));

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    message: "Phone Catalog API is running!",
    timestamp: new Date().toISOString(),
    endpoints: [
      "/api/products - All products",
      "/api/phones - Phones only",
      "/api/tablets - Tablets only",
      "/api/accessories - Accessories only",
    ],
  });
});

// Обработка 404
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📚 API available at http://localhost:${PORT}/api`);
});
