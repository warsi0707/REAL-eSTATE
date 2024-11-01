import React, { useEffect, useState } from "react";
import LoadingCard from "./LoadingCard";

export default function Properties() {
  const [properties, setProperty] = useState([]);
  const [loading, setLodading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const GetProperties = async () => {
    const response = await fetch("http://localhost:3000/api/property", {
      method: "GET",
    });
    const result = await response.json();
    setLodading(true);
    if (response.ok) {
      setMessage(result.message);
      setLodading(false);
      setError("");
      setProperty(result.properties);
    } else {
      setError(result.message);
    }
  };
  useEffect(() => {
    GetProperties();
  }, []);
  return (
    <>
      <div className="mb-10 my-10 h-full items-center">
        <h1 className="text-center text-3xl my-5 ">All Property</h1>
        {loading ? (
          <>
            {" "}
            <LoadingCard />
          </>
        ) : (
          <>
            <div className="w-full mx-auto gap-5 p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
              {properties.map((item) => (
                <a key={item._id} href={`/property/${item._id}`}>
                  <div className="card bg-gray-50 rounded-t-xl   w-80 mx-auto mb-10 text-black">
                    <div className="relative">
                      <img
                        className="h-52 object-cover w-full  rounded-t-xl"
                        src={item.image}
                        alt=""
                      />
                      <p className="absolute top-4 left-5 bg-gray-950 text-white px-2 rounded-md">
                        sale
                      </p>
                    </div>

                    <div className="p-5">
                      <div className="itmsts my-2">
                        <h1 className="font-bold text-gray-800">
                          {item.title}
                        </h1>
                        <h1 className="text-gray-400">{item.city}</h1>
                        <h className="text-3xl text-green-500">{item.price}</h>
                      </div>
                      <hr />
                      <div className="flex justify-start py-2 gap-10">
                        <div className="">
                          <h1 className="text-gray-950 text-xl">beds</h1>
                          <p className="text-gray-400">{item.beds}</p>
                        </div>
                        <div className="">
                          <h1 className="text-gray-950 text-xl">Bath</h1>
                          <p className="text-gray-400">asdf</p>
                        </div>
                        <div className="">
                          <h1 className="text-gray-950 text-xl">Area</h1>
                          <p className="text-gray-400">{item.area}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
