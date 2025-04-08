import  { memo } from "react";
import { Link } from "react-router-dom";

 function Card({
  image,
  id,
  title,
  location,
  city,
  sizes,
  price,
  configurations,
}) {
  return (
    <Link to={`property/${id}`}>
      <div className="img">
        <img className="w-full h-48 rounded-t-xl" src={image} alt="" />
      </div>
      <div className="flex flex-col gap-3 p-4 pl-4 pb-7">
        <div>
          <h1 className="text-xl font-bold">{title}</h1>
          <p className="text-gray-700">by islan</p>
        </div>
        <div>
          <h1>{configurations} bhk Apartments</h1>
          <p className="text-gray-700">
            {location}
            {city}
          </p>
        </div>
        <div>
          <h1>
            <i className="fa-solid fa-indian-rupee-sign"> {price}</i>
          </h1>
        </div>
      </div>
    </Link>
  );
}
export default memo(Card)