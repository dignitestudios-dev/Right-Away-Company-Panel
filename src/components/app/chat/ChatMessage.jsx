import React from "react";

export default function ChatMessage({ sender, content, time, avatar, name }) {
  return (
    <div className={`flex ${sender ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex ${
          sender ? "flex-row-reverse" : "flex-row"
        } items-start max-w-[70%]`}
      >
        {!sender && (
          <div className="h-8 w-8 mt-1 border rounded-full border-[#03958A]">
            <img src={avatar} alt={name} className="rounded-full w-full h-full" />
          </div>
        )}
        <div className={`mx-2 ${sender ? "items-end" : "items-start"}`}>
          <div className="flex items-center space-x-2 mb-1">
            {!sender && (
              <span className="text-[#181818] font-[600] text-[14px]">{name}</span>
            )}
          </div>
          <div
            className={`p-2 rounded-[15px] font-[400] text-[12px] ${
              sender
                ? "bg-gradient-light shadow-sm rounded-tr-none text-[#181818]"
                : "bg-[#E6E6E6] shadow-sm rounded-tl-none  text-[#181818]"
            }`}
          >
            {content}
          </div>

          <div className={`text-[10px] font-[400] ${sender ? "text-end" : "text-start"}  pr-2 pt-1 text-[#797C7B]`}>
            {time}
          </div>
        </div>
      </div>
    </div>
  );
}
