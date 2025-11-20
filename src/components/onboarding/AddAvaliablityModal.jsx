import React, { useEffect, useState } from "react";

export default function AddAvailabilityModal({ onClose, onSave, edit, data }) {
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("18:00");
  const [error, setError] = useState("");

  const [workingDays, setWorkingDays] = useState({
    all: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  // ✅ when editing existing data
  useEffect(() => {
    if (data?.availability) {
      setStartTime(data.availability.start_time || "09:00");
      setEndTime(data.availability.end_time || "18:00");

      const newDays = days.reduce((acc, day) => {
        acc[day] = data.availability.days?.includes(day) || false;
        return acc;
      }, {});

      // if all days are present in data, mark "all" true
      const allSelected =
        days.every((d) => (data.availability.days || []).includes(d)) || false;

      setWorkingDays({ all: allSelected, ...newDays });
    }
  }, [data]); // dependency added to run when `data` changes

  const toggleDay = (day) => {
    if (day === "all") {
      const allChecked = !workingDays.all;
      const updated = Object.keys(workingDays).reduce((acc, d) => {
        acc[d] = allChecked;
        return acc;
      }, {});
      setWorkingDays(updated);
    } else {
      setWorkingDays((prev) => ({ ...prev, [day]: !prev[day], all: false }));
    }
  };

  const validateTimes = (start, end) => {
    const today = new Date().toDateString();
    const startDate = new Date(`${today} ${start}`);
    const endDate = new Date(`${today} ${end}`);

    if (endDate <= startDate) {
      setError("End time must be after start time.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSave = () => {
    if (!validateTimes(startTime, endTime)) return;

    // If "all" is true, use all days
    const selectedDays = workingDays.all
      ? [...days]
      : days.filter((day) => workingDays[day]);

    if (!selectedDays || selectedDays.length === 0) {
      setError("Please select at least one working day.");
      return;
    }

    // Clear any previous error and call onSave
    setError("");
    onSave({
      start_time: startTime,
      end_time: endTime,
      days: selectedDays,
    });
  };

  // convenience: is Save allowed?
  const canSave = () => {
    const selectedDays = workingDays.all
      ? [...days]
      : days.filter((day) => workingDays[day]);
    // must have at least one day and valid times
    const timesValid = (() => {
      const today = new Date().toDateString();
      const s = new Date(`${today} ${startTime}`);
      const e = new Date(`${today} ${endTime}`);
      return e > s;
    })();
    return selectedDays.length > 0 && timesValid;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
        {/* Close */}
        <button
          className="absolute top-4 right-4 text-2xl font-bold"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-6">
          {edit ? "Edit Availability" : "Add Availability"}
        </h2>

        {/* Time inputs */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Opening Time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full border border-[#BEBEBE] rounded-lg p-2 text-sm focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Closing Time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full border border-[#BEBEBE] rounded-lg p-2 text-sm focus:outline-none"
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Working Days */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Select Working Days</h3>

          {/* All Days */}
          <div className="flex items-center justify-between mb-5">
            <span className="text-gray-700 font-medium">All Days</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={workingDays.all}
                onChange={() => toggleDay("all")}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-[#22B573] transition-all duration-300"></div>
              <div className="absolute left-[2px] top-[2px] bg-white w-5 h-5 rounded-full peer-checked:translate-x-full transition-all duration-300"></div>
            </label>
          </div>

          {/* Individual Days */}
          {days.map((day) => (
            <div
              key={day}
              className="flex items-center justify-between mb-5 capitalize"
            >
              <span className="text-gray-700 font-medium">{day}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={workingDays[day]}
                  onChange={() => toggleDay(day)}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#22B573] transition-all duration-300"></div>
                <div className="absolute left-[2px] top-[2px] bg-white w-5 h-5 rounded-full peer-checked:translate-x-full transition-all duration-300"></div>
              </label>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className={`w-full py-2 rounded-xl text-white font-semibold ${
            canSave() ? "bg-gradient" : "bg-gray-300 cursor-not-allowed"
          }`}
          disabled={!canSave()}
        >
          Save
        </button>
      </div>
    </div>
  );
}
