import React, { useState } from "react";
import { useContext } from "react";
import { UserAuthConext } from "../hooks/UserAuth";
import { useNavigate } from "react-router-dom";
import { FiAlignJustify } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { NavLink } from "react-router-dom";

export default function Navbars() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, setIsAuthenticated, username } =
    useContext(UserAuthConext);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const HandleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const Logout = async () => {
    try {
      const response = await fetch("https://real-estate-be-5852.onrender.com/api/user/logout", {
        method: "POST",
        credentials: "include",
      });
      const result = await response.json();

      if (response.ok) {
        setIsAuthenticated(false);
        setMessage(result.message);
        setError("");
        setTimeout(() => {
          navigate("/login");
          setMessage("");
        }, 2000);
      } else {
        setError(result.message);
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <nav className="bg-slate-600 h-20 grid grid-cols-2  gap-0 ">
        <div className="grid justify-evenly text-center items-center">
          <a href="/#">
            <h1 className="text-3xl">REAL eSTATE</h1>
          </a>
        </div>

        <div
          className="grid justify-around lg:hidden  items-center hover:cursor-pointer"
          onClick={HandleMenu}
        >
          {isMenuOpen ? (
            <RxCross1 className="h-11 w-10" />
          ) : (
            <FiAlignJustify className="h-11 w-10" />
          )}
        </div>
        <div className="link hidden w-full lg:flex md:text-center md:items-center md:gap-2 md:w-full text-2xl text-white ">
          <NavLink
            className="hover:text-purple-400 hover:underline"
            to="/property"
          >
            Property
          </NavLink>
          <NavLink
            className="hover:text-purple-400 hover:underline"
            to="/dashboard"
          >
            Admin
          </NavLink>
          <NavLink className="flex gap-5">
            {!isAuthenticated ? (
              <>
                <NavLink to={"/#login"}>
              
                  <button className="bg-green-700 h-10 w-24 text-center rounded-md p-1  hover:bg-green-900 ">
                    Login
                  </button>
                </NavLink>
                <NavLink to={"/signup"}>
              
                  <button className="bg-yellow-700 h-10 w-24 text-center rounded-md p-1  hover:bg-yellow-900 ">
                    Signup
                  </button>
                </NavLink>
              </>
            ) : (
              <>
                <h1 className="mt-1 text-purple-600 cursor-auto">{username}</h1>
                <NavLink to={"/add"}>
            
                  <button className="bg-green-700 h-10 px-2 text-center rounded-md p-1  hover:bg-green-900 ">
                    Sell Property
                  </button>
                </NavLink>
                <NavLink>
                
                  <button
                    onClick={Logout}
                    className="bg-red-500 h-10 w-24 text-center rounded-md p-1  hover:bg-red-900 "
                  >
                    Logout
                  </button>
                </NavLink>
              </>
            )}
          </NavLink>
        </div>
      </nav>
      <div className={isMenuOpen ? "lg:hidden" : "hidden "}>
        <div className="bg-slate-600 relative w-full border-2 border-gray-700  top-">
          <ul className=" grid justify-items-center text-2xl space-y-5 my-5 ">
            <NavLink to="/#" className=" hover:text-purple-400">
              Home
            </NavLink>
            <NavLink to="/property" className="hover:text-purple-400">
              Property
            </NavLink>
            <NavLink to="/dashboard" className="cursor-auto">
              Admin
            </NavLink>
            {!isAuthenticated ? (
              <>
                <NavLink
                  to="/login"
                  className="text-green-700 hover:text-green-950"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="  hover:text-yellow-900 text-yellow-600"
                >
                  Signup
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/add"
                  className="  hover:text-yellow-900 text-yellow-500"
                >
                  Sell Property
                </NavLink>
                <NavLink
                  onClick={Logout}
                  className="  hover:text-red-900 text-red-600"
                >
                  Logout
                </NavLink>
              </>
            )}
          </ul>
        </div>
      </div>

      {message && (
        <div className="alert p-4 w-[500px] mx-auto my-5 rounded-xl text-center text-2xl text-black bg-green-600">
          {message}
        </div>
      )}
      {error && (
        <div className="alert p-4 w-[500px] mx-auto my-5 rounded-xl text-center text-2xl text-white bg-red-600">
          {error}
        </div>
      )}
    </>
  );
}
