import { useDispatch, useSelector } from "react-redux";
import { DeleteImg, EditImg, MilkPackImg } from "../../../assets/export";
import Filter from "../../global/Filter";
import Pagination from "../../global/Pagination";
import GlobalTable from "../../global/Table";
import { useEffect, useState } from "react";
import { getProducts } from "../../../redux/slices/AppSlice";
import DeleteProductModal from "./DeleteProductModal";
import { useNavigate } from "react-router";

export default function ProductsData() {
  const columns = ["Product Name", "Category", "Price", "Stock", "Action"];
  const { products, isLoading } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setIsSelected] = useState(null);
  const navigate = useNavigate("");
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  console.log(products, "products");
  const productList = Array.isArray(products)
    ? products
    : products?.products || []; // handle nested array case

  const data = productList?.map((item, i) => ({
    _id: item?._id, // ✅ send the id for navigation
    cells: [
      <div key={i} className="flex items-center gap-3">
        <img
          src={item?.images?.[0]}
          alt="product"
          className="w-10 h-10 rounded-md object-cover"
        />
        <div>
          <p className="font-medium">
            {item?.name}
            <span className="ml-2 text-[11px] font-[400] text-[#EE3131] bg-[#EE313126] px-2 py-[2px] rounded-full">
              Out Of Stock
            </span>
          </p>
          <p className="text-xs text-gray-400 truncate w-[130px]">
            {item?.description}
          </p>
        </div>
      </div>,

      <p key={i} className="text-gray-700">
        {item?.category}
      </p>,
      <p key={i} className="text-gray-700">
        ${Number(item?.unitPrice || 0).toFixed(2)}
      </p>,
      <label key={i} className="inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" defaultChecked />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer py-[2.5px] peer-checked:bg-[#0EBB8E] after:content-[''] after:absolute after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-5 relative"></div>
      </label>,

      <div key={i} className="flex items-center gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation(); // 🧠 prevent triggering row click
            navigate("/app/edit-product", { state: { product: item } });
          }}
        >
          <img src={EditImg} alt="Edit" className="w-[20px] h-[20px]" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation(); // 🧠 prevent triggering row click
            setIsSelected(item?._id);
            setIsOpen(true);
          }}
        >
          <img src={DeleteImg} alt="Delete" className="w-[20px] h-[20px]" />
        </button>
      </div>,
    ],
  }));
  return (
    <div>
      <div className="flex justify-between  flex-wrap">
        <h3 className="font-[600] text-[32px]">Product Management</h3>
        <Filter />
      </div>
      <div className="mt-2 rounded-2xl shadow-sm border-t p-3 border-[#B9B9B9] bg-[#FFFFFF] ">
        <GlobalTable
          data={data}
          columns={columns}
          onRowClick={(id) =>
            navigate("/app/product-detail", { state: { id } })
          }
        />
      </div>
      <Pagination />
      <DeleteProductModal
        loading={isLoading}
        selected={selected}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}
