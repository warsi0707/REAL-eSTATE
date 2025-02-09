import useOneData from "../hooks/useOneData";

export default function HousingPick({ onClose }) {
  const oneData = useOneData();
  return (
    <>
      {oneData.map((item) => (
        <div
          key={item._id}
          className="flex flex-col-reverse w-auto h-auto mx-auto my-10 bg-red-100 md:h-96 rounded-xl md:flex-row"
        >
          <div className=" conte w-[400px] h-full flex flex-col p-2 md:pl-8 justify-start md:justify-center gap-4 md:gap-8 py-5 ">
            <div className="flex flex-col gap-2 headings">
              <h1 className="text-lg font-bold md:text-2xl">{item.title}</h1>
              <p className="text-gray-700 md:text-xl">{item.location}</p>
            </div>
            <div className="prices">
              <h1 className="text-lg font-bold md:text-2xl">{item.price} L</h1>
              <p className="text-gray-700 md:text-lg">1, 2 BHK Apartments</p>
            </div>
            <button
              onClick={onClose}
              className="flex justify-center w-32 py-2 text-white transition-all duration-300 bg-purple-800 md:text-xl md:mx-auto md:pl-0 md:w-72 rounded-xl hover:cursor-pointer hover:bg-purple-600"
            >
              Contact
            </button>
          </div>
          <div className="image ">
            <img
              className="w-[700px] h-full col-span-9 rounded-t-xl md:rounded-t-none md:rounded-tr-xl md:rounded-br-xl"
              src={item.image}
              alt=""
            />
          </div>
        </div>
      ))}
    </>
  );
}
