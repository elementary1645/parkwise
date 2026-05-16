import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

function AnalyticsCharts({ zones }) {
  const occupancyData = zones.map((zone) => ({
    name: zone.zoneName.replace(" Parking", ""),
    occupied: zone.occupiedSlots,
    available: zone.totalSlots - zone.occupiedSlots,
  }));

  const movementData = zones.map((zone) => ({
    name: zone.zoneName.replace(" Parking", ""),
    entries: zone.entryCount,
    exits: zone.exitCount,
  }));

  const totalOccupied = zones.reduce((sum, zone) => sum + zone.occupiedSlots, 0);
  const totalAvailable = zones.reduce(
    (sum, zone) => sum + (zone.totalSlots - zone.occupiedSlots),
    0
  );

  const pieData = [
    { name: "Occupied", value: totalOccupied },
    { name: "Available", value: totalAvailable },
  ];

  return (
    <div className="analytics-section">
      <h2>Real-Time Parking Analytics</h2>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Zone Occupancy</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={occupancyData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="occupied" stackId="a" fill="#3b82f6" />
              <Bar dataKey="available" stackId="a" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Entry vs Exit Count</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={movementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="entries" stroke="#38bdf8" />
              <Line type="monotone" dataKey="exits" stroke="#f97316" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Campus Occupancy Split</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >
                <Cell fill="#ef4444" />
                <Cell fill="#22c55e" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsCharts;