import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";

function AnalyticsCharts({ zones }) {
  const occupancyData = zones.map((zone) => ({
    name: zone.zoneName
      .replace(" Parking", "")
      .replace(" Block", "")
      .replace("Main Gate", "Main")
      .replace("Library", "Library")
      .replace("Hostel", "Hostel")
      .replace("Admin", "Admin"),

    occupied: zone.occupiedSlots,
    available: zone.totalSlots - zone.occupiedSlots,
  }));

  const entryExitData = zones.map((zone) => ({
    name: zone.zoneName
      .replace(" Parking", "")
      .replace(" Block", "")
      .replace("Main Gate", "Main")
      .replace("Library", "Library")
      .replace("Hostel", "Hostel")
      .replace("Admin", "Admin"),

    entries: zone.entryCount,
    exits: zone.exitCount,
  }));

  const pieData = zones.map((zone) => ({
    name: zone.zoneName
      .replace(" Parking", "")
      .replace(" Block", ""),

    value: zone.occupiedSlots,
  }));

  const COLORS = ["#3b82f6", "#22c55e", "#eab308", "#ef4444"];

  return (
    <div className="analytics-section">
      <h2>Parking Analytics Dashboard</h2>

      <div className="charts-grid">
        {/* BAR CHART */}

        <div className="chart-card">
          <h3>Zone Occupancy</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={occupancyData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="name"
                interval={0}
                angle={-25}
                textAnchor="end"
                height={70}
              />

              <YAxis />

              <Tooltip />

              <Bar dataKey="occupied" fill="#3b82f6" />

              <Bar dataKey="available" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* LINE CHART */}

        <div className="chart-card">
          <h3>Entry vs Exit Count</h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={entryExitData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="name"
                interval={0}
                angle={-25}
                textAnchor="end"
                height={70}
              />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="entries"
                stroke="#38bdf8"
                strokeWidth={3}
              />

              <Line
                type="monotone"
                dataKey="exits"
                stroke="#fb923c"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}

        <div className="chart-card">
          <h3>Parking Distribution</h3>

          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsCharts;