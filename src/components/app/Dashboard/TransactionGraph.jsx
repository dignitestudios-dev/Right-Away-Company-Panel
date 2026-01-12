import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { getTransactionGraph } from "../../../redux/slices/AppSlice";

const TransactionGraph = () => {
  const dispatch = useDispatch();
  const { transactionGraph } = useSelector((state) => state.app);

  // Default dates: today
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };
  const today = getTodayDate();

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [viewMode, setViewMode] = useState("received");

  // Fetch transaction data whenever dates change
  useEffect(() => {
    if (!startDate || !endDate) return;

    dispatch(getTransactionGraph({ startDate, endDate }));
  }, [dispatch, startDate, endDate]);

  // Format API data for chart
  const formatTransactionData = (data) => {
    if (!Array.isArray(data)) return [];

    return data.map((item) => {
      const dateObj = new Date(item.date);
      return {
        label: dateObj.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
        }),
        upper: item.totalReceived,
        lower: item.totalSent,
      };
    });
  };

  const chartData = formatTransactionData(transactionGraph);

  // Tooltip for selected mode
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const value =
        viewMode === "received"
          ? payload.find((p) => p.dataKey === "upper")?.value || 0
          : payload.find((p) => p.dataKey === "lower")?.value || 0;

      return (
        <div className="bg-emerald-500 text-white px-3 py-2 rounded-lg text-sm shadow-md">
          $ {value.toLocaleString()}
        </div>
      );
    }
    return null;
  };

  // Custom dot for Area chart
  const CustomDot = ({ cx, cy }) => (
    <circle
      cx={cx}
      cy={cy}
      r={5}
      fill="#10b981"
      stroke="#fff"
      strokeWidth={2}
    />
  );

  return (
    <div className="relative h-[400px] bg-white rounded-2xl shadow-sm p-5">
      {/* Header */}
      <div className="flex flex-wrap border-b border-[#2121211C] justify-between items-start pb-4 mb-3">
        <h1 className="text-[17px] font-[600] text-[#212121] mb-2">
          Total Number of Transactions
        </h1>

        {/* Date Range Pickers */}
        <div className="flex gap-4">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border px-2 rounded-[7px] accent-[#22B573] focus:outline-none border-[#D9D9D9] h-[33px] w-[140px] text-[#838383]"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border px-2 rounded-[7px] accent-[#22B573] focus:outline-none border-[#D9D9D9] h-[33px] w-[140px] text-[#838383]"
          />
        </div>
      </div>

      {/* Toggle Buttons */}
      <div className="flex gap-4 mb-3">
        <button
          onClick={() => setViewMode("received")}
          className={`flex items-center gap-1 py-2 rounded-lg transition-colors ${
            viewMode === "received" ? "text-gray-900" : "text-gray-400"
          }`}
        >
          <div
            className={`w-4 h-4 rounded border-2 flex items-center justify-center`}
          >
            {viewMode === "received" && (
              <div className="w-2 h-2 bg-emerald-500 rounded-sm" />
            )}
          </div>
          <span className="text-[11px] font-[400]">Received</span>
        </button>

        <button
          onClick={() => setViewMode("withdrawn")}
          className={`flex items-center gap-1 py-2 rounded-lg transition-colors ${
            viewMode === "withdrawn" ? "text-gray-900" : "text-gray-400"
          }`}
        >
          <div
            className={`w-4 h-4 rounded border-2 flex items-center justify-center`}
          >
            {viewMode === "withdrawn" && (
              <div className="w-2 h-2 bg-emerald-500 rounded-sm" />
            )}
          </div>
          <span className="text-[11px] font-[400]">Withdrawn</span>
        </button>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="w-full h-[250px] lg:h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ top: 40, right: 15, left: -25, bottom: 20 }}
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
                dataKey="label"
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
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: "#10b981",
                  strokeWidth: 2,
                  strokeDasharray: "5 5",
                }}
              />

              {/* Conditionally render based on toggle */}
              {viewMode === "received" && (
                <Area
                  type="monotone"
                  dataKey="upper"
                  stroke="#10b981"
                  strokeWidth={3}
                  fill="url(#areaGradient)"
                  dot={<CustomDot />}
                />
              )}
              {viewMode === "withdrawn" && (
                <Line
                  type="monotone"
                  dataKey="lower"
                  stroke="#059669"
                  strokeWidth={3}
                  dot={false}
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TransactionGraph;
