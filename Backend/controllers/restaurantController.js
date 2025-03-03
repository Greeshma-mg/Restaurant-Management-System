const asyncHandler = require("express-async-handler");
const Restaurant = require("../models/Restaurant");

const createRestaurant = asyncHandler(async (req, res) => {
  const { name, location, cuisine, description } = req.body;
  const restaurant = await Restaurant.create({
    name,
    location,
    cuisine,
    description,
  });
  res.status(201).json(restaurant);
});

const getRestaurants = asyncHandler(async (req, res) => {
  const restaurants = await Restaurant.find();
  res.json(restaurants);
});

const getRestaurantById = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  if (restaurant) {
    res.json(restaurant);
  } else {
    res.status(404).json({ message: "Restaurant not found" });
  }
});

const updateRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  if (restaurant) {
    restaurant.name = req.body.name || restaurant.name;
    restaurant.location = req.body.location || restaurant.location;
    restaurant.cuisine = req.body.cuisine || restaurant.cuisine;
    restaurant.description = req.body.description || restaurant.description;
    const updatedRestaurant = await restaurant.save();
    res.json(updatedRestaurant);
  } else {
    res.status(404).json({ message: "Restaurant not found" });
  }
});

const deleteRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  if (restaurant) {
    await restaurant.deleteOne();
    res.json({ message: "Restaurant deleted" });
  } else {
    res.status(404).json({ message: "Restaurant not found" });
  }
});

module.exports = { createRestaurant, getRestaurants, getRestaurantById, updateRestaurant, deleteRestaurant };
