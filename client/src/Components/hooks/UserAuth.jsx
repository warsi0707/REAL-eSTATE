import React, { createContext, useContext, useEffect, useState } from "react";
export const UserAuthConext = createContext();

export function UserAuth({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const CheckAuth = async () => {
    try {
      const response = await fetch("https://real-estate-be-5852.onrender.com/api/user/verify", {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok) {
        setIsAuthenticated(true);
        setUserName(result.username);
        setError("");
      } else {
        setIsAuthenticated(false);
        setError(error.message);
        setUserName("");
      }
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    CheckAuth();
  }, []);

  return (
    <div>
      <UserAuthConext.Provider
        value={{ message, isAuthenticated, setIsAuthenticated, username }}
      >
        {children}
      </UserAuthConext.Provider>
    </div>
  );
}
export default { UserAuthConext };
