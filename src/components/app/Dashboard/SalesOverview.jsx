import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getSalesGraph } from "../../../redux/slices/AppSlice";

const SalesOverview = () => {
  const [viewMode, setViewMode] = useState("monthly");
  const { salesGraph } = useSelector((state) => state.app);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    if (!startDate || !endDate) return;

    dispatch(
      getSalesGraph({
        type: viewMode === "weekly" ? "week" : "year",
        startDate,
        endDate,
      })
    );
  }, [dispatch, viewMode, startDate, endDate]);

  const formatGraphData = (data, type = "week") => {
    if (!Array.isArray(data)) return [];

    return data.map((item) => {
      const dateObj = new Date(item.date);

      return {
        label:
          type === "week"
            ? dateObj.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
              })
            : dateObj.toLocaleDateString("en-US", {
                month: "short",
              }),
        value: Math.round(item.totalRevenue),
      };
    });
  };
  const graphData = formatGraphData(
    salesGraph,
    viewMode === "weekly" ? "week" : "month"
  );
  console.log(graphData);
  const [hoveredMonth, setHoveredMonth] = useState("AUG");

  const CustomDot = ({ cx, cy, payload }) => {
    if (payload?.label === hoveredMonth) {
      return (
        <circle
          cx={cx}
          cy={cy}
          r={8}
          fill="#10b981"
          stroke="#fff"
          strokeWidth={3}
        />
      );
    }
    return null;
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-emerald-500 text-white px-4 py-2 rounded-lg font-semibold shadow-lg">
          {(payload[0].value / 1000).toFixed(1)}K
        </div>
      );
    }
    return null;
  };

  const handleMouseLeave = () => {
    setHoveredMonth("AUG");
  };

  return (
    <div className="col-span-12 lg:col-span-8 relative h-[400px] bg-white rounded-2xl shadow-sm p-5">
      {/* Header */}
      <div className="flex flex-wrap border-b border-[#2121211C] justify-between items-start pb-4 mb-3">
        <div>
          <h1 className="text-[17px] font-[600] text-[#212121] lg:mb-2">
            Sales Overview
          </h1>
          <p className="text-gray-400 text-[12px] font-[400]">
            Sales & Revenue Trends
          </p>
        </div>

        {/* Date Range Selectors */}
        <div className="flex gap-4 mt-2 lg:mt-0">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border px-2 rounded-[7px] accent-[#22B573] focus:outline-none border-[#D9D9D9] h-[33px] w-[140px] text-[#838383] "
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border px-2 rounded-[7px] accent-[#22B573] focus:outline-none border-[#D9D9D9] h-[33px] w-[140px] text-[#838383] "
          />
        </div>
      </div>

      {/* Toggle Buttons */}
      <div className="flex ">
        <button
          onClick={() => setViewMode("weekly")}
          className={`flex items-center gap-1  py-2 rounded-lg transition-colors ${
            viewMode === "weekly" ? "text-gray-900" : "text-gray-400"
          }`}
        >
          <div
            className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
              viewMode === "weekly" ? "border-gray-300" : "border-gray-300"
            }`}
          >
            {viewMode === "weekly" && (
              <div className="w-2 h-2 bg-emerald-500 rounded-sm"></div>
            )}
          </div>
          <span className="text-[11px] font-[400]">Weekly</span>
        </button>

        <button
          onClick={() => setViewMode("monthly")}
          className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
            viewMode === "monthly" ? "text-gray-900" : "text-gray-400"
          }`}
        >
          <div
            className={`w-4 h-4 rounded border-2  flex items-center justify-center ${
              viewMode == "monthly" ? "border-gray-300" : "border-gray-300"
            }`}
          >
            {viewMode === "monthly" && (
              <div className="w-2 h-2 bg-emerald-500 rounded-sm"></div>
            )}
          </div>
          <span className="text-[11px] font-[400]">Monthly</span>
        </button>
      </div>

      {/* Chart */}
      <div className="w-full  h-[200px] lg:h-[250px] mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={graphData}
            margin={{ top: 20, right: 0, left: -22, bottom: 20 }}
            onMouseLeave={handleMouseLeave}
          >
            <CartesianGrid
              strokeDasharray="-1"
              stroke="#f0f0f0"
              vertical={true}
            />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 14 }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 14 }}
              tickFormatter={(value) =>
                value === 0 ? "0" : `${value / 1000}K`
              }
              ticks={[0, 20000, 60000, 100000]}
              domain={[0, 100000]}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#10b981"
              strokeWidth={4}
              dot={<CustomDot />}
              activeDot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesOverview;
