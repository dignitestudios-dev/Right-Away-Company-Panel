import { useState } from "react";
import { IoSend } from "react-icons/io5";
import ChatUser from "../../components/app/Chat/ChatUser";
import ChatMessage from "../../components/app/Chat/ChatMessage";
import { Person1, Person2 } from "../../assets/export";
import { IoIosSend } from "react-icons/io";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router";
// import { RiArrowGoBackFill } from "react-icons/ri";
const Chat = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChat, setActiveChat] = useState(null);
  const navigate = useNavigate("");
  return (
    <div className="h-[calc(100%-4.5rem)]">
      <div className="flex items-center gap-4">
        <GoArrowLeft
          onClick={() => navigate(-1)}
          className="text-[#03958A] cursor-pointer "
          size={21}
        />{" "}
        <h3 className="font-[600] text-[32px] text-[#202224]">Messages</h3>
      </div>
      <div className="grid grid-cols-12 h-full gap-5 mt-3">
        {/* Left Sidebar */}

        <div className={`col-span-12 md:col-span-4 `}>
          <ChatUser
            activeChat={activeChat}
            setActiveChat={setActiveChat}
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
          />{" "}
        </div>

        {/* Right Chat Area */}
        <div
          className={` bg-[#F9FAFA] backdrop-blur-[50px] rounded-[24px] p-2 col-span-12 md:col-span-8 md:flex  flex-1  flex-col shadow-sm overflow-hidden`}
        >
          {activeChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 bg-gradient rounded-[24px] backdrop-blur-[50px] ">
                <div className="flex items-center">
                  <div className="h-12 w-12">
                    <img src={Person1} alt={Person1} className="rounded-full" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-lg text-white">John Doe</h3>
                  </div>
                </div>
              </div>
              <div className="flex items-center my-4 mx-auto justify-center h-[22px] w-[50px] rounded-[4px] bg-[#1818182B] text-[12px] font-[400] text-[#181818]">
                Today
              </div>
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <ChatMessage
                  sender={false}
                  content="labore et dolore magna aliqua."
                  time="10:31 AM"
                  avatar={Person2}
                  name={"John Doe"}
                />
                <ChatMessage
                  sender={true}
                  content="Lorem ipsum dolor sit amet, consectetur adipiscing eliteiusmod tempor incididunt ut labore et dolore magna aliqua. "
                  time="10:30 AM"
                  avatar={Person1}
                  name="You"
                />
              </div>

              {/* Message Input */}
              <div className="bg-[#EEEEEE] rounded-[15px] h-[50px] flex items-center">
                <div className="flex w-full space-x-4 pr-2">
                  <input
                    type="text"
                    placeholder="Type Message "
                    className="flex-1 border focus:outline-none w-full px-4 text-[16px] font-[400] text-[#18181880] border-[#EEEEEE] h-[40px] rounded-[14px] bg-transparent"
                  />
                  <button className="w-[40px]  h-[40px] flex justify-center items-center rounded-[10px] bg-gradient text-white  ">
                    <IoIosSend size={20} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-white">
              Select a chat to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
