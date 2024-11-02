import { Button, Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const Signin = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch("https://real-estate-be-5852.onrender.com/api/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok) {
        setEmail("");
        setPassword("");
        setError("");
        setMessage(result.message);
        setTimeout(() => {
          setMessage("");
          navigate("/#");
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
      <div className="h-screen ">
        <div className=" w-[500px] top-1/2 bg-gray-950  p-10 rounded-xl mx-auto flex flex-col gap-4 space-y-5 mt-5">
          <h1 className="text-3xl text-center">Sigin </h1>
          <form onSubmit={Signin} className="space-y-10">
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

            <Button
              type="submit"
              className="w-full text-xl bg-indigo-600 hover:bg-indigo-900"
            >
              Signin
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
