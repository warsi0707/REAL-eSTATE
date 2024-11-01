import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function DetailProperty() {
  const [property, setProperty] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { id } = useParams();
  const GetData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/property/${id}`, {
        method: "GET",
      });
      const result = await response.json();
      if (response.ok) {
        setProperty(result.property);
      }
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    GetData();
  }, []);
  return (
    <>
      <div className="main  text-white w-auto mx-32 h-96  my-10">
        <div className="img ">
          <img
            className="h-96 rounded-t-xl object-cover w-full"
            src={property.image}
            alt=""
          />
        </div>
        <div className="content">
          <h1>{property.title}</h1>
          <h1>{property.city}</h1>
          <h1>{property.description}</h1>
          <h1>{property.area}</h1>
          <h1>{property.beds}</h1>
          <h1>{property.contact}</h1>
        </div>
      </div>
    </>
  );
}
