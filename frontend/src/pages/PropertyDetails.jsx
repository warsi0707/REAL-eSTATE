import { useEffect, useState } from "react";
import { BackendUrl } from "../providers/Provider";
import { useParams } from "react-router-dom";
import Overview from "../components/Overview";
import useContacts from "../hooks/useContacts";
import Message from "../components/Message";

export default function PropertyDetails() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const {
    name,
    email,
    phone,
    setEmail,
    setPhone,
    setName,
    Contacts,
    message,
    success,
  } = useContacts();
  const Property = async () => {
    const response = await fetch(`${BackendUrl}/property/${id}`, {
      method: "GET",
    });
    const result = await response.json();
    if (response.ok) {
      setData(result.ammenties);
    }
  };
  useEffect(() => {
    Property();
  }, []);

  return (
    <div className="max-w-[1000px] py-5 mx-auto mt-10 mb-10">
      <div className="flex justify-between">
        <div className="flex flex-col gap-1 titles">
          <h1 className="text-xl font-bold md:text-3xl">{data.title}</h1>
          <p className="text-gray-800 md:text-xl">By shakti reality</p>
        </div>
        <div>
          <h1 className="text-xl md:text-3xl ">{data.price} Lakhs</h1>
          <button className="flex font-bold text-white bg-purple-600 rounded-sm md:p-2 md:gap-2">
            <i className="mt-1 fa-solid fa-phone"></i>
            <p>Contact Developer</p>
          </button>
        </div>
      </div>
      <div>
        <img className="w-full my-5 rounded-lg h-96" src={data.image} alt="" />
      </div>
      <div className="flex flex-col grid-cols-10 gap-10 md:grid">
        <div className="col-span-7 bg-white ">
          <div className="p-5 text-xl border-b-2">
            <h1>Shakti Siyara Heights Overview</h1>
          </div>
          <div className="flex flex-wrap justify-center p-5 md:justify-between gap-7 ">
            <Overview
              icon={<i className="mt-2 text-xl fa-solid fa-chart-area"></i>}
              value={data.area}
            />
            <Overview
              title={"Project area"}
              icon={<i className="mt-2 text-xl fa-solid fa-chart-area"></i>}
              value={"1 acer"}
            />
            <Overview
              title={"Sizes"}
              icon={<i className="fa-solid fa-expand"></i>}
              value={`${data.sizes} sq.ft.`}
            />
            <Overview
              title={"Configuration"}
              icon={<i className="fa-solid fa-table-cells-large"></i>}
              value={`${data.bhk} bhk`}
            />
            <Overview
              title={"Price"}
              icon={<i className="fa-solid fa-tag"></i>}
              value={`${data.price} Lakhs`}
            />
            <Overview
              title={"Launch Date"}
              icon={<i className="fa-solid fa-calendar"></i>}
              value={"25, Jan"}
            />
            <Overview
              title={"Start Date"}
              icon={<i className="fa-solid fa-calendar-check"></i>}
            />
          </div>
        </div>

        <div className="col-span-3 p-5 bg-white border h-72">
          <h1 className="mb-5 text-xl">Contact seller</h1>
          <div className="w-full space-y-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border-b-2 rounded-md"
              type="text"
              placeholder="name"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border-b-2 rounded-md"
              type="email"
              placeholder="Email"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border-b-2 rounded-md"
              type="number"
              placeholder="Phone"
            />
            <button
              onClick={Contacts}
              className="w-full p-2 mt-5 text-white transition-all duration-300 bg-purple-500 rounded-md hover:bg-purple-400"
            >
              Contact
            </button>
            {message && <Message message={message} success={success} />}
          </div>
        </div>
      </div>
    </div>
  );
}
