const Reservation = require("../models/Reservation"); // ✅ Ensure the model is imported

// ✅ Get all reservations
exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate("customer", "name email");
    res.json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get a single reservation by ID
exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.json(reservation);
  } catch (error) {
    console.error("Error fetching reservation:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Create a reservation
exports.createReservation = async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update a reservation
exports.updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedReservation = await Reservation.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.json(updatedReservation);
  } catch (error) {
    console.error("Error updating reservation:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete a reservation
exports.deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReservation = await Reservation.findByIdAndDelete(id);
    if (!deletedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.json({ message: "Reservation deleted" });
  } catch (error) {
    console.error("Error deleting reservation:", error);
    res.status(500).json({ error: error.message });
  }
};
