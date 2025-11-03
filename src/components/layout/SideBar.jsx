import { NavLink, useLocation, useNavigate } from "react-router";
import { sidebarData } from "../../static/Sidebar";
import {
  LocationIcon,
  LoginBgTopShapes,
  Logo,
  LogOutIcon,
  NotificationIcon,
  Person1,
  RatingIcon,
  settingIcon,
} from "../../assets/export";
import { useState } from "react";
import Notifications from "../global/NotificationDropdown";
import LogOutModal from "../global/LogOutModal";
import { useSelector } from "react-redux";

const SideBar = () => {
  const [isNotification, setIsNotification] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const { company } = useSelector((state) => state?.auth);
  const navigate = useNavigate("");
  const location = useLocation("");
  return (
    <div className="w-full h-full overflow-y-auto px-5 py-8 flex flex-col gap-3 justify-start items-start">
      <div className="flex justify-between items-end w-full">
        <div>
          <img src={Logo} className="h-[64px]" />
        </div>
        <div>
          <img
            src={NotificationIcon}
            onClick={() => setIsNotification(!isNotification)}
            className="cursor-pointer h-[62px] w-[62px]"
          />
        </div>
      </div>

      <div className="rounded-[12px] w-full h-full relative">
        {/* Bg Image */}
        <img
          src={LoginBgTopShapes}
          className="h-full absolute object-cover rounded-[12px] z-[1] right-0"
          alt="LoginBgTopShapes"
        />

        {/* User Info */}
        <div
          onClick={() => navigate("/app/profile")}
          className="bg-[#FFFFFF] cursor-pointer  py-4 px-2 rounded-[18px] "
        >
          <div className="w-[63px] relative z-10 h-[63px] p-[2px] border-2 border-[#22B573] border-dashed rounded-full">
            <img src={company?.profilePicture} alt="Person1" className="rounded-full w-full h-full" />
            <div className="bg-white  shadow-sm w-[45px] absolute -bottom-3 gap-1 left-2 flex items-center rounded-[8px] justify-center h-[20px] ">
              <img
                src={RatingIcon}
                alt="ratingStar.png"
                className="w-[12px] h-[12px]"
              />{" "}
              4.5
            </div>
          </div>
          <h3 className="font-[600] relative z-10 text-[18px] mt-4 ">
            {company?.name}
          </h3>
          <p className="flex relative z-10 items-baseline mt-2 text-[13px] font-[400] gap-1">
            {" "}
            <img
              src={LocationIcon}
              alt="LocationIcon"
              className="w-[9px] h-[11px]"
            />{" "}
            {company?.businessAddress}
          </p>
        </div>

        {/* Links */}
        <div className="bg-[#FFFFFF] rounded-[18px] mt-10">
          <div className="py-4 relative z-10 ">
            {sidebarData?.map((sidebar) => {
              return (
                <NavLink
                  key={sidebar?.link}
                  className={({ isActive }) =>
                    isActive
                      ? "text-sm border-l-4 rounded-t-[5px] rounded-b-[5px] border-[#03958A] w-full h-10 flex items-center  justify-start  gradient-text text-[14px] font-[400]  "
                      : "text-sm  w-full h-10 flex items-center justify-start  text-[#181818] text-[14px] font-[400]"
                  }
                  to={sidebar?.link}
                >
                  <div className="ml-5 flex items-center gap-3">
                    <img
                      src={
                        location?.pathname == sidebar.link
                          ? sidebar?.whiteIcon
                          : sidebar?.icon
                      }
                      className="w-4 "
                      alt=""
                    />
                    {sidebar?.title}
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>
        <div className="bg-img flex px-4 justify-center gap-6 flex-col  mt-5 py-4 relative z-0 rounded-[18px] ">
          <NavLink
            className={`text-white flex items-center gap-2 text-[12px] font-[400] `}
          >
            {" "}
            <img src={settingIcon} className="w-4" alt="setting-icon" />{" "}
            Settings
          </NavLink>
          <NavLink
            onClick={() => setIsLogout(true)}
            className={`text-white flex items-center gap-2 text-[12px] font-[400] `}
          >
            <img src={LogOutIcon} className="w-4" alt="logout-icon" /> Log out
          </NavLink>
        </div>
      </div>
      {isNotification && <Notifications />}
      <LogOutModal isOpen={isLogout} setIsOpen={setIsLogout} />
    </div>
  );
};

export default SideBar;
