import React from "react";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      title: "Title goes here",
      description:
        "Lorem ipsum dolor sit amet consectetur. In volutpat et mattis ut tristique viverra blandit.",
      time: "7:30 PM",
      badge: true,
    },
    {
      id: 2,
      title: "Title goes here",
      description:
        "Lorem ipsum dolor sit amet consectetur. In volutpat et mattis ut tristique viverra blandit.",
      time: "7:30 PM",
      badge: true,
    },
    {
      id: 3,
      title: "Title goes here",
      description:
        "Lorem ipsum dolor sit amet consectetur. In volutpat et mattis ut tristique viverra blandit.",
      time: "7:30 PM",
      badge: false,
    },
    {
      id: 4,
      title: "Title goes here",
      description:
        "Lorem ipsum dolor sit amet consectetur. In volutpat et mattis ut tristique viverra blandit.",
      time: "7:30 PM",
      badge: false,
    },
    {
      id: 5,
      title: "Title goes here",
      description:
        "Lorem ipsum dolor sit amet consectetur. In volutpat et mattis ut tristique viverra blandit.",
      time: "7:30 PM",
      badge: false,
    },
  ];

  return (
    <div className="w-[500px] top-[100px] h-[493px] overflow-auto absolute left-64 z-10 mx-auto bg-white rounded-2xl shadow-sm p-5">
      <h1 className="text-[16px] font-[600] text-gray-900 mb-5">
        Notifications
      </h1>

      <div className="space-y-0">
        {notifications.map((notification, index) => (
          <div key={notification.id}>
            <div className="py-1 flex items-start justify-between">
              <div className="mb-2 items-start w-[80%] ">
                <h2 className="text-[13px] font-[700] text-gray-900">
                  {notification.title}
                </h2>
                <p className="text-[#18181880] text-[13px] font-[400] leading-relaxed">
                  {notification.description}
                </p>
              </div>
              <div className="">
                <span className="text-[#18181880] text-[12px] font-[500]">
                  {notification.time}
                </span>
                {notification.badge && (
                  <div className="w-[19px] ml-auto mt-2 h-[19px] rounded-full bg-teal-500 flex items-center justify-center">
                    <span className="text-white text-[14px]  font-[500]">
                      1
                    </span>
                  </div>
                )}
              </div>
            </div>
            {index < notifications.length - 1 && (
              <div className="border-b border-gray-200"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
