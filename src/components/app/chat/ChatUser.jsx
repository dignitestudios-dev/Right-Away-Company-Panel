import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import { users } from "../../../static/ChatUsers";

export default function ChatUser({
  searchQuery,
  setSearchQuery,
  activeChat,
  setActiveChat,
}) {
  const [tabs, setTabs] = useState("chat");

  return (
    <div className="h-full bg-[#F9FAFA]  rounded-[24px] flex flex-col">
      <div>
        <div className="w-full">
          <div value="chats">
            <div className="px-6 py-4 mt-4">
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
                  onClick={() => setTabs("chat")}
                  className={` ${
                    tabs == "chat"
                      ? "font-[600] text-[16px] bg-gradient   text-white "
                      : "font-[400] text-[16px] border-[#8A92A6] "
                  } flex-1 rounded-[8px] w-[152px] h-[34px] `}
                >
                  Users
                </button>
                <button
                  onClick={() => setTabs("group")}
                  className={` ${
                    tabs == "group"
                      ? "font-[600] text-[16px] bg-gradient   text-white "
                      : "font-[400] text-[16px] border-[#8A92A6] "
                  } flex-1 text-[#181818] rounded-[8px]  w-[152px] h-[34px]`}
                >
                  Riders
                </button>
              </div>
            </div>
            <div className="space-y-2">
              {users.map((user) => (
                <div
                  key={user.id}
                  className={`flex items-center p-3 mt-2 cursor-pointer   ${
                    activeChat?.id === user.id
                      ? "bg-chat-list backdrop-blur-lg"
                      : ""
                  }`}
                  onClick={() => setActiveChat(user)}
                >
                  <div className="h-10 w-10">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="rounded-full border border-[#03958A] p-[2px]"
                    />
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-[600] text-[11px] lg:text-[14px] text-[#181818]">
                        {user.name}
                      </h4>
                      <span className="text-[10px] lg:text-[12px] gradient-text">
                        {user.time}
                      </span>
                    </div>
                    <p className="text-[10px] lg:text-[12px] text-[#181818] text-wrap font-[400] truncate">
                      {user.lastMessage}
                    </p>
                  </div>
                  {user.unread > 0 && (
                    <span className="-ml-5 mt-8 bg-[#03958A] text-white rounded-full px-2 py-1 text-xs">
                      {user.unread}
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
