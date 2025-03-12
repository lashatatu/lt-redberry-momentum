import logo from "../public/logo.png";
import React from "react";
import NewEmployeeModal from "./NewEmployeeModal.jsx";

const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <img src={logo} alt="momentum" className={"h-[38px]"} />
      <div className="flex gap-4">
        <div className="border-primary rounded-md border-[1px] px-2 py-1">
          <NewEmployeeModal />
        </div>
        <div className="bg-primary rounded-md px-2 py-1 text-white">
          + შექმენი ახალი დავალება
        </div>
      </div>
    </header>
  );
};

export default Header;
