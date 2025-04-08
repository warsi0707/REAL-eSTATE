import SellerNavbar from "./SellerNavbar";
import SellerCard from "./SellerCard";
import { BackendUrl } from "../providers/Provider";
import toast from "react-hot-toast";
import { memo, useCallback, useEffect, useState } from "react";

function SellerHome() {
  const [data, setData] = useState([]);

  const FetchData = useCallback(async () => {
    try {
      const response = await fetch(`${BackendUrl}/user/property`, {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok) {
        setData(result.properties);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, []);
  useEffect(() => {
    FetchData();
  }, []);

  const DeleteData = async (id) => {
    try {
      const response = await fetch(`${BackendUrl}/user/property/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
        FetchData();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  if (!data) {
    return (
      <div className="w-full h-screen">
        <SellerNavbar />
        <h1 className="mt-20 text-3xl font-bold text-center">Data Not found</h1>
      </div>
    );
  }
  return (
    <div className="w-full h-full">
      <SellerNavbar />
      <div className="h-full py-5">
        {data.map((item) => (
          <SellerCard
            key={item._id}
            title={item.title}
            price={item.price}
            location={item.location}
            image={item.image}
            id={item._id}
            onclick={() => DeleteData(item._id)}
          />
        ))}
      </div>
    </div>
  );
}
export default memo(SellerHome);
