import { CiSearch } from "react-icons/ci";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getChatRooms,
  getMessages,
  setSelectedChat,
} from "../../../redux/slices/ChatSlice";
import { PersonImage } from "../../../assets/export";
import { formatTime } from "../../../lib/helpers";
import SocketContext from "../../../context/SocketContext";
import { SOCKET_EVENTS } from "../../../constants/socketEvents";
// import { socket } from "../../../../socket";

export default function ChatUser({
  searchQuery,
  setSearchQuery,
  activeChat,
  setActiveChat,
  setIsActiveTab,
}) {
  const [tabs, setTabs] = useState("rider-company");
  const dispatch = useDispatch();
  const { socket, joinChat, readChat } = useContext(SocketContext);

  const { chatRooms } = useSelector((state) => state?.chat);

  console.log(chatRooms, "chatRooms");

  useEffect(() => {
    if (!socket) return;

    const handleReadError = (err) => {
      console.error("❌ Chat read error:", err);
    };

    const handleReceiveUpdated = (data) => {
      console.log("📩 Chat updated:", data);
      dispatch(getChatRooms({ page: 1, limit: 20, type: tabs }));
    };

    socket.on(SOCKET_EVENTS.CHAT.READ_ERROR, handleReadError);
    socket.on(SOCKET_EVENTS.CHAT.RECEIVE_UPDATED, handleReceiveUpdated);

    return () => {
      socket.off(SOCKET_EVENTS.CHAT.READ_ERROR, handleReadError);
      socket.off(SOCKET_EVENTS.CHAT.RECEIVE_UPDATED, handleReceiveUpdated);
    };
  }, [socket, tabs, dispatch]);

  useEffect(() => {
    dispatch(getChatRooms({ page: 1, limit: 20, type: tabs }));
  }, [tabs, dispatch]);

  const handleGetMessages = (roomId) => {
    readChat(roomId);
    joinChat(roomId);

    dispatch(getMessages({ page: 1, limit: 20, roomId }));
  };

  return (
    <div className="h-full bg-[#F9FAFA]  rounded-[24px] flex flex-col">
      <div>
        <div className="w-full">
          <div value="chats">
            <div className="px-6 py-2 mt-4">
              <div className="relative  ">
                <div className="absolute inset-y-0 -start-6 flex items-center px-8 pointer-events-none">
                  <CiSearch color="#18181880" size={25} />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full h-[49px]  px-10 text-sm focus:outline-none text-[#18181880] border border-[#F4F4F480] bg-[#EDEDED] rounded-[8px] "
                  placeholder="Search"
                  required=""
                />
              </div>
              <div className="w-full mt-5 bg-[#FFFFFF] py-1  rounded-[12px] shadow-sm flex justify-between">
                <button
                  onClick={() => {
                    setTabs("user-company");
                    setIsActiveTab("user-company");
                  }}
                  className={` ${
                    tabs == "user-company"
                      ? "font-[600] text-[16px] bg-gradient   text-white "
                      : "font-[400] text-[16px] border-[#8A92A6] "
                  } flex-1 rounded-[8px] w-[152px] h-[34px] `}
                >
                  Users
                </button>
                <button
                  onClick={() => {
                    setIsActiveTab("rider-company");
                    setTabs("rider-company");
                  }}
                  className={` ${
                    tabs == "rider-company"
                      ? "font-[600] text-[16px] bg-gradient   text-white "
                      : "font-[400] text-[16px] border-[#8A92A6] "
                  } flex-1 text-[#181818] rounded-[8px]  w-[152px] h-[34px]`}
                >
                  Riders
                </button>
              </div>
            </div>
            <div className="">
              {tabs == "rider-company"
                ? chatRooms?.map((user) => (
                    <div
                      key={user.id}
                      className={`flex items-center p-3 px-8 mt-2 cursor-pointer   ${
                        activeChat?.id === user.id
                          ? "bg-chat-list backdrop-blur-lg"
                          : ""
                      }`}
                      onClick={() => {
                        dispatch(setSelectedChat(user)); // ✅ Changed from setActiveChat
                        handleGetMessages(user.id);
                      }}
                    >
                      <div className="h-10 overflow-hidden flex items-center justify-center border border-[#03958A] rounded-full w-10">
                        <img
                          src={
                            user?.rider?.profilePicture
                              ? user?.rider?.profilePicture
                              : PersonImage
                          }
                          alt={user?.rider?.name}
                          className="w-full h-full "
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between items-center">
                          <h4 className="font-[600] text-[11px] lg:text-[14px] text-[#181818]">
                            {user?.rider?.name}
                          </h4>
                          <span className="text-[10px] lg:text-[12px] gradient-text">
                            {formatTime(user?.lastMessage?.createdAt)}
                          </span>
                        </div>
                        <p className="text-[10px] lg:text-[12px] text-[#181818] text-wrap font-[400] truncate">
                          {user.lastMessage?.content}
                        </p>
                      </div>
                      {user.unreadCount > 0 && (
                        <span className="-ml-5 mt-8 bg-[#03958A] text-white rounded-full px-2 py-1 text-xs">
                          {user.unreadCount}
                        </span>
                      )}
                    </div>
                  ))
                : chatRooms?.map((user) => (
                    <div
                      key={user.id}
                      className={`flex items-center p-3 px-8 mt-2 cursor-pointer   ${
                        activeChat?.id === user.id
                          ? "bg-chat-list backdrop-blur-lg"
                          : ""
                      }`}
                      onClick={() => {
                        dispatch(setSelectedChat(user)); // ✅ Changed from setActiveChat
                        handleGetMessages(user.id);
                      }}
                    >
                      <div className="h-10 overflow-hidden flex items-center justify-center border border-[#03958A] rounded-full w-10">
                        <img
                          src={
                            user?.user?.profilePicture
                              ? user?.user?.profilePicture
                              : PersonImage
                          }
                          alt={user?.user?.name}
                          className="w-full h-full "
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between items-center">
                          <h4 className="font-[600] text-[11px] lg:text-[14px] text-[#181818]">
                            {user?.user?.name}
                          </h4>
                          <span className="text-[10px] lg:text-[12px] gradient-text">
                            {formatTime(user?.lastMessage?.createdAt)}
                          </span>
                        </div>
                        <p className="text-[10px] lg:text-[12px] text-[#181818] text-wrap font-[400] truncate">
                          {user.lastMessage?.content}
                        </p>
                      </div>
                      {user.unreadCount > 0 && (
                        <span className="-ml-5 mt-8 bg-[#03958A] text-white rounded-full px-2 py-1 text-xs">
                          {user.unreadCount}
                        </span>
                      )}
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
