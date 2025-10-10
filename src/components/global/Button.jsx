import React from "react";
import { FaSpinner } from "react-icons/fa";

export default function Button({ text, loading, onClick, type, customClass }) {
  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        className={`bg-gradient ${customClass} h-[44px] flex justify-center items-center gap-2 rounded-[15px] cursor-pointer font-[700] text-[13px] text-white `}
      >
        {text} {loading && <FaSpinner className="animate-spin" />}
      </button>
    </div>
  );
}
