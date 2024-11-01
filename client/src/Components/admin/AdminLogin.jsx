import React, { useContext, useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { AdminAuthContext } from "../hooks/AdminAuth";

export default function AdminLogin() {
  const { setIsAdmin } = useContext(AdminAuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const AdminLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/admin/signin", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (response.ok) {
        setIsAdmin(true);
        setEmail("");
        setPassword("");
        setError("");
        setMessage(result.message);
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setIsAdmin(false);
        navigate("/admin/login");
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
      <div className="h-screen ">
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

        <div className=" w-[500px] top-1/2 bg-gray-950  p-10 rounded-xl mx-auto flex flex-col gap-4 space-y-5 mt-5">
          <h1 className="text-3xl text-center">Admin Sigin </h1>
          <form onSubmit={AdminLogin} className="space-y-10">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="bordered"
              label="Email"
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="bordered"
              label="Password"
            />

            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-900 text-xl"
            >
              Signin
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
