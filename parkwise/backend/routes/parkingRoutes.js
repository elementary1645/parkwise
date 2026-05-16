const express = require("express");
const router = express.Router();

const {
  getZones,
  addZone,
  vehicleEntry,
  vehicleExit,
} = require("../controllers/parkingController");

router.get("/", getZones);
router.post("/", addZone);
router.put("/:id/entry", vehicleEntry);
router.put("/:id/exit", vehicleExit);

module.exports = router;