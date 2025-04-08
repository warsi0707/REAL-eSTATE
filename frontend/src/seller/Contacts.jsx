import { memo } from "react";

function Contacts({ name, message, phone, title, onclick }) {
  return (
    <div className="p-3 py-5 space-y-2 text-white rounded-md bg-slate-800 w-72">
      <div className="flex justify-end">
        <button onClick={onclick}>
          <i className="text-xl fa-solid fa-trash"></i>
        </button>
      </div>
      <h1 className="text-xl text-center">{title}</h1>
      <div className="flex gap-5">
        <h1 className="text-xl">Name:</h1>
        <p className="mt-1 font-thin">{name}</p>
      </div>
      <div className="flex gap-5">
        <h1 className="text-xl">Contact:</h1>
        <p className="mt-1 font-thin">{phone}</p>
      </div>
      <div className="flex gap-5">
        <h1 className="text-xl">Message:</h1>
        <p className="mt-1 font-thin">{message}</p>
      </div>
    </div>
  );
}
export default memo(Contacts);
