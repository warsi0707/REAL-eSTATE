import SellerNavbar from "./SellerNavbar";
import Contacts from "./Contacts";
import { useCallback, useEffect, useState } from "react";
import { BackendUrl } from "../providers/Provider";
import toast from "react-hot-toast";

export default function SellerContact() {
  // const contacts = useSellerContacts()
  const [contacts, setContacts] = useState([]);
  const GetContacts = useCallback(async () => {
    const response = await fetch(`${BackendUrl}/user/contact`, {
      method: "GET",
      credentials: "include",
    });
    const result = await response.json();
    if (response.ok) {
      setContacts(result.contacts);
    } else {
      setContacts(null);
    }
  }, []);
  const DeleteContact = useCallback(async (id) => {
    try {
      const response = await fetch(`${BackendUrl}/user/contact/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
        GetContacts();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, []);
  useEffect(() => {
    GetContacts();
  }, []);
  if (contacts.length == 0) {
    return (
      <>
        <SellerNavbar />
        <div className="flex items-center justify-center mx-auto mt-52">
          <h1 className="mx-auto text-3xl">No Contacts </h1>
        </div>
      </>
    );
  }
  return (
    <>
      <SellerNavbar />
      <div className="h-full py-10">
        <div className="mx-auto h-full md:w-[1000px] flex flex-wrap my-5 gap-5 justify-center items-center sm:items-start sm:justify-start">
          {/* <h1 className='mb-10 text-3xl'>User Contacts </h1> */}
          {contacts.map((item) => (
            <div key={item._id}>
              <Contacts
                name={item.name}
                message={item.message}
                phone={item.phone}
                title={item.property.title}
                onclick={() => DeleteContact(item._id)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
