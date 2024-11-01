import React from "react";

export default function Footer() {
  return (
    <>
      <div className="footers bg-white p-5 items-center mt-10  w-full  text-black flex justify-evenly">
        <div className="">
          <h1 className="text-xl font-bold">Real estate</h1>
          <p>Address</p>
          <p>email id</p>
          <p>Mobile</p>
        </div>
        <div className="">
          <h1 className="text-xl font-bold">Company</h1>
          <p>About</p>
          <p>Contact </p>
          <p>Property</p>
        </div>
        <div className="">
          <h1 className="text-xl font-bold">More links</h1>
          <p>admin</p>
          <p>Homes</p>
        </div>
        <div className=""></div>
      </div>
    </>
  );
}
