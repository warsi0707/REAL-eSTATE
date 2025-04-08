import { memo } from "react";
import useContacts from "../hooks/useContacts";
import ContactInput from "./ContactInput";

function Contact({ contactsOpen, onClose }) {
  const { nameRef, messageRef, phoneRef, Contacts } = useContacts();
  return (
    <div className="col-span-3 p-5 bg-white border h-72">
      <h1 className="mb-5 text-xl">Contact seller</h1>
      <div className="w-full space-y-2">
        <ContactInput refs={nameRef} type={"text"} placeholder={"John "} />
        <ContactInput
          refs={phoneRef}
          type={"number"}
          placeholder={"12456479"}
        />
        <ContactInput
          refs={messageRef}
          type={"text"}
          placeholder={"Hi there..."}
        />
        <button
          onClick={Contacts}
          className="w-full p-2 mt-5 text-white transition-all duration-300 bg-purple-500 rounded-md hover:bg-purple-400"
        >
          Contact
        </button>
      </div>
    </div>
  );
}

export default memo(Contact);
