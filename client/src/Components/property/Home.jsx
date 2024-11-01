import { useEffect, useState } from "react";
import Home2 from "./Home2";
import Home3 from "./Home3";
import LoadingCard from "./LoadingCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLodading] = useState(true);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const GetData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/property/item");
      const result = await response.json();
      setLodading(true);
      if (response.ok) {
        setLodading(false);
        setPosts(result.properties);
      }
    } catch (err) {
      setError(err);
    }
  };
  useEffect(() => {
    GetData();
  }, []);
  return (
    <>
      <Home2 />
      {!loading ? (
        <>
          <div className="mb-10 my-10 h-full items-center">
            <h1 className="text-center text-3xl my-5 ">Latest Property</h1>
            <div className="md:w-full mx-auto p-5 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 relative">
              {posts.map((item) => (
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
              <div className="absolute bottom-2 right-32 ">
                <a
                  href="/property"
                  className="underline text-blue-700 text-2xl"
                >
                  More...
                </a>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <LoadingCard />
        </>
      )}
      <Home3 />
    </>
  );
}
