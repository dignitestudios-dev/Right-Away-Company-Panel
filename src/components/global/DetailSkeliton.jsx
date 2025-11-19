const OrderDetailSkeleton = () => {
  return (
    <div className="animate-pulse">

      {/* Page Header */}
      <div className="flex justify-between mb-4">
        <div className="h-8 w-60 bg-gray-200 rounded"></div>
        <div className="flex gap-3">
          <div className="h-10 w-32 bg-gray-200 rounded"></div>
          <div className="h-10 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-4">

        {/* LEFT SIDE */}
        <div className="col-span-12 lg:col-span-8 bg-white p-4 rounded-xl shadow">

          {/* Title + Status */}
          <div className="flex justify-between items-center mb-4">
            <div className="h-6 w-40 bg-gray-200 rounded"></div>
            <div className="h-7 w-32 bg-gray-200 rounded-full"></div>
          </div>

          {/* Order Items Skeleton */}
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 mb-4">
              <div className="w-[84px] h-[84px] bg-gray-200 rounded-xl"></div>
              <div className="flex-1">
                <div className="h-4 w-40 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 w-52 bg-gray-200 rounded mb-1"></div>
                <div className="h-3 w-40 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}

          {/* Order Info Lines */}
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="py-4 border-t border-gray-100 flex justify-between"
            >
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
              <div className="h-4 w-40 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="col-span-12 lg:col-span-4 space-y-4">

          {/* Rider Info Box */}
          <div className="bg-white p-4 rounded-xl shadow">
            <div className="h-6 w-48 bg-gray-200 rounded mb-4"></div>

            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                <div className="h-4 w-28 bg-gray-200 rounded"></div>
              </div>
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
            </div>

            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex justify-between py-2 items-center"
              >
                <div className="h-3 w-32 bg-gray-200 rounded"></div>
                <div className="h-3 w-20 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>

          {/* Shipping Activity Skeleton */}
          <div className="bg-white p-4 rounded-xl shadow">
            <div className="h-6 w-40 bg-gray-200 rounded mb-4"></div>

            {Array.from({ length: 4 }).map((_, i) => (
              <div className="flex items-start gap-3 mb-4" key={i}>
                <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-48 bg-gray-200 rounded"></div>
                  <div className="h-3 w-32 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};
export default OrderDetailSkeleton;