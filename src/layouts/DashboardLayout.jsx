import { Outlet } from "react-router";
import { useEffect, useState } from "react";
import NoInternetModal from "../components/global/NoInternet";
import { NoInternetImage } from "../assets/export";
import SideBar from "../components/layout/SideBar";

const DashboardLayout = () => {
  const [openNoInternet, setOpenNoInternet] = useState(false);

  useEffect(() => {
    if (!navigator.onLine) {
      // Handle no internet connection
      setOpenNoInternet(true);
    }
  }, []);
  return (
    <div className="w-full h-screen overflow-hidden flex flex-col justify-start items-start">      
      <img src={NoInternetImage} alt="" className="hidden" />
      <div className="w-full  h-screen flex justify-start items-start">
        <div className="w-/12 hidden-scrollbar h-[calc(100%-2.5rem)] bg-[#F6FCFA] ">
          <SideBar />
        </div>
        <div className="w-[calc(100%-15rem)] h-screen hidden-scrollbar overflow-y-auto rounded-[23px] m-3 bg-[#F4F4F4]  p-4 ">
          <NoInternetModal isOpen={openNoInternet} />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
