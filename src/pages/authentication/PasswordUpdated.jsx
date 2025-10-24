import { useNavigate } from "react-router";
import { LoginBgTopShapes, SuccessIcon } from "../../assets/export";

export default function PasswordUpdated() {
  const navigate=useNavigate("")
  return (
    <div className={`grid grid-cols-1  h-full w-full xl:grid-cols-2`}>
      <div className=" md:px-5 pb-5 flex flex-col justify-end"></div>
      <div className="w-full px-10 lg:px-20">
        <div
        onClick={()=>navigate("/auth/login")}
          className={`bg-white px-10 py-5  relative flex justify-center flex-col items-center h-full backdrop-blur-[34px] rounded-[28px]`}
        >
          {/* Bg Image */}
          <img
            src={LoginBgTopShapes}
            className="h-full absolute z-[-1] right-0"
            alt="LoginBgTopShapes"
          />
          {/* Form Content */}
          <div className="flex flex-col items-center gap-2">
            <img src={SuccessIcon} className="w-[100px]" alt={"SuccessIcon"} />
            <h3 className="font-[600] text-[36px]">Password Updated!</h3>
            <p className="text-[#838383] text-[16px] font-[400] ">
              Your password has been updated successfully.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
