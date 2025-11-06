export default function GlobalTable({ columns = [], data = [], onRowClick, loading }) {
  const renderSkeleton = () => {
    // Show 5 fake rows while loading
    return Array.from({ length: 5 }).map((_, rowIndex) => (
      <tr key={rowIndex} className="border-t border-gray-100">
        {columns.map((_, colIndex) => (
          <td key={colIndex} className="px-6 py-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
          </td>
        ))}
      </tr>
    ));
  };

  const renderNoRecord = () => (
    <tr>
      <td
        colSpan={columns.length}
        className="text-center py-6 text-gray-500 text-sm"
      >
        No Record Found
      </td>
    </tr>
  );

  const renderRows = () =>
    data.map((row, i) => (
      <tr
        key={i}
        onClick={() => onRowClick && onRowClick(row?._id)}
        className="border-t cursor-pointer border-gray-100 hover:bg-gray-50 transition"
      >
        {row?.cells?.map((cell, j) => (
          <td key={j} className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
            {cell}
          </td>
        ))}
      </tr>
    ));

  return (
    <div className="overflow-x-auto">
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
          {loading
            ? renderSkeleton()
            : data?.length > 0
            ? renderRows()
            : renderNoRecord()}
        </tbody>
      </table>
    </div>
  );
}
