import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const Signup = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch("https://real-estate-be-5852.onrender.com/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name, mobile }),
      });
      const result = await response.json();
      if (response.ok) {
        setMessage(result.message);
        setEmail("");
        setPassword("");
        setName("");
        setMobile("");
        setError("");
        setTimeout(() => {
          navigate("/login");
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
      <div className=" w-[500px] bg-gray-950 p-10 rounded-xl mx-auto flex flex-col gap-4 space-y-5 mt-5">
        <h1 className="text-3xl text-center">Sigup </h1>
        <form onSubmit={Signup} className="space-y-10">
          <Input
            type="email"
            variant="bordered"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            variant="bordered"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="text"
            variant="bordered"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="number"
            variant="bordered"
            label="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <h1>
            Already have an account?{" "}
            <a href="" className="underline">
              Log In
            </a>
          </h1>
          <Button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-900 text-xl"
          >
            Create An Account
          </Button>
        </form>
      </div>
    </>
  );
}
