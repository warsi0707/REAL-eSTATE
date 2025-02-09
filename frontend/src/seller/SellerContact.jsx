import SellerNavbar from './SellerNavbar'
import Contacts from './Contacts'
import useSellerContacts from '../hooks/useSellerContacts'

export default function SellerContact() {
  const contacts = useSellerContacts()
  if(contacts.length == 0){
    return (
      <>
      <SellerNavbar/>
      <div className='flex items-center justify-center mx-auto mt-52'>
        <h1 className='mx-auto text-3xl'>No Contacts </h1>
      </div>
      </>
    )
  }
  return (
    <>
    <SellerNavbar/>
    <div className='mx-auto h-screen md:w-[1000px] my-5 space-y-5 mb-20'>
      <h1 className='mb-10 text-3xl'>User Contacts </h1>
      {contacts.map((item)=>(
        <div key={item._id}>
        <Contacts name={item.name} email={item.email} phone={item.phone}/>
      </div>
      ))}
    </div>
    </>
  )
}
