import { useFormik } from "formik";
import { loginValues } from "../../init/authentication/dummyLoginValues";
import {
  AppleImage,
  GoogleImage,
  LoginBgTopShapes,
  Logo,
} from "../../assets/export";
import Input from "../../components/global/Input";
import Button from "../../components/global/Button";
import { useNavigate } from "react-router";
import { signInSchema } from "../../schema/authentication/dummyLoginSchema";
import { useDispatch, useSelector } from "react-redux";
import { CompanyLogin, SendOtpFa } from "../../redux/slices/authSlice";

const Login = () => {
  const navigate = useNavigate("");
  const dispatch = useDispatch();
  const {isLoading}=useSelector(state=>state?.auth)
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: loginValues,
      validationSchema: signInSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values, action) => {
        const data = {
          email: values?.email,
          password: values?.password,
          role:"company"
        };
        await dispatch(CompanyLogin(data)).unwrap();
        await dispatch(SendOtpFa({email:values?.email,role:"company"})).unwrap();
        navigate("/auth/two-factor-verfication",{state:{email:values?.email}});
      
      },
    });

  return (
    <div className={`grid grid-cols-1  h-full w-full xl:grid-cols-2`}>
      <div className="md:px-5 pb-5 flex flex-col justify-end">
        <div className="bg-[#FFFFFF] md:w-[400px] flex items-center justify-center px-5 rounded-[12px] h-[65px] backdrop-blur-3xl ">
          <span className="gradient-text text-[26px] md:text-[32px] font-[500]">
            Simplify your workflow
          </span>
        </div>
        <h3 className="text-[#FFFFFF] font-bold text-center md:text-start text-[30px] md:text-[55px] ">
          Accelerate your results.
        </h3>
      </div>
      <div className="w-full px-10 lg:px-20">
        <div
          className={`bg-white px-10 py-5  flex justify-center flex-col items-center relative h-full backdrop-blur-[34px] rounded-[28px]`}
        >
          {/* Bg Image */}
          <img
            src={LoginBgTopShapes}
            className="h-full absolute z-[-1] right-0"
            alt="LoginBgTopShapes"
          />
          {/* Form Content */}
          <div className="flex flex-col items-center gap-2">
            <img src={Logo} alt="Logo" className="w-[100px]" />
            <h3 className="font-[600] text-[36px]">Welcome Back</h3>
            <p className="text-[#838383] text-[16px] font-[400] ">
              Please enter your details to log in.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full lg:px-[60px] space-y-4  mt-4">
            <Input
              text={"Email Address"}
              holder={"Enter email address"}
              type={"email"}
              touched={touched.email}
              handleChange={handleChange}
              name={"email"}
              error={errors.email}
              handleBlur={handleBlur}
            />
            <Input
              text={"Password"}
              holder={"Enter password here"}
              type={"password"}
              touched={touched.password}
              handleChange={handleChange}
              name={"password"}
              error={errors.password}
              handleBlur={handleBlur}
            />
            <Button
              text={"Log In"}
              loading={isLoading}
              type="submit"
              customClass={"w-full"}
            />
          </form>
          <div className="space-y-2 mt-2  lg:w-[360px] ">
            <p className="text-[#484848] text-center text-[12px] font-[400] ">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/auth/signup")}
                className="cursor-pointer gradient-text font-[600] text-[12px]"
              >
                Sign Up{" "}
              </span>
            </p>
            <div className="flex w-full items-center rounded-full">
              <div className="flex-1 border-b border-gray-350" />
              <span className="text-[#484848] text-[20px] font-normal leading-8 px-3 ">
                Or
              </span>
              <div className="flex-1 border-b border-gray-350 " />
            </div>
            <div className="w-full">
              <button className="bg-shadow flex items-center p-2 bg-[#FFFFFF]  rounded-full w-full h-12">
                <img src={GoogleImage} alt="" className="w-8" />
                <span className="mx-auto text-[14px] font-[500] text-[#181818]">
                  Continue With Google
                </span>
              </button>
              <button className="bg-shadow flex items-center mt-4 p-2 bg-[#FFFFFF]  rounded-full w-full h-12">
                <img src={AppleImage} alt="" className="w-8" />
                <span className="mx-auto text-[14px] font-[500] text-[#181818]">
                  Continue With Apple
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
