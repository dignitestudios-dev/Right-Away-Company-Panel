import { Outlet } from "react-router";
import { useEffect, useRef, useState } from "react";
import NoInternetModal from "../components/global/NoInternet";
import { NoInternetImage } from "../assets/export";
import SideBar from "../components/layout/SideBar";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

const DashboardLayout = () => {
  const [openNoInternet, setOpenNoInternet] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (!navigator.onLine) {
      setOpenNoInternet(true);
    }
  }, []);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <div className="w-screen h-screen flex justify-start overflow-hidden">
      {/* ===== Gradient/Background Layer (Optional aesthetic like your first project) ===== */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2fb4f71b] via-transparent to-[#2fb4f74e] opacity-20" />
      </div>

      {/* ===== SIDEBAR ===== */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:block
        w-[65%] sm:w-[50%] md:w-[40%] lg:w-60 xl:w-[380px] 
        h-full bg-[#F6FCFA] z-50 shadow-xl lg:shadow-none`}
      >
        <SideBar />
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex flex-col w-full h-full">
        {/* ===== TOP BAR ===== */}
        <div className="sticky top-0 lg:hidden  z-40 flex items-center justify-between px-4 py-4 lg:px-8">
          {/* Menu Button (Visible only on mobile) */}
          <button
            onClick={toggleSidebar}
            className=" text-gray-800"
          >
            <HiOutlineMenuAlt2 className="text-2xl" />
          </button>
        </div>

        {/* ===== CONTENT BODY ===== */}
        <div className="relative bg-[#F4F4F4] rounded-[20px] flex-1 overflow-y-auto m-4 p-4">
          <img src={NoInternetImage} alt="" className="hidden" />
          <NoInternetModal isOpen={openNoInternet} />
          <Outlet />
        </div>
      </div>

      {/* ===== OVERLAY (for mobile) ===== */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;
