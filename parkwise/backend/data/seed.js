const mongoose = require("mongoose");
require("dotenv").config();

const ParkingZone = require("../models/ParkingZone");

const zones = [
  {
    zoneName: "Main Gate Parking",
    totalSlots: 100,
    occupiedSlots: 25,
    entryCount: 25,
    exitCount: 0,
    location: "Near Main Entrance"
  },
  {
    zoneName: "Library Block Parking",
    totalSlots: 60,
    occupiedSlots: 15,
    entryCount: 15,
    exitCount: 0,
    location: "Behind Central Library"
  },
  {
    zoneName: "Hostel Parking",
    totalSlots: 80,
    occupiedSlots: 30,
    entryCount: 30,
    exitCount: 0,
    location: "Near Hostel Road"
  },
  {
    zoneName: "Admin Block Parking",
    totalSlots: 40,
    occupiedSlots: 10,
    entryCount: 10,
    exitCount: 0,
    location: "Beside Admin Office"
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await ParkingZone.deleteMany();
    await ParkingZone.insertMany(zones);

    console.log("Sample parking zones added successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedData();