import PopularProducts from "../../components/app/Dashboard/PopularProducts";
import SalesOverview from "../../components/app/Dashboard/SalesOverview";
import Stats from "../../components/app/Dashboard/Stats";
import TransactionGraph from "../../components/app/Dashboard/TransactionGraph";

const Dashboard = () => {
  return (
    <div>
      <h3 className="font-[600] text-[32px]">Dashboard</h3>
      <Stats />
      <div className="grid grid-cols-12 gap-6 lg:gap-2">
        <SalesOverview />
        <PopularProducts />
      </div>
      <div className="mt-4" >
        <TransactionGraph />
      </div>
    </div>
  );
};

export default Dashboard;
