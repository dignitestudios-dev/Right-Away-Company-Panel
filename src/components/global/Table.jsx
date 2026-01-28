export default function GlobalTable({
  columns = [],
  data = [],
  onRowClick,
  loading,
}) {
  const renderSkeleton = () =>
    Array.from({ length: 5 }).map((_, rowIndex) => (
      <tr key={rowIndex} className="border-t border-gray-100">
        {columns.map((_, colIndex) => (
          <td key={colIndex} className="px-4 py-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
          </td>
        ))}
      </tr>
    ));

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
        className="border-t border-gray-100 hover:bg-gray-50 transition cursor-pointer"
      >
        {row?.cells?.map((cell, j) => (
          <td
            key={j}
            className="px-4 py-3 text-sm text-gray-700 
                       whitespace-normal break-words"
          >
            {cell}
          </td>
        ))}
      </tr>
    ));

  return (
    <div className="relative w-full overflow-x-auto">
      {/* vertical scroll */}
      <div className="max-h-[500px]  overflow-y-auto">
        <table className="border-collapse w-full min-w-[900px]">
          <thead className="bg-[#d2efe3e4]   top-0 z-10">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-[14px] font-medium text-[#202224]
                             whitespace-nowrap text-left"
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
    </div>
  );
}
