import Message from './Message'
import useContacts from '../hooks/useContacts'

export default function Contact({contactsOpen, onClose}) {
    const {name, email, phone, setEmail, setPhone, setName,Contacts, message, success} = useContacts()
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 rounded-md"
              type="text"
              placeholder="Name"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded-md"
              type="text"
              placeholder="Email"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
      {message && (
        <Message message={message} success={success}/>
      )}
    </div>
  </div>
  )
}
