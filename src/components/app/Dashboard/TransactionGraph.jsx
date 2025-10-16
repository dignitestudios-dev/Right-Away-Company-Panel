import { useState } from "react";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from "recharts";

const TransactionGraph = () => {
  const [viewMode, setViewMode] = useState("monthly");
  const areaChartData = [
    { month: "Jan", lower: 20000, upper: 25000 },
    { month: "Feb", lower: 19000, upper: 29000 },
    { month: "Mar", lower: 22000, upper: 25000 },
    { month: "Apr", lower: 21000, upper: 37000 },
    { month: "May", lower: 16000, upper: 17000 },
    { month: "Jun", lower: 17000, upper: 29000 },
    { month: "Jul", lower: 20000, upper: 25000 },
    { month: "Aug", lower: 23000, upper: 42000 },
    { month: "Sep", lower: 25000, upper: 40567.88 },
    { month: "Oct", lower: 24000, upper: 28000 },
    { month: "Nov", lower: 22000, upper: 35000 },
    { month: "Dec", lower: 21000, upper: 30000 },
  ];

  const [hoveredAreaMonth, setHoveredAreaMonth] = useState("Sep");

  const CustomAreaDot = (props) => {
    const { cx, cy, payload } = props;
    if (payload.month === hoveredAreaMonth) {
      return (
        <g>
          <circle
            cx={cx}
            cy={cy - 30}
            r={6}
            fill="#10b981"
            stroke="#fff"
            strokeWidth={2}
          />
        </g>
      );
    }
    return null;
  };

  const CustomAreaTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const upperValue = payload.find((p) => p.dataKey === "upper")?.value;
      setHoveredAreaMonth(payload[0].payload.month);
      return (
        <div className="bg-emerald-500 text-white px-3 py-2 rounded-lg font-semibold shadow-lg text-sm">
          $
          {(upperValue || 0).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      );
    }
    return null;
  };

  const handleAreaMouseLeave = () => {
    setHoveredAreaMonth("Sep");
  };
  return (
    <div className="relative h-[400px] bg-white rounded-2xl shadow-sm p-5">
      {/* Header */}
      <div className="flex flex-wrap border-b border-[#2121211C] justify-between items-start pb-4 mb-3">
        <div>
          <h1 className="text-[17px] font-[600] text-[#212121] mb-2">
            Total Number Of Transactions
          </h1>
        </div>

        {/* Date Range Selectors */}
        <div className="flex gap-4">
          <input
            type="date"
            className="border px-2 rounded-[7px] accent-[#22B573] focus:outline-none border-[#D9D9D9] h-[33px] w-[140px] text-[#838383] "
          />
          <input
            type="date"
            className="border px-2 rounded-[7px] accent-[#22B573] focus:outline-none border-[#D9D9D9] h-[33px] w-[140px] text-[#838383] "
          />
        </div>
      </div>

      {/* Toggle Buttons */}
      <div className="flex ">
        <button
          onClick={() => setViewMode("received")}
          className={`flex items-center gap-1  py-2 rounded-lg transition-colors ${
            viewMode === "received" ? "text-gray-900" : "text-gray-400"
          }`}
        >
          <div
            className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
              viewMode === "received" ? "border-gray-300" : "border-gray-300"
            }`}
          >
            {viewMode === "received" && (
              <div className="w-2 h-2 bg-emerald-500 rounded-sm"></div>
            )}
          </div>
          <span className="text-[11px] font-[400]">Received</span>
        </button>

        <button
          onClick={() => setViewMode("withdrawn")}
          className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
            viewMode === "withdrawn" ? "text-gray-900" : "text-gray-400"
          }`}
        >
          <div
            className={`w-4 h-4 rounded border-2  flex items-center justify-center ${
              viewMode == "withdrawn" ? "border-gray-300" : "border-gray-300"
            }`}
          >
            {viewMode === "withdrawn" && (
              <div className="w-2 h-2 bg-emerald-500 rounded-sm"></div>
            )}
          </div>
          <span className="text-[11px] font-[400]">Withdrawn</span>
        </button>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl shadow-sm ">
        <div className="w-full h-[250px]  lg:h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={areaChartData}
              margin={{ top: 40, right: 15, left: -25, bottom: 20 }}
              onMouseLeave={handleAreaMouseLeave}
            >
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#86efac" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#86efac" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="0"
                stroke="#e5e7eb"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 13 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 13 }}
                tickFormatter={(value) => `${value / 1000}K`}
                ticks={[10000, 20000, 30000, 40000, 50000]}
                domain={[10000, 50000]}
              />
              <Tooltip
                content={<CustomAreaTooltip />}
                cursor={{
                  stroke: "#10b981",
                  strokeWidth: 2,
                  strokeDasharray: "5 5",
                }}
              />

              <Area
                type="monotone"
                dataKey="upper"
                stroke="#10b981"
                strokeWidth={3}
                fill="url(#areaGradient)"
                fillOpacity={1}
                dot={<CustomAreaDot />}
                activeDot={false}
              />
              <Line
                type="monotone"
                dataKey="lower"
                stroke="#059669"
                strokeWidth={3}
                dot={false}
                activeDot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TransactionGraph;
