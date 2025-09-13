const restaurantModel = require("../models/restaurant-model");
const mongoose = require("mongoose");

// Create restaurant
const createrestcontroller = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;

    // Validation
    if (!title || !coords) {
      return res.status(400).send({
        success: false,
        message: "Please provide title and coordinates",
      });
    }

    const newRestaurant = new restaurantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    await newRestaurant.save();

    res.status(201).send({
      success: true,
      message: "New restaurant created successfully",
      restaurant: newRestaurant,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Restaurant API",
      error: error.message,
    });
  }
};

// Get all restaurants
const getallRestaurant = async (req, res) => {
  try {
    const restaurants = await restaurantModel.find({});

    if (!restaurants || restaurants.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No restaurants found",
      });
    }

    res.status(200).send({
      success: true,
      message: "All restaurants fetched successfully",
      totalCount: restaurants.length,
      restaurants,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Get All Restaurants API",
      error: error.message,
    });
  }
};

// Get restaurant by ID
const getRestaurantbyId = async (req, res) => {
  try {
    const restaurantid = req.params.id;

    // Check if ID format is valid
    if (!mongoose.Types.ObjectId.isValid(restaurantid)) {
      return res.status(400).send({
        success: false,
        message: "Invalid restaurant ID format",
      });
    }

    const restaurant = await restaurantModel.findById(restaurantid);

    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "Restaurant not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Restaurant fetched successfully",
      restaurant,
    });
  } catch (error) {
    console.error("Error fetching restaurant by ID:", error);
    res.status(500).send({
      success: false,
      message: "Error in getrestaurant by id",
      error: error.message,
    });
  }
};


const deleterestacontroller = async (req, res) => {
  try {
    const restaurantId = req.params.id;

    // Optional: Validate ObjectId
    if (!restaurantId || !mongoose.Types.ObjectId.isValid(restaurantId)) {
      return res.status(400).send({
        success: false,
        message: "Invalid or missing restaurant ID",
      });
    }

    const deletedRestaurant = await restaurantModel.findByIdAndDelete(restaurantId);

    if (!deletedRestaurant) {
      return res.status(404).send({
        success: false,
        message: "Restaurant not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Restaurant successfully deleted",
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).send({
      success: false,
      message: "Error in Delete Restaurant API",
      error: error.message,
    });
  }
};

module.exports = { createrestcontroller, getallRestaurant, getRestaurantbyId, deleterestacontroller};
