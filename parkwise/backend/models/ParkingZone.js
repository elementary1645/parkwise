const mongoose = require("mongoose");

const parkingZoneSchema = new mongoose.Schema(
  {
    zoneName: {
      type: String,
      required: true,
    },
    totalSlots: {
      type: Number,
      required: true,
    },
    occupiedSlots: {
      type: Number,
      default: 0,
    },
    entryCount: {
      type: Number,
      default: 0,
    },
    exitCount: {
      type: Number,
      default: 0,
    },
    location: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ParkingZone", parkingZoneSchema);