import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export default function AddProperty() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [price, setPrice] = useState("");
  const [beds, setBeds] = useState("");
  const [image, setImage] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const AddProperty = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch("https://real-estate-be-5852.onrender.com/api/property/add", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          location,
          city,
          area,
          price,
          beds,
          image,
          contact,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        setMessage(result.message);
        setError("");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setError(result.message);
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    } catch (err) {
      setError(err);
    }
  };
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
      <div className="w-[500px] mx-auto my-5">
        <h1 className="text-2xl text-center mb-5">Add Property</h1>
        <div className="w-full flex-wrap md:flex-nowrap gap-4 space-y-5">
          <form className="space-y-5" onSubmit={AddProperty}>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              label="Title"
            />
            <Input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              label="Location"
            />
            <Input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              label="City"
            />
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              label="Price"
            />
            <Input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              label="Area"
            />
            <Input
              type="text"
              value={beds}
              onChange={(e) => setBeds(e.target.value)}
              label="No of Beds"
            />
            <Input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              label="Contact"
            />
            <Input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              label="Image link"
            />
            <Textarea
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter your description"
              className=" mx-auto"
            />
            <button
              type="submit"
              className="bg-blue-700 w-full p-2 rounded-xl text-xl hover:bg-blue-500"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
