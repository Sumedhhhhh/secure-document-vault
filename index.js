const express = require("express");
const connectDB = require("./config/db");

const app = express();

app.use(express.json());

connectDB();
const healthRoutes = require("./routes/health");
app.use("/api", healthRoutes);

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Secure Document Vault server is running on port ${PORT}`);
});
