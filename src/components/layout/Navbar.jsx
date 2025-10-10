import { Logo } from "../../assets/export";

const Navbar = () => {
  return (
    <div className="w-full h-full px-4 flex justify-between items-center">
      <img src={Logo} loading="lazy" alt="logo-organization" className="h-8" />

    </div>
  );
};

export default Navbar;
