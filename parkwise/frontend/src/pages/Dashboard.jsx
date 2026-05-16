import { useEffect, useState } from "react";
import { Car, LogIn, LogOut, ParkingCircle, Activity } from "lucide-react";
import API from "../services/api";

function Dashboard() {
  const [zones, setZones] = useState([]);
  const [logs, setLogs] = useState([]);
  const [calculation, setCalculation] = useState("Waiting for simulation...");

  const fetchZones = async () => {
    const res = await API.get("/parking");
    setZones(res.data);
  };

  useEffect(() => {
    fetchZones();
  }, []);

  const handleEntry = async (zoneId, zoneName) => {
    try {
      const res = await API.put(`/parking/${zoneId}/entry`);
      setCalculation(`Entry Calculation: ${res.data.formula}`);
      setLogs((prev) => [
        `Vehicle entered ${zoneName}`,
        ...prev.slice(0, 7),
      ]);
      fetchZones();
    } catch (error) {
      alert(error.response?.data?.message || "Entry failed");
    }
  };

  const handleExit = async (zoneId, zoneName) => {
    try {
      const res = await API.put(`/parking/${zoneId}/exit`);
      setCalculation(`Exit Calculation: ${res.data.formula}`);
      setLogs((prev) => [
        `Vehicle exited ${zoneName}`,
        ...prev.slice(0, 7),
      ]);
      fetchZones();
    } catch (error) {
      alert(error.response?.data?.message || "Exit failed");
    }
  };

  const totalSlots = zones.reduce((sum, zone) => sum + zone.totalSlots, 0);
  const occupiedSlots = zones.reduce((sum, zone) => sum + zone.occupiedSlots, 0);
  const totalEntries = zones.reduce((sum, zone) => sum + zone.entryCount, 0);
  const totalExits = zones.reduce((sum, zone) => sum + zone.exitCount, 0);
  const availableSlots = totalSlots - occupiedSlots;

  return (
    <div className="dashboard">
      <div className="hero">
        <h1>ParkWise</h1>
        <p>Smart Campus Parking Simulation System</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <ParkingCircle />
          <h3>Total Slots</h3>
          <h2>{totalSlots}</h2>
        </div>

        <div className="stat-card">
          <Car />
          <h3>Vehicles Parked</h3>
          <h2>{occupiedSlots}</h2>
        </div>

        <div className="stat-card green">
          <LogIn />
          <h3>Total Entries</h3>
          <h2>{totalEntries}</h2>
        </div>

        <div className="stat-card red">
          <LogOut />
          <h3>Total Exits</h3>
          <h2>{totalExits}</h2>
        </div>
      </div>

      <div className="formula-box">
        <Activity />
        <div>
          <h3>Live Calculation</h3>
          <p>{calculation}</p>
          <small>
            Vehicles inside campus = Total Entries - Total Exits ={" "}
            {totalEntries} - {totalExits} = {totalEntries - totalExits}
          </small>
        </div>
      </div>

      <h2 className="section-title">Parking Zones</h2>

      <div className="zones-grid">
        {zones.map((zone) => {
          const available = zone.totalSlots - zone.occupiedSlots;
          const percentage = Math.round(
            (zone.occupiedSlots / zone.totalSlots) * 100
          );

          return (
            <div className="zone-card" key={zone._id}>
              <div className="zone-header">
                <h2>{zone.zoneName}</h2>
                <span className={available > 0 ? "badge open" : "badge full"}>
                  {available > 0 ? "Available" : "Full"}
                </span>
              </div>

              <p>{zone.location}</p>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>

              <div className="zone-details">
                <p>Total: {zone.totalSlots}</p>
                <p>Occupied: {zone.occupiedSlots}</p>
                <p>Available: {available}</p>
                <p>Entries: {zone.entryCount}</p>
                <p>Exits: {zone.exitCount}</p>
              </div>

              <div className="buttons">
                <button onClick={() => handleEntry(zone._id, zone.zoneName)}>
                  Vehicle Entry
                </button>

                <button
                  className="exit"
                  onClick={() => handleExit(zone._id, zone.zoneName)}
                >
                  Vehicle Exit
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="logs">
        <h2>Live Simulation Logs</h2>
        {logs.length === 0 ? (
          <p>No vehicle movement yet.</p>
        ) : (
          logs.map((log, index) => <p key={index}>• {log}</p>)
        )}
      </div>
    </div>
  );
}

export default Dashboard;