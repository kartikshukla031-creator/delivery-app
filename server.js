const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const orderRoutes = require("./orderRoutes");
const authRoutes = require("./authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

app.use("/orders", orderRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running 🚀"));