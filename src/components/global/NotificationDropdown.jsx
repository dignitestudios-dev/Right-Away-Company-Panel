import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAllNotifications,
  deleteNotification,
  getNotifications,
  readAllNotifications,
  readNotification,
} from "../../redux/slices/AppSlice";

const Notifications = () => {
  const dispatch = useDispatch("");
  const { notifications, notificationsLoading } = useSelector(
    (state) => state.app,
  );

  const handleGetNotifications = async () => {
    await dispatch(getNotifications());
  };

  const handleRead = (id) => {
    dispatch(readNotification(id));
  };

  const handleReadAll = () => {
    dispatch(readAllNotifications());
  };

  const handleDelete = (id) => {
    dispatch(deleteNotification(id));
  };

  const handleDeleteAll = () => {
    dispatch(deleteAllNotifications());
  };

  useEffect(() => {
    handleGetNotifications();
  }, [dispatch]);
  console.log(notifications, "get Notifications--->");
  return (
    <div className="w-[500px] top-[100px] h-[493px] overflow-auto absolute left-64 z-10 mx-auto bg-white rounded-2xl shadow-sm p-5">
      <div className="flex justify-between mb-4">
        <h1 className="text-[16px] font-[600] text-gray-900 ">Notifications</h1>
        <div className="flex gap-4">
          <button
            onClick={handleReadAll}
            className="text-sm text-teal-600 font-medium"
          >
            Mark all as read
          </button>

          <button
            onClick={handleDeleteAll}
            className="text-sm text-red-600 font-medium"
          >
            Clear all
          </button>
        </div>
      </div>

      <div className="space-y-0">
        {notifications?.map((notification, index) => (
          <div key={notification._id}>
            <div
              className={`py-2 flex items-start justify-between cursor-pointer ${
                !notification.isRead ? "bg-gray-50" : ""
              }`}
              onClick={() => handleRead(notification._id)}
            >
              <div className="w-[80%]">
                <h2 className="text-[13px] font-[700]">{notification.title}</h2>
                <p className="text-[13px] text-gray-500">
                  {notification.description}
                </p>
              </div>

              <div className="flex flex-col items-end gap-2">
                {!notification.isRead && (
                  <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(notification._id);
                  }}
                  className="text-xs text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>

            {index < notifications.length - 1 && (
              <div className="border-b"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
