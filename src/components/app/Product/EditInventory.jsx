import { useFormik } from "formik";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../global/Input";
import Button from "../../global/Button";
import { AddInventorySchema } from "../../../schema/app/AppSchema";
import { useEffect } from "react";
import { getStore } from "../../../redux/slices/authSlice";

const EditInventory = ({
  isOpen,
  setIsOpen,
  editIndex,
  inventories,
  setInventories,
}) => {
  const { stores } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStore());
  }, []);
  const inventoryToEdit = inventories[editIndex] || {
    storeName: "",
    stock: "",
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: inventoryToEdit,
      enableReinitialize: true, // allows values to update when modal opens
      validationSchema: AddInventorySchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values) => {
        const updatedInventories = inventories.map((inv, idx) =>
          idx === editIndex ? values : inv
        );
        setInventories(updatedInventories);
        setIsOpen(false);
      },
    });
  console.log(values, "inventoryToEdit");
  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Edit Inventory"
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
      className="flex items-center justify-center border-none outline-none z-[1000]"
      overlayClassName="fixed inset-0 bg-[#C6C6C6] bg-opacity-50 backdrop-blur-sm z-[1000] flex justify-center items-center"
    >
      <div className="bg-white rounded-[12px] p-6 shadow-lg w-[525px] py-10">
        <div className="flex justify-between items-center">
          <h3 className="text-[28px] font-[700] text-[#181818]">
            Edit Inventory Details
          </h3>
          <IoCloseSharp
            size={22}
            className="cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </div>

        <form onSubmit={handleSubmit} className="w-full mt-4">
          <div className="grid grid-cols-12 gap-3">
            {/* Store Name */}
            <div className="col-span-12">
              <Input
                text="Store Name"
                holder="e.g. Main Warehouse, Downtown Branch"
                type="select"
                name="storeName"
                value={values.storeName}
                touched={touched.storeName}
                error={errors.storeName}
                handleChange={handleChange}
                handleBlur={handleBlur}
                selectOptions={stores?.map((item) => ({
                  value: item._id,
                  label: item.name,
                }))}
              />
            </div>
            {/* Total Stock */}
            <div className="col-span-12">
              <Input
                text="Total Stock"
                holder="Enter stock quantity"
                type="number"
                name="stock"
                value={values.stock}
                touched={touched.stock}
                error={errors.stock}
                handleBlur={handleBlur}
                handleChange={(e) => {
                  const value = e.target.value;

                  // allow empty
                  if (value === "") {
                    handleChange(e);
                    return;
                  }

                  // allow only digits AND max 5 digits (1–99999)
                  if (/^\d{1,5}$/.test(value)) {
                    handleChange(e);
                  }
                }}
                onKeyDown={(e) => {
                  if (["e", "E", "+", "-"].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
            </div>
          </div>

          <Button
            text="Save Changes"
            type="submit"
            customClass="w-[360px] mx-auto mt-5"
          />
        </form>
      </div>
    </Modal>
  );
};

export default EditInventory;
