import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminAuthContext } from "../hooks/AdminAuth";
import { redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";
export default function AdminNavbar() {
  const { isAdmin, setIsAdmin, name } = useContext(AdminAuthContext);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const Logout = async () => {
    try {
      const response = await fetch("https://real-estate-be-5852.onrender.com/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok) {
        setIsAdmin(false);
        setMessage(result.message);
        setError("");
        setTimeout(() => {
          navigate("/#");
          setMessage("");
        }, 2000);
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <div className="p-5 text-xl  w-full bg-gray-600 flex justify-evenly">
        <div className="flex gap-2">
          <a href="/#">Home</a>
          <a className="hover:text-purple-400" href="/dashboard">
            Admin
          </a>
        </div>
        <div className="flex gap-5">
          {isAdmin ? (
            <>
              <h1 className="text-blue-400">{name}</h1>
              <NavLink>
                {" "}
                <button
                  onClick={Logout}
                  className="bg-red-700 h-10 w-24 text-center rounded-md p-1  hover:bg-red-900 "
                >
                  Logout
                </button>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to={"/#admin/#login"}>
                {" "}
                <button className="bg-green-700 h-10 w-24 text-center rounded-md p-1  hover:bg-green-900 ">
                  Login
                </button>
              </NavLink>
            </>
          )}
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
