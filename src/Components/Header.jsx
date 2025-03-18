import logo from "../public/logo.png";
      import React from "react";
      import NewEmployeeModal from "./NewEmployeeModal.jsx";
      import { useNavigate } from "react-router-dom";

      const Header = () => {
        const navigate = useNavigate();

        return (
          <header className="flex items-center justify-between mb-7">
            <img src={logo} alt="momentum" className={"h-[38px] cursor-pointer"} onClick={() => navigate("/")}/>
            <div className="flex gap-4">
              <div className="border-primary rounded-md border-[1px] px-2 py-1">
                <NewEmployeeModal />
              </div>
              <div
                className="bg-primary rounded-md px-2 py-1 text-white cursor-pointer"
                onClick={() => navigate("/new-task")}
              >
                + შექმენი ახალი დავალება
              </div>
            </div>
          </header>
        );
      };

      export default Header;
