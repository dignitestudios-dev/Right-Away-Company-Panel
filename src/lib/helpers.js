// All the helper functions should must be there.
// The functions that you're using multiple times must be there.
// e.g. formatDateToMMDDYYYY, formatEpochToMMDDYYYY, etc.
// convert 24h format (e.g. "09:00") → "9 AM"
const formatTime = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
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
  if (!days?.length) return "";

  // Ensure all lowercase and remove duplicates
  const cleanDays = [...new Set(days?.map((d) => d.toLowerCase()))];

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

  return date.toLocaleDateString("en-US", {
    month: "short", // Jan, Feb, Mar
    day: "numeric", // 15
    year: "numeric", // 2025
  });
}

export const EpocformatDate = (epoch) => {
  if (!epoch) return "";

  let time = Number(epoch);

  // 🔥 If value looks like seconds, convert to milliseconds
  if (time < 1000000000000) {
    time = time * 1000;
  }

  return new Date(time).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export { formatDays, formatTime, formatOperatingDays, formatDate };
