const ParkingZone = require("../models/ParkingZone");

exports.getZones = async (req, res) => {
  try {
    const zones = await ParkingZone.find();
    res.json(zones);
  } catch (error) {
    res.status(500).json({ message: "Error fetching zones" });
  }
};

exports.addZone = async (req, res) => {
  try {
    const zone = await ParkingZone.create(req.body);
    res.status(201).json(zone);
  } catch (error) {
    res.status(500).json({ message: "Error adding zone" });
  }
};

exports.vehicleEntry = async (req, res) => {
  try {
    const zone = await ParkingZone.findById(req.params.id);

    if (!zone) {
      return res.status(404).json({ message: "Zone not found" });
    }

    if (zone.occupiedSlots >= zone.totalSlots) {
      return res.status(400).json({ message: "Parking zone is full" });
    }

    zone.occupiedSlots += 1;
    zone.entryCount += 1;

    await zone.save();

    res.json({
      message: "Vehicle entered successfully",
      formula: `${zone.occupiedSlots - 1} + 1 = ${zone.occupiedSlots}`,
      zone,
    });
  } catch (error) {
    res.status(500).json({ message: "Error processing vehicle entry" });
  }
};

exports.vehicleExit = async (req, res) => {
  try {
    const zone = await ParkingZone.findById(req.params.id);

    if (!zone) {
      return res.status(404).json({ message: "Zone not found" });
    }

    if (zone.occupiedSlots <= 0) {
      return res.status(400).json({ message: "No vehicles to exit" });
    }

    zone.occupiedSlots -= 1;
    zone.exitCount += 1;

    await zone.save();

    res.json({
      message: "Vehicle exited successfully",
      formula: `${zone.occupiedSlots + 1} - 1 = ${zone.occupiedSlots}`,
      zone,
    });
  } catch (error) {
    res.status(500).json({ message: "Error processing vehicle exit" });
  }
};