import React from "react";

export default function GlobalTable({ columns = [], data = [] }) {
  return (
    <div className="overflow-x-auto rounded-2xl shadow-sm border-t p-3 border-[#B9B9B9] bg-[#FFFFFF]">
      <table className="w-full text-left border-collapse">
        <thead className="bg-[#D2EFE34D] rounded-[12px]">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="px-6 py-4 text-[14px] font-[500] text-[#202224] whitespace-nowrap"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className="border-t border-gray-100 hover:bg-gray-50 transition"
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
