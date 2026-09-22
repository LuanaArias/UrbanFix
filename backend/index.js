const express = require("express");
const cors = require("cors");
require("dotenv").config();

const prisma = require("./src/config/prisma");

const app = express();

const PORT = process.env.PORT || 3001;

const authRoutes = require("./src/routes/authRoutes");

app.use(cors());
app.use(express.json());

// Ruta de autenticacion
app.use("/api/auth", authRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date(),
  });
});

// Test de conexion con Postgres
app.get("/health/db", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      status: "ok",
      database: "connected",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      database: "disconnected",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});