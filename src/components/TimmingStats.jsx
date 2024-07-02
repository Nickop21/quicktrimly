/* eslint-disable react/prop-types */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#D0E9FF",
  "#B2DFDB",
  "#FFE6A3",
  "#FFCCB3",
];
const formatHour = (hour) => {
  const period = hour >= 12 ? "PM" : "AM";
  const hourIn12 = hour % 12 || 12; // Convert 0 to 12 for 12 AM
  return `${hourIn12} ${period}`;
};
const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

// Define custom bar shape
const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};
export default function TimingStats({ stats }) {
  if (!stats || stats.length === 0) {
    return <div>No data available</div>;
  }

  // Aggregate click data by hour
  const hourCount = stats.reduce((acc, item) => {
    const hour = new Date(item.created_at).getHours();
    if (!acc[hour]) {
      acc[hour] = 0;
    }
    acc[hour]++;
    return acc;
  }, {});

  // Prepare data for the chart
  const result = Object.keys(hourCount).map((hour, index) => ({
    hour: formatHour(parseInt(hour)),
    Clicks: hourCount[hour],
    color: COLORS[index % COLORS.length], // Cycle through COLORS array
  }));


  return (
    <div className="" style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart width={700} height={300} data={result}>
          <XAxis
            dataKey="hour"
          />
  
          {/* <Tooltip labelStyle={{ color: "green" }} /> */}
          <Legend />
          <Bar dataKey="Clicks" shape={<TriangleBar />} label={{ position: 'insideTop' }} >
            {result.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color}  />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
