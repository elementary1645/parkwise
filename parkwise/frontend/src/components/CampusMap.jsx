import { motion } from "framer-motion";
import { Car, ParkingCircle, Building2 } from "lucide-react";

function CampusMap({ zones }) {
  const totalEntries = zones.reduce((sum, zone) => sum + zone.entryCount, 0);
  const totalExits = zones.reduce((sum, zone) => sum + zone.exitCount, 0);
  const vehiclesInside = totalEntries - totalExits;

  return (
    <div className="campus-map">
      <div className="map-header">
        <h2>Animated Campus Map</h2>
        <p>Live smart-campus vehicle movement simulation</p>
      </div>

      <div className="clean-map-area">
        <div className="entry-gate-clean">ENTRY GATE</div>
        <div className="exit-gate-clean">EXIT GATE</div>

        <div className="main-road-clean"></div>
        <div className="cross-road-clean"></div>

        <motion.div
          className="animated-car car-a"
          animate={{ x: [0, 260, 520] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        >
          <Car size={30} />
        </motion.div>

        <motion.div
          className="animated-car car-b"
          animate={{ y: [0, 170, 300] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          <Car size={30} />
        </motion.div>

        <div className="map-building building-one">
          <Building2 size={24} />
          <span>Admin Block</span>
        </div>

        <div className="map-building building-two">
          <Building2 size={24} />
          <span>Library</span>
        </div>

        <div className="map-building building-three">
          <Building2 size={24} />
          <span>Hostel</span>
        </div>

        <div className="parking-grid-map">
          {zones.map((zone) => {
            const available = zone.totalSlots - zone.occupiedSlots;
            const percentage = Math.round(
              (zone.occupiedSlots / zone.totalSlots) * 100
            );

            return (
              <div className="clean-parking-card" key={zone._id}>
                <ParkingCircle size={26} />
                <h4>{zone.zoneName}</h4>
                <h3>{available} Free</h3>
                <p>{percentage}% occupied</p>
              </div>
            );
          })}
        </div>

        <div className="inside-counter-clean">
          <h2>{vehiclesInside}</h2>
          <p>Vehicles Inside Campus</p>
        </div>
      </div>
    </div>
  );
}

export default CampusMap;