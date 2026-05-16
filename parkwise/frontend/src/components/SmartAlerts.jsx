import { AlertTriangle, CheckCircle, ShieldAlert } from "lucide-react";

function SmartAlerts({ zones }) {
  const totalSlots = zones.reduce((sum, zone) => sum + zone.totalSlots, 0);
  const occupiedSlots = zones.reduce((sum, zone) => sum + zone.occupiedSlots, 0);
  const totalEntries = zones.reduce((sum, zone) => sum + zone.entryCount, 0);
  const totalExits = zones.reduce((sum, zone) => sum + zone.exitCount, 0);

  const campusOccupancy =
    totalSlots > 0 ? Math.round((occupiedSlots / totalSlots) * 100) : 0;

  const alerts = [];

  zones.forEach((zone) => {
    const available = zone.totalSlots - zone.occupiedSlots;
    const occupancy = Math.round((zone.occupiedSlots / zone.totalSlots) * 100);

    if (available === 0) {
      alerts.push({
        type: "critical",
        title: `${zone.zoneName} is Full`,
        message: "Divert vehicles to another available parking zone.",
      });
    } else if (occupancy >= 85) {
      alerts.push({
        type: "warning",
        title: `${zone.zoneName} Almost Full`,
        message: `Occupancy is at ${occupancy}%. Only ${available} slots left.`,
      });
    }
  });

  if (campusOccupancy >= 80) {
    alerts.push({
      type: "warning",
      title: "Campus Parking Load is High",
      message: `Overall campus occupancy is ${campusOccupancy}%.`,
    });
  }

  if (totalEntries - totalExits > totalSlots * 0.75) {
    alerts.push({
      type: "critical",
      title: "High Vehicle Inflow Detected",
      message: "Security team should monitor entry gates closely.",
    });
  }

  return (
    <div className="smart-alerts-section">
      <div className="alerts-header">
        <ShieldAlert size={34} />
        <div>
          <h2>Smart Alerts Panel</h2>
          <p>Real-time warning system for campus parking management</p>
        </div>
      </div>

      {alerts.length === 0 ? (
        <div className="alert-card safe-alert">
          <CheckCircle size={30} />
          <div>
            <h3>All Systems Normal</h3>
            <p>No congestion or parking risk detected currently.</p>
          </div>
        </div>
      ) : (
        <div className="alerts-grid">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className={
                alert.type === "critical"
                  ? "alert-card critical-alert"
                  : "alert-card warning-alert"
              }
            >
              <AlertTriangle size={30} />
              <div>
                <h3>{alert.title}</h3>
                <p>{alert.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SmartAlerts;