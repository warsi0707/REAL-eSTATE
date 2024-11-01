import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [city, setCity] = useState("");
  const [properties, setProperties] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const Dashboard = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/admin/dashboard",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await response.json();

      if (response.ok) {
        setCity(result.city);
        setProperties(result.properties);
        setUsers(result.users);
      } else {
        setCity("");
        setProperties("");
        setUsers("");
      }
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    Dashboard();
  }, []);
  return (
    <>
      <div className="main h-screen m-2 ">
        <div className=" mx-auto mt-32 p-5 w-auto   md:w-[500px] lg:w-[1000px] rounded-xl  space-y-4   lg:grid grid-cols-1 lg:grid-cols-3 items-center   gap-5">
          <div className="bg-white mx-auto mt-3  text-black h-44 p-5 pb-0 w-60 rounded-xl relative">
            <h1>Total Poperty</h1>
            <p className="text-start flex my-7 text-3xl font-bold">
              {properties}
            </p>
            <div className="text-center ">
              <a href="/admin/properties" className="r">
                View Details
              </a>
            </div>
          </div>
          <div className="bg-white mx-auto mt-3  text-black h-44 p-5 pb-0 w-60 rounded-xl relative">
            <h1>Total City</h1>
            <p className="text-start flex my-7 text-3xl font-bold">{city}</p>
            <div className="text-center ">
              <a href="" className="r">
                View Details
              </a>
            </div>
          </div>
          <div className="bg-white mx-auto mt-3  text-black h-44 p-5 pb-0 w-60 rounded-xl relative">
            <h1>Total User</h1>
            <p className="text-start flex my-7 text-3xl font-bold">{users}</p>
            <div className="text-center ">
              <a href="/admin/users" className="r">
                View Details
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
