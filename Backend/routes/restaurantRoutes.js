const express = require("express");
const restaurantController = require("../controllers/restaurantController");

console.log("Controller imports:", restaurantController);

const {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} = restaurantController;

const router = express.Router();

router.post("/", createRestaurant);
router.get("/", getRestaurants);
router.get("/:id", getRestaurantById);
router.put("/:id", updateRestaurant);
router.delete("/:id", deleteRestaurant);

module.exports = router;
