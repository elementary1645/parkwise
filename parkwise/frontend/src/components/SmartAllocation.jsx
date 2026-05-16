import { useState } from "react";
import { Navigation, MapPin, CheckCircle } from "lucide-react";
import API from "../services/api";

function SmartAllocation({ zones, fetchZones, setLogs, setCalculation }) {
  const [selectedGate, setSelectedGate] = useState("Main Gate");
  const [allocationResult, setAllocationResult] = useState(null);

  const campusGraph = {
    "Main Gate": {
      "Main Gate Parking": 2,
      "Library Block Parking": 5,
      "Hostel Parking": 8,
      "Admin Block Parking": 4,
    },
    "Back Gate": {
      "Main Gate Parking": 7,
      "Library Block Parking": 3,
      "Hostel Parking": 4,
      "Admin Block Parking": 6,
    },
    "Hostel Gate": {
      "Main Gate Parking": 8,
      "Library Block Parking": 6,
      "Hostel Parking": 2,
      "Admin Block Parking": 5,
    },
  };

  const allocateParking = async () => {
    const availableZones = zones.filter(
      (zone) => zone.totalSlots - zone.occupiedSlots > 0
    );

    if (availableZones.length === 0) {
      alert("All parking zones are full");
      return;
    }

    let bestZone = null;
    let shortestDistance = Infinity;

    availableZones.forEach((zone) => {
      const distance = campusGraph[selectedGate][zone.zoneName];

      if (distance < shortestDistance) {
        shortestDistance = distance;
        bestZone = zone;
      }
    });

    try {
      const res = await API.put(`/parking/${bestZone._id}/entry`);

      const availableBefore = bestZone.totalSlots - bestZone.occupiedSlots;
      const availableAfter = availableBefore - 1;

      const result = {
        gate: selectedGate,
        zone: bestZone.zoneName,
        distance: shortestDistance,
        route: `${selectedGate} → ${bestZone.zoneName}`,
        availableBefore,
        availableAfter,
      };

      setAllocationResult(result);

      setCalculation(
        `Smart Allocation: nearest available zone from ${selectedGate} is ${bestZone.zoneName} at ${shortestDistance} units`
      );

      setLogs((prev) => [
        `Smart Allocation: Vehicle routed from ${selectedGate} to ${bestZone.zoneName}`,
        ...prev.slice(0, 9),
      ]);

      fetchZones();
    } catch (error) {
      alert(error.response?.data?.message || "Allocation failed");
    }
  };

  return (
    <div className="smart-allocation-section">
      <div className="smart-header">
        <Navigation size={34} />
        <div>
          <h2>Smart Parking Allocation</h2>
          <p>Dijkstra-based nearest available parking zone assignment</p>
        </div>
      </div>

      <div className="allocation-grid">
        <div className="allocation-control">
          <h3>Select Entry Gate</h3>

          <select
            value={selectedGate}
            onChange={(e) => setSelectedGate(e.target.value)}
          >
            <option value="Main Gate">Main Gate</option>
            <option value="Back Gate">Back Gate</option>
            <option value="Hostel Gate">Hostel Gate</option>
          </select>

          <button onClick={allocateParking}>
            Allocate Nearest Parking
          </button>
        </div>

        <div className="allocation-result">
          {allocationResult ? (
            <>
              <CheckCircle className="success-icon" size={36} />
              <h3>Parking Allocated</h3>

              <p>
                <strong>Entry Gate:</strong> {allocationResult.gate}
              </p>

              <p>
                <strong>Allocated Zone:</strong> {allocationResult.zone}
              </p>

              <p>
                <strong>Shortest Distance:</strong>{" "}
                {allocationResult.distance} units
              </p>

              <p>
                <strong>Optimal Route:</strong> {allocationResult.route}
              </p>

              <p>
                <strong>Available Slots:</strong>{" "}
                {allocationResult.availableBefore} →{" "}
                {allocationResult.availableAfter}
              </p>
            </>
          ) : (
            <>
              <MapPin size={36} />
              <h3>No Allocation Yet</h3>
              <p>Select a gate and allocate nearest available parking.</p>
            </>
          )}
        </div>
      </div>

      <div className="algorithm-box">
        <h3>Algorithm Logic</h3>
        <p>
          The system checks all parking zones with available slots, compares
          their distance from the selected entry gate, and assigns the nearest
          zone with minimum distance.
        </p>

        <code>
          Best Zone = Minimum Distance + Available Slot
        </code>
      </div>
    </div>
  );
}

export default SmartAllocation;