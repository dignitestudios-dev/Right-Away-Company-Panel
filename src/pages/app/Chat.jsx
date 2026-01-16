import { useContext, useEffect, useRef, useState } from "react";
import ChatMessage from "../../components/app/chat/ChatMessage";
import ChatUser from "../../components/app/chat/ChatUser";
import { PersonImage } from "../../assets/export";
import { IoIosSend } from "react-icons/io";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { formatTime } from "../../lib/helpers";
import {
  addMessage,
  getChatRooms,
  setSelectedChat,
} from "../../redux/slices/ChatSlice";
import SocketContext from "../../context/SocketContext";
import { SOCKET_EVENTS } from "../../constants/socketEvents";
import ChatReportModal from "../../components/app/chat/ChatReportModal";

const Chat = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate("");
  const [newMessage, setNewMessage] = useState("");
  const [isActiveTab, setIsActiveTab] = useState("");
  const dispatch = useDispatch();
  const { socket, sendMessage } = useContext(SocketContext);

  const { selectedChat, messages } = useSelector((state) => state.chat);

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (data) => {
      console.log("📩 New Message:", data?.data?.message);
      dispatch(addMessage(data?.data?.message));
      dispatch(getChatRooms({ page: 1, limit: 20, type: isActiveTab }));
    };

    const handleSendError = (error) => {
      console.error("❌ Chat send error:", error);
    };

    const handleUnreadCount = () => {
      dispatch(getChatRooms({ page: 1, limit: 20, type: isActiveTab }));
    };

    socket.on(SOCKET_EVENTS.CHAT.RECEIVE_MESSAGE, handleReceiveMessage);
    socket.on("chat:send:error", handleSendError); // if backend sends this
    socket.on("chat:unread:count", handleUnreadCount);

    return () => {
      socket.off(SOCKET_EVENTS.CHAT.RECEIVE_MESSAGE, handleReceiveMessage);
      socket.off("chat:send:error", handleSendError);
      socket.off("chat:unread:count", handleUnreadCount);
    };
  }, [socket, dispatch, isActiveTab]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    sendMessage({
      roomId: selectedChat.id,
      message: newMessage,
      type: "text",
    });

    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="h-[calc(100%-4.5rem)]">
      <div className="flex items-center gap-4">
        <GoArrowLeft
          onClick={() => navigate(-1)}
          className="text-[#03958A] cursor-pointer "
          size={21}
        />
        <h3 className="font-[600] text-[32px] text-[#202224]">Messages</h3>
      </div>
      <div className="grid grid-cols-12 h-full gap-5 mt-3">
        {/* Left Sidebar */}
        <div className={`col-span-12 md:col-span-4 `}>
          <ChatUser
            setIsActiveTab={setIsActiveTab}
            activeChat={selectedChat}
            setActiveChat={setSelectedChat}
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
          />
        </div>

        {/* Right Chat Area */}
        <div
          className={` bg-[#F9FAFA] backdrop-blur-[50px] rounded-[24px] p-2 col-span-12 md:col-span-8 md:flex  flex-1  flex-col shadow-sm overflow-hidden`}
        >
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 flex justify-between items-center bg-gradient rounded-[24px] backdrop-blur-[50px] ">
                {selectedChat?.rider ? (
                  <div className="flex items-center">
                    <div className="h-12 w-12 bg-[#FFFFFF] flex justify-center items-center rounded-full">
                      <img
                        src={
                          selectedChat?.rider?.profilePicture
                            ? selectedChat?.rider?.profilePicture
                            : PersonImage
                        }
                        alt={selectedChat?.rider?.profilePicture}
                        className="h-full rounded-full overflow-hidden w-full "
                      />
                    </div>
                    <div className="ml-2">
                      <h3 className="font-medium capitalize text-lg text-white">
                        {selectedChat?.rider?.name}
                      </h3>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <div className="h-12 w-12 bg-[#FFFFFF] overflow-hidden flex justify-center items-center rounded-full">
                      <img
                        src={
                          selectedChat?.user?.profilePicture
                            ? selectedChat?.user?.profilePicture
                            : PersonImage
                        }
                        alt={selectedChat?.user?.profilePicture}
                        className="h-full w-full "
                      />
                    </div>
                    <div className="ml-2">
                      <h3 className="font-medium capitalize text-lg text-white">
                        {selectedChat?.user?.name}
                      </h3>
                    </div>
                  </div>
                )}

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
                {selectedChat?.rider
                  ? messages?.map((msg) => (
                      <ChatMessage
                        key={msg?._id}
                        sender={
                          msg?.sender === selectedChat?.rider?._id
                            ? false
                            : true
                        }
                        content={msg?.content}
                        time={formatTime(msg?.createdAt)}
                        avatar={selectedChat?.rider?.profilePicture}
                        name={selectedChat?.rider?.name}
                      />
                    ))
                  : messages?.map((msg) => (
                      <ChatMessage
                        key={msg?._id}
                        sender={
                          msg?.sender == selectedChat?.user?._id ? false : true
                        }
                        content={msg?.content}
                        time={formatTime(msg?.createdAt)}
                        avatar={selectedChat?.user?.profilePicture}
                        name={selectedChat?.user?.name}
                      />
                    ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="bg-[#EEEEEE] rounded-[15px] h-[50px] flex items-center">
                <div className="flex w-full space-x-4 pr-2">
                  <input
                    type="text"
                    placeholder="Type Message "
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 border focus:outline-none w-full px-4 text-[16px] font-[400] text-[#18181880] border-[#EEEEEE] h-[40px] rounded-[14px] bg-transparent"
                  />
                  <button
                    onClick={handleSendMessage}
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
      <ChatReportModal selectedChat={selectedChat} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Chat;
