// All the helper functions should must be there.
// The functions that you're using multiple times must be there.
// e.g. formatDateToMMDDYYYY, formatEpochToMMDDYYYY, etc.
// convert 24h format (e.g. "09:00") → "9 AM"
const formatTime = (time) => {
  if (!time) return "";
  const [hour, minute] = time.split(":");
  const h = parseInt(hour, 10);
  const suffix = h >= 12 ? "PM" : "AM";
  const formattedHour = h % 12 || 12;
  return `${formattedHour}${minute !== "00" ? ":" + minute : ""} ${suffix}`;
};

// convert ["monday", "tuesday", ...] → "Monday to Friday" or "Monday, Tuesday, Wednesday"
const formatDays = (days = []) => {
  if (days.length === 0) return "";
  const capitalized = days.map(
    (d) => d.charAt(0).toUpperCase() + d.slice(1).toLowerCase()
  );
  if (capitalized.length === 1) return capitalized[0];
  if (capitalized.length === 2) return capitalized.join(" and ");
  return `${capitalized[0]} to ${capitalized[capitalized.length - 1]}`;
};

const formatOperatingDays = (days = []) => {
  if (!days.length) return "";

  // Ensure all lowercase and remove duplicates
  const cleanDays = [...new Set(days.map((d) => d.toLowerCase()))];

  // Define full week order
  const weekOrder = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  // Sort days according to week order
  const sortedDays = cleanDays.sort(
    (a, b) => weekOrder.indexOf(a) - weekOrder.indexOf(b)
  );

  // Helper to capitalize first letter
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  // Group consecutive days into ranges
  const ranges = [];
  let start = sortedDays[0];
  let prev = start;

  for (let i = 1; i < sortedDays.length; i++) {
    const current = sortedDays[i];
    if (weekOrder.indexOf(current) === weekOrder.indexOf(prev) + 1) {
      // consecutive day, continue range
      prev = current;
    } else {
      // end previous range
      ranges.push([start, prev]);
      start = current;
      prev = current;
    }
  }
  ranges.push([start, prev]);

  // Format final ranges
  return ranges
    .map(([from, to]) => {
      if (from === to) return cap(from);
      return `${cap(from)} to ${cap(to)}`;
    })
    .join(", ");
};

// src/utils/formatDate.js
function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);

  // Options for date and time
  const options = {
    month: "short", // Jan, Feb, Mar...
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // 24-hour format, set true for 12-hour (AM/PM)
  };

  return date.toLocaleString("en-US", options).replace(",", ",");
}

export { formatDays, formatTime, formatOperatingDays, formatDate };
