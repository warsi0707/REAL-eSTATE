import SellerNavbar from "./SellerNavbar";
import { BackendUrl } from "../providers/Provider";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import PropertyInput from "../components/AddPropertyInput";
import toast from "react-hot-toast";

export default function AddProperty() {
  const titleRef = useRef();
  const locationRef = useRef();
  const cityRef = useRef();
  const priceRef = useRef();
  const bhkRef = useRef();
  const imageRef = useRef();
  const sizesRef = useRef();
  const areaRef = useRef();
  const navigate = useNavigate();

  const AddData = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const location = locationRef.current.value;
    const city = cityRef.current.value;
    const sizes = sizesRef.current.value;
    const price = priceRef.current.value;
    const bhk = bhkRef.current.value;
    const image = imageRef.current.value;
    const area = areaRef.current.value;

    const response = await fetch(`${BackendUrl}/user/property`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        location,
        city,
        sizes,
        price,
        bhk,
        image,
        area,
      }),
    });
    const result = await response.json();
    if (response.ok) {
      toast.success(result.message);
      setTimeout(() => {
        navigate("/seller/dashboard");
      }, 2000);
    } else {
      toast.error(result.message);
    }
  };
  return (
    <>
      <SellerNavbar />
      <div className="p-5 mx-auto mt-10 bg-gray-400 rounded-lg max-w-[700px] py-8">
        <div className=""></div>

        <form onSubmit={AddData} className="space-y-5">
          <div className="space-y-3">
            <PropertyInput
              refs={titleRef}
              label={"Title"}
              placeholder={"Title"}
              type={"text"}
            />
            <div className="flex justify-between ">
              <PropertyInput
                refs={locationRef}
                label={"Location"}
                placeholder={"Mumbai"}
                type={"text"}
              />
              <PropertyInput
                refs={cityRef}
                label={"City"}
                placeholder={"Thane"}
                type={"text"}
              />
              <PropertyInput
                refs={sizesRef}
                label={"City"}
                placeholder={"Thane"}
                type={"text"}
              />
            </div>
            <div className="flex gap-3">
              <PropertyInput
                refs={areaRef}
                label={"Area"}
                placeholder={"area"}
                type={"text"}
              />
              <PropertyInput
                refs={priceRef}
                label={"Price"}
                placeholder={"1256"}
                type={"number"}
              />
              <PropertyInput
                refs={bhkRef}
                label={"BHK"}
                placeholder={"2"}
                type={"number"}
              />
            </div>

            <PropertyInput
              refs={imageRef}
              label={"Image Link"}
              placeholder={""}
              type={"text"}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-10 text-center text-white transition-all duration-300 bg-blue-800 rounded-lg hover:bg-blue-700"
          >
            Publish
          </button>
        </form>
      </div>
    </>
  );
}
