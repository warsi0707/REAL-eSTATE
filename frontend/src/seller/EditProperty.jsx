import  { useEffect, useState } from "react";
import SellerNavbar from "./SellerNavbar";
import { useRecoilState } from "recoil";
import { messageAtom, successAtom } from "../atom/Atom";
import { useNavigate, useParams } from "react-router-dom";
import { BackendUrl } from "../providers/Provider";

export default function EditProperty() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState(0);
  const [bhk, setBhk] = useState(0);
  const [image, setImage] = useState("");
  const [date, setDate] = useState("");
  const [sizes, setSizes] = useState("");
  const [area, setArea] = useState("");
  const [message, setMessage] = useRecoilState(messageAtom);
  const [success, setSuccess] = useRecoilState(successAtom);
  const navigate = useNavigate();
  const { id } = useParams();

  const FetchData = async () => {
    const response = await fetch(`${BackendUrl}/admin/property/${id}`, {
      method: "GET",
      credentials: "include",
    });
    const result = await response.json();
    if (response.ok) {
      setTitle(result.properties.title);
      setLocation(result.properties.location);
      setCity(result.properties.city);
      setPrice(result.properties.price);
      setBhk(result.properties.bhk);
      setImage(result.properties.image);
      setSizes(result.properties.sizes);
      setArea(result.properties.area);
    } else {
      setMessage(result.message);
      setSuccess(false);
    }
  };
  useEffect(() => {
    FetchData();
  }, []);

  const EditData = async (e) => {
    e.preventDefault();
    const response = await fetch(`${BackendUrl}/admin/property/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        location,
        city,
        price,
        bhk,
        image,
        date,
        sizes,
        area,
      }),
    });
    const result = await response.json();
    if (response.ok) {
      setMessage(result.message);
      setSuccess(true);
      setTimeout(() => {
        setMessage("");
        navigate("/seller/dashboard");
      }, 2000);
    } else {
      setMessage(result.message);
      setSuccess(false);
    }
  };

  return (
    <>
      <SellerNavbar />
      <div className="p-5 mx-auto mt-10 bg-gray-400 rounded-lg max-w-[700px] py-8">
        <div className="">
          {message && <Message message={message} success={success} />}
        </div>

        <form onSubmit={EditData} className="space-y-5">
          <div className="space-y-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-lg">
                Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-5 py-2 text-lg rounded-md"
                type="text"
                placeholder="Title"
              />
            </div>
            <div className="flex justify-between ">
              <div>
                <label htmlFor="" className="text-lg">
                  Location
                </label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-5 py-2 text-lg rounded-md"
                  type="text"
                  placeholder="Location"
                />
              </div>
              <div>
                <label htmlFor="" className="text-lg">
                  City
                </label>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-5 py-2 text-lg rounded-md"
                  type="text"
                  placeholder="City"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <div>
                <label htmlFor="" className="text-lg">
                  Area
                </label>
                <input
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full px-5 py-2 text-lg rounded-md"
                  type="text"
                  placeholder="Area"
                />
              </div>
              <div>
                <label htmlFor="" className="text-lg">
                  Price
                </label>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-5 py-2 text-lg rounded-md"
                  type="number"
                  placeholder="Prise In Lakhs"
                />
              </div>
              <div>
                <label htmlFor="" className="text-lg">
                  {" "}
                  BHK
                </label>
                {/* <select  value={bhk} onChange={(e)=> setBhk(e.target.value)} className='w-full px-2 py-2 text-lg rounded-md cursor-pointer' name="bhk" id="bhk">
                      <option value='1' >1</option>
                      <option value='2' >2</option>
                      <option value='3'>3</option>
                  </select> */}
                <input
                  value={bhk}
                  onChange={(e) => setBhk(e.target.value)}
                  className="w-full px-5 py-2 text-lg rounded-md"
                  type="number"
                  placeholder="BHK"
                />
              </div>
              <div>
                <label htmlFor="" className="text-lg">
                  Start Date
                </label>
                <input
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-5 py-2 text-lg rounded-md"
                  type="date"
                  placeholder="BHK"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-10">
              <label htmlFor="" className="text-lg">
                Image link
              </label>
              <input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full px-5 py-2 text-lg rounded-md"
                type="text"
                placeholder="Image Link"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-10 text-center text-white transition-all duration-300 bg-blue-800 rounded-lg hover:bg-blue-700"
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
}
