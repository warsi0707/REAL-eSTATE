import React, { useState } from "react";

export default function useFetch(url) {
  const [data, setData] = useState();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  try {
    const FetchData = async () => {
      const response = await fetch(url);
      const result = await response.json();
      if (response.ok) {
        setData(result);
        setMessage(result.message);
        setError("");
      } else {
        setMessage(result.message);
        setError(err);
      }
    };
  } catch (err) {
    setError(err);
  }
  return <div></div>;
}
