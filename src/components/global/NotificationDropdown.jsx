import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAllNotifications,
  deleteNotification,
  getNotifications,
  readAllNotifications,
  readNotification,
} from "../../redux/slices/AppSlice";
import { formatTime } from "../../lib/helpers";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router";
const Notifications = () => {
  const dispatch = useDispatch("");
  const { notifications, notificationsLoading } = useSelector(
    (state) => state.app,
  );
  const navigate = useNavigate("");

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
    <div className="w-[500px] top-[100px] h-[493px] absolute left-64 z-10 bg-white rounded-xl shadow-lg border border-gray-100">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">Notifications</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={handleReadAll}
              className="text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors"
            >
              Mark all read
            </button>
            <div className="w-px h-4 bg-gray-300"></div>
            <button
              onClick={handleDeleteAll}
              className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
            >
              Clear all
            </button>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="overflow-y-auto h-[calc(493px-73px)]">
        {notifications?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <svg
              className="w-16 h-16 mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <p className="text-sm font-medium">No notifications</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {notifications?.map((notification) => (
              <div
                key={notification._id}
                className={`px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer group ${
                  !notification.isRead ? "bg-teal-50/30" : ""
                }`}
                onClick={() => handleRead(notification._id)}
              >
                <div className="flex items-start gap-1">
                  {/* Unread Indicator */}
                  <div className="pt-1.5">
                    {!notification.isRead && (
                      <span className="block w-2 h-2 bg-teal-500 rounded-full"></span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h2 className="text-sm capitalize font-semibold text-gray-900">
                        {notification.title}
                      </h2>
                      <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">
                        {formatTime(notification.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm capitalize text-gray-600 leading-relaxed">
                      {notification.description}
                    </p>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(notification._id);
                    }}
                    className=" transition-opacity px-1 hover:bg-red-50 rounded-md"
                    aria-label="Delete notification"
                  >
                    <svg
                      className="w-4 h-4 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={async (e) => {
                      e.stopPropagation();
                      await handleRead(notification?._id);
                      navigate("/app/order-detail", {
                        state: { id: notification?.metaData?._id },
                      });
                    }}
                    className=" transition-opacity px-1 hover:bg-teal-50 rounded-md"
                    aria-label="Redirect Order notification"
                  >
                    <MdKeyboardArrowRight className="text-teal-600" size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
