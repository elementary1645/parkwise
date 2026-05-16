const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const parkingRoutes = require("./routes/parkingRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/parking", parkingRoutes);

app.get("/", (req, res) => {
  res.send("ParkWise backend running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err.message));