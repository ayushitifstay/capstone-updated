require("dotenv").config();
const mongoose = require("mongoose");
const TiffinListing = require("../models/TiffinListing");

mongoose.connect(process.env.MONGO_URI);

(async () => {
  await TiffinListing.deleteMany();

  await TiffinListing.insertMany([
    {
      title: "Home Veg Tiffin",
      description: "Healthy food",
      mealType: "Veg",
      pricePerDay: 120,
      location: "Pune",
      providerId: new mongoose.Types.ObjectId(),
    },
    {
      title: "Non Veg Meals",
      description: "Chicken meals",
      mealType: "Non-Veg",
      pricePerDay: 180,
      location: "Mumbai",
      providerId: new mongoose.Types.ObjectId(),
    },
    {
      title: "Annapurna Meals",
      description: "veg meals",
      mealType: "Veg",
      pricePerDay: 180,
      location: "Banglore",
      providerId: new mongoose.Types.ObjectId(),
    },
    {
      title: "HomeStay Meals",
      description: "veg meals",
      mealType: "Non-Veg",
      pricePerDay: 180,
      location: "Pune",
      providerId: new mongoose.Types.ObjectId(),
    },
    {
      title: "Sprakle Meals",
      description: "veg meals",
      mealType: "Veg",
      pricePerDay: 180,
      location: "Banglore",
      providerId: new mongoose.Types.ObjectId(),
    },
  ]);

  console.log("Seed Done"); 
  process.exit();
})();