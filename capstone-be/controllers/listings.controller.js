const TiffinListing = require("../models/TiffinListing");


exports.getAll = async (req, res) => {
  try {
    const listings = await TiffinListing.find();
    res.status(200).json(listings);
  } catch (err) {
    console.log("GET ALL ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getOne = async (req, res) => {
  try {
    const listing = await TiffinListing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.status(200).json(listing);
  } catch (err) {
    console.log("GET ONE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.create = async (req, res) => {
  try {
    console.log("CREATE HIT");

    
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const listing = await TiffinListing.create({
      ...req.body,
      providerId: req.user.id,
    });

    res.status(201).json(listing);
  } catch (err) {
    console.log("CREATE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.update = async (req, res) => {
  try {
    const listing = await TiffinListing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

  
    if (listing.providerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    Object.assign(listing, req.body);
    await listing.save();

    res.status(200).json(listing);
  } catch (err) {
    console.log("UPDATE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.remove = async (req, res) => {
  try {
    const listing = await TiffinListing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    
    if (listing.providerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await listing.deleteOne();

    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    console.log("DELETE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};