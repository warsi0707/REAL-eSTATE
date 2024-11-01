import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function AdminProperties() {
  const [properties, setProperties] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const GetProperties = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/property", {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok) {
        setProperties(result.properties);
      }
    } catch (err) {
      setError(err);
    }
  };
  const DeleteProperty = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/property/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok) {
        setMessage(result.message);
        setTimeout(() => {
          setMessage("");
          navigate("/admin/properties");
        }, 2000);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    GetProperties();
  }, []);

  return (
    <>
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
      <div className="h-screen">
        <div className="bg-green-700 w-auto mx-10   mt-10 p-3">
          <h1 className="w-full flex justify-evenly text-2xl mb-2">
            <h1>title</h1>
            <h1>city</h1>
            <h1>area</h1>
            <h1>price</h1>
            <h1>beds</h1>
            <h1>action</h1>
          </h1>
          {properties.map((item) => (
            <div
              key={item._id}
              className="bg-gray-400 w-full p-2 rounded-md flex justify-evenly mb-2"
            >
              <h1>{item.title}</h1>
              <h1>{item.city}</h1>
              <h1>{item.area}</h1>
              <h1>{item.price}</h1>
              <h1>{item.beds}</h1>
              <div className="flex justify-end gap-5">
                <a
                  href={`properties/${item._id}`}
                  className="bg-green-600 p-2 rounded-lg text-xl text-black"
                >
                  Show
                </a>
                <button
                  onClick={() => DeleteProperty(item._id)}
                  className="bg-red-600 p-2 rounded-lg text-xl text-black"
                >
                  dlt
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
