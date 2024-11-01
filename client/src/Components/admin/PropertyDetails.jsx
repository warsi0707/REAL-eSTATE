import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PropertyDetails() {
  const [data, setData] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { id } = useParams();
  const GetData = async () => {
    try{
        const response = await fetch(`http://localhost:3000/api/property/${id}`, {
            method: "GET",
            credentials: "include",
          });
          const result = await response.json();
      
          if (response.ok) {
            setData(result.property);
            setMessage(result.message);
          } else {
            setError(result.message);
          }
    }catch(err){
        setError(err.message)
    }
    
  };
  useEffect(() => {
    GetData();
  }, []);
  return (
    <>
      <div className="h-screen">
        <div className="card bg-gray-700  w-[700px] rounded-xl p-2 m-auto mt-10">
          <div className="flex justify-around mb-5">
            <h1>{data.title}</h1>
            <h1>{data.city}</h1>
          </div>
          <hr />
        </div>
      </div>
    </>
  );
}
