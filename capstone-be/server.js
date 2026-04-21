const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

console.log("Starting server...");


connectDB();

const app = express();


app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
}));


app.use(express.json());


app.use((req, res, next) => {
  console.log(`API HIT: ${req.method} ${req.url}`);
  next();
});


app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/listings", require("./routes/listings.routes"));


app.get("/", (req, res) => {
  res.send("Server is working");
});


app.use((err, req, res, next) => {
  console.log("GLOBAL ERROR:", err);
  res.status(500).json({ message: "Server crashed" });
});

// Start server
app.listen(5000, () => console.log("Server running on 5000"));