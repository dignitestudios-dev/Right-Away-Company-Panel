import { useEffect, useState } from "react";
import ChatMessage from "../../components/app/chat/ChatMessage";
import ChatUser from "../../components/app/chat/ChatUser";
import { Person1, Person2, PersonImage } from "../../assets/export";
import { IoIosSend } from "react-icons/io";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router";
import ReportModal from "../../components/app/Customer/ReportReasonModal";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../../socket";
import { formatTime } from "../../lib/helpers";
import { addMessage, setSelectedChat } from "../../redux/slices/ChatSlice";
// import { RiArrowGoBackFill } from "react-icons/ri";
const Chat = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate("");
  const [newMessage, setNewMessage] = useState("");
 const dispatch = useDispatch();
  const { selectedChat, messages } = useSelector((state) => state.chat);

  useEffect(() => {
    // Receive new messages from rider
    socket.on("chat:receive", (data) => {
      console.log(data?.data?.message, "New Message Received");

      dispatch(addMessage(data?.data?.message)); // 👈 THIS WILL FIX IT
    });
    // Error sending message
    socket.on("chat:send:error", (err) => {
      console.error("Send Error:", err);
    });

    // Unread count event
    socket.on("chat:unread:count", (data) => {
      console.log("Unread Count:", data);
    });
    // Unread count event
   
    return () => {
      socket.off("chat:receive");
      socket.off("chat:send:error");
      socket.off("chat:unread:count");
    };
  }, []);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const payload = {
      roomId: selectedChat?.id,
      message: newMessage,
      type: "text",
    };
    socket.emit("chat:send", payload);
    setNewMessage("");
  };

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
            activeChat={selectedChat}
            setActiveChat={setSelectedChat}
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
          />{" "}
        </div>

        {/* Right Chat Area */}
        <div
          className={` bg-[#F9FAFA] backdrop-blur-[50px] rounded-[24px] p-2 col-span-12 md:col-span-8 md:flex  flex-1  flex-col shadow-sm overflow-hidden`}
        >
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 flex justify-between items-center bg-gradient rounded-[24px] backdrop-blur-[50px] ">
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-[#FFFFFF] flex justify-center items-center rounded-full">
                    <img
                      src={
                        selectedChat?.rider?.profilePicture
                          ? selectedChat?.rider?.profilePicture
                          : PersonImage
                      }
                      alt={selectedChat?.rider?.profilePicture}
                      className="w-5 h-5 "
                    />
                  </div>
                  <div className="ml-2">
                    <h3 className="font-medium capitalize text-lg text-white">
                      {selectedChat?.rider?.name}
                    </h3>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => setIsOpen(true)}
                    className="bg-[#F6FCFA] w-[120px] h-[40px] rounded-[15px] text-[14px] text-[#000000] font-[400] "
                  >
                    Report User
                  </button>
                </div>
              </div>
              <div className="flex items-center my-4 mx-auto justify-center h-[22px] w-[50px] rounded-[4px] bg-[#1818182B] text-[12px] font-[400] text-[#181818]">
                Today
              </div>
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages?.map((msg) => (
                  <ChatMessage
                    sender={
                      msg?.sender == selectedChat?.rider?._id ? false : true
                    }
                    content={msg?.content}
                    time={formatTime(msg?.createdAt)}
                    avatar={Person2}
                    name={selectedChat?.rider?.name}
                  />
                ))}
              </div>

              {/* Message Input */}
              <div className="bg-[#EEEEEE] rounded-[15px] h-[50px] flex items-center">
                <div className="flex w-full space-x-4 pr-2">
                  <input
                    type="text"
                    placeholder="Type Message "
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 border focus:outline-none w-full px-4 text-[16px] font-[400] text-[#18181880] border-[#EEEEEE] h-[40px] rounded-[14px] bg-transparent"
                  />
                  <button
                    onClick={sendMessage}
                    className="w-[40px]  h-[40px] flex justify-center items-center rounded-[10px] bg-gradient text-white  "
                  >
                    <IoIosSend size={20} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-[#181818]">
              Select a chat to start messaging
            </div>
          )}
        </div>
      </div>
      <ReportModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Chat;
