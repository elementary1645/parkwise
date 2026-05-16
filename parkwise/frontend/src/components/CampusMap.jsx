import { ParkingCircle, MapPin } from "lucide-react";

function CampusMap({ zones }) {
  const totalEntries = zones.reduce((sum, zone) => sum + zone.entryCount, 0);
  const totalExits = zones.reduce((sum, zone) => sum + zone.exitCount, 0);
  const vehiclesInside = totalEntries - totalExits;

  const mapZones = [
    {
      name: "Main Gate Parking",
      top: "72%",
      left: "20%",
    },
    {
      name: "Library Block Parking",
      top: "28%",
      left: "58%",
    },
    {
      name: "Hostel Parking",
      top: "53%",
      left: "76%",
    },
    {
      name: "Admin Block Parking",
      top: "20%",
      left: "30%",
    },
  ];

  const getZoneData = (name) => zones.find((zone) => zone.zoneName === name);

  return (
    <div className="campus-map">
      <div className="map-header">
        <h2>MSRIT Smart Campus Map</h2>
        <p>Real-time parking allocation over actual campus layout</p>
      </div>

      <div className="real-campus-map">
        <img src="/campus-map.png" alt="Campus Map" className="campus-bg" />

        <div className="map-pin main-entry">
          <MapPin size={18} />
          <span>Entry</span>
        </div>

        <div className="map-pin exit-point">
          <MapPin size={18} />
          <span>Exit</span>
        </div>

        {mapZones.map((item, index) => {
          const zone = getZoneData(item.name);
          const available = zone ? zone.totalSlots - zone.occupiedSlots : 0;
          const percentage = zone
            ? Math.round((zone.occupiedSlots / zone.totalSlots) * 100)
            : 0;

          return (
            <div
              key={index}
              className="real-zone-marker small-zone-marker"
              style={{ top: item.top, left: item.left }}
            >
              <ParkingCircle size={18} />
              <strong>{item.name}</strong>
              <span>{available} free</span>
              <small>{percentage}% occupied</small>
            </div>
          );
        })}

        <div className="real-campus-counter">
          <h2>{vehiclesInside}</h2>
          <p>Vehicles Inside Campus</p>
        </div>
      </div>
    </div>
  );
}

export default CampusMap;