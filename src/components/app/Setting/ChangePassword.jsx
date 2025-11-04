import { useFormik } from "formik";
import Modal from "react-modal";
import Input from "../../global/Input";
import { HiOutlineXMark } from "react-icons/hi2";
import { changedPasswordValues } from "../../../init/authentication/dummyLoginValues";
import { changedPasswordSchema } from "../../../schema/authentication/dummyLoginSchema";
import Button from "../../global/Button";

export default function ChangedPassword({
  isOpen,
  setIsOpen,
  successFullUpdate,
  SetSuccessfulUpdate,
}) {
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    resetForm,
  } = useFormik({
    initialValues: changedPasswordValues,
    validationSchema: changedPasswordSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (vals) => {
      // just simulate success — no API call
      console.log("Password change submitted:", vals);
      setIsOpen(false);
      SetSuccessfulUpdate(!successFullUpdate);
      resetForm();
    },
  });

  return (
    <div>
      <Modal
        isOpen={isOpen}
        contentLabel="Change Password"
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        className="flex items-center justify-center border-none outline-none z-[1000]"
        overlayClassName="fixed inset-0 bg-[#C6C6C6] bg-opacity-50 backdrop-blur-sm z-[1000] flex justify-center items-center"
      >
        <div className="bg-white rounded-[16px] p-6 pt-3 shadow-lg w-[450px] flex flex-col text-center justify-center gap-3">
          <div className="flex justify-end w-full">
            <button onClick={() => setIsOpen(false)} aria-label="Close">
              <HiOutlineXMark size={23} />
            </button>
          </div>

          <h3 className="font-bold text-[36px] text-[#181818]">
            Change Password
          </h3>
          <p className="font-[400] text-[16px] text-[#565656]">
            You must enter current password in order to update password.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
            className="w-full mt-5 flex flex-col justify-start items-start gap-4"
          >
            <Input
              text="current password"
              name="password"
              type="password"
              holder="Enter password here"
              value={values.password}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.password}
              touched={touched?.password}
              hideText={true}
            />

            <Input
              text="New Password"
              name="newPassword"
              type="password"
              holder="Enter new password here"
              value={values.newPassword}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.newPassword}
              touched={touched?.newPassword}
              hideText={true}
            />

            <Input
              text="Confirm Password"
              name="confirmPassword"
              type="password"
              holder="Re-enter password here"
              value={values.confirmPassword}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.confirmPassword}
              touched={touched?.confirmPassword}
              hideText={true}
            />
            <div className="flex justify-center w-full">
              <Button text="Update" customClass={"w-[390px]"} type="submit" />
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
