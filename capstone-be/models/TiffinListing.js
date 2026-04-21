const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: String,
  description: String,
  mealType: String,
  pricePerDay: Number,
  location: String,
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TiffinProvider",
  },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("TiffinListing", schema);