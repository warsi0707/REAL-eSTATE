
import { memo } from 'react'
import useContacts from '../hooks/useContacts'

 function Contact({contactsOpen, onClose}) {
    const {nameRef, emailRef, phoneRef,Contacts} = useContacts()
  return (
    <div>
    <div className="fixed top-0 left-0 flex justify-center w-screen h-screen bg-slate-600 opacity-90"></div>
    <div className="fixed top-0 left-0 flex justify-center w-screen h-screen ">
      <div className="flex flex-col justify-center">
        <div className="relative p-5 py-5 bg-white opacity-100 w-96">
          <div className="flex justify-end">
            <div className="text-2xl hover:cursor-pointer">
              <i onClick={onClose} className="fa-solid fa-xmark"></i>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-3 ">
            <input
              ref={nameRef}
              className="p-2 rounded-md"
              type="text"
              placeholder="Name"
            />
            <input
              ref={emailRef}
              className="p-2 rounded-md"
              type="text"
              placeholder="Email"
            />
            <input
              ref={phoneRef}
              className="p-2 rounded-md"
              type="number"
              placeholder="Phone"
            />
            <button
              onClick={Contacts}
              className="p-2 text-xl text-white transition-all duration-300 rounded-md bg-sky-300 hover:cursor-pointer hover:bg-sky-400"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default memo(Contact)