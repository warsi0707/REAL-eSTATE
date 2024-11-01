import React, { useState } from "react";
import { Input } from "@nextui-org/react";

export default function Home2() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLodading] = useState(true);
  const Search = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch(
        `https://real-estate-be-5852.onrender.com/api/property/search?query=${query}`,
        {
          method: "GET",
        }
      );
      const result = await response.json();
      setLodading(true);
      if (response.ok) {
        setQuery("");
        setMessage(result.message);
        setData(result.property);
        setLodading(false);
        setError("");
      } else {
        setError(result.message);
        setQuery("");
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
      <div className="w-auto rounded-2xl mx-auto   my-10 sm:w-[500px] md:w-full lg:w-[1000px] relative">
        <img
          src="/carosuel.png"
          alt=""
          className="object-fill  rounded-2xl w-full h-full "
        />
        <div className="absolute inset-0 top-10 md:top-20 ">
          <h1 className="text-2xl text-center font-bold text-gray-950 md:text-5xl">
            Bringing Homes & Hopes Together
          </h1>
          <div className="search text-center mt-2 md:mt-10">
            <form onSubmit={Search}>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-[200px] bg-slate-600 md:w-[500px] md:p-2 md:my-10 rounded-l-xl text-center text-lg md:text-2xl"
                type="text"
                placeholder="Type Here To Search"
              />
              <button
                type="submit"
                className=" bg-black md:p-2  rounded-r-xl text-lg md:text-2xl"
              >
                Search
              </button>
            </form>
          </div>
          {error && (
            <h1 className="text-center text-rose-600 font-bold text-3xl">
              {error}
            </h1>
          )}
        </div>
      </div>
      <div>
        {data ? (
          <>
            <h1 className="text-center text-3xl py-5">Search result</h1>
            <div className="md:w-full mx-auto p-5 grid  sm:grid-cols-1 lg:grid-cols-3 relative">
              {data.map((item) => (
                <div
                  key={item.id}
                  className="card bg-gray-50 rounded-t-xl   w-80 mx-auto mb-10 text-black"
                >
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
                      <h1 className="font-bold text-gray-800">{item.title}</h1>
                      <h1 className="text-gray-400">{item.city}</h1>
                      <h className="text-3xl text-green-500">{item.price}</h>
                    </div>
                    <hr />
                    <div className="flex justify-start py-2 gap-10">
                      <div className="">
                        <h1 className="text-gray-950 text-xl">Beds</h1>
                        <p className="text-gray-400">{item.beds}</p>
                      </div>
                      <div className="">
                        <h1 className="text-gray-950 text-xl">Bath</h1>
                        <p className="text-gray-400">124</p>
                      </div>
                      <div className="">
                        <h1 className="text-gray-950 text-xl">Area</h1>
                        <p className="text-gray-400">{item.area}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
