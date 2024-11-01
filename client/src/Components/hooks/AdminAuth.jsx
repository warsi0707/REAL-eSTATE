import React, { createContext, useEffect, useState } from "react";

export const AdminAuthContext = createContext();

export function AdminAuth({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const checkAdminAuth = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/admin/verify", {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok) {
        setIsAdmin(true);
        setName(result.username);
        setError("");
      } else {
        setIsAdmin(false);
        setError(result.message);
      }
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    checkAdminAuth();
  }, []);

  return (
    <AdminAuthContext.Provider value={{ isAdmin, setIsAdmin, error, name }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export default { AdminAuthContext };
