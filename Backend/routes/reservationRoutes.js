const express = require("express");
const {
  getReservations,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
} = require("../controllers/reservationController"); 

const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, isAdmin, getReservations);
router.get("/:id", protect, isAdmin, getReservationById);
router.post("/", protect, createReservation);
router.put("/:id", protect, isAdmin, updateReservation);
router.delete("/:id", protect, isAdmin, deleteReservation);

module.exports = router;
