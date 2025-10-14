import { DeleteImg, EditImg } from "../../../assets/export";
import Filter from "../../global/Filter";
import GlobalTable from "../../global/Table";

export default function ProductsData() {
  const columns = [
    "Product Name",
    "Category",
    "Price",
    "Total Qty",
    "Stock",
    "Action",
  ];

  const data = Array(10)
    .fill(null)
    .map(() => [
      <div className="flex items-center gap-3">
        <img
          src={MilkPackImg}
          alt="product"
          className="w-10 h-10 rounded-md object-cover"
        />
        <div>
          <p className="font-medium">
            Product Name{" "}
            <span className="ml-2 text-[11px] font-[400] text-[#EE3131] bg-[#EE313126] px-2 py-[2px] rounded-full">
              Out Of Stock
            </span>
          </p>
          <p className="text-xs text-gray-400 truncate w-[130px]">
            lorem ipsum dolor sit amet...
          </p>
        </div>
      </div>,

      <p className="text-gray-700">Building materials</p>,
      <p className="text-gray-700">$125</p>,
      <p className="text-gray-700">942</p>,
      <label className="inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" defaultChecked />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer py-[2.5px] peer-checked:bg-[#0EBB8E] after:content-[''] after:absolute after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-5 relative"></div>
      </label>,
      <div className="flex items-center gap-3">
        <button>
          <img src={EditImg} alt="EditImg" className="w-[20px] h-[20px]" />
        </button>
        <button>
          <img src={DeleteImg} alt="DeleteImg" className="w-[20px] h-[20px]" />
        </button>
      </div>,
    ]);
  return (
    <div className="py-5">
      <div className="flex justify-between ">
        <h3 className="font-[600] text-[32px]">Product Management</h3>
        <Filter />
      </div>
      <div className="mt-2">
        <GlobalTable data={data} columns={columns} />
      </div>
    </div>
  );
}
