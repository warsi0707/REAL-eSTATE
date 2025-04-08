import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className='flex flex-col items-center w-full gap-5 py-20 mx-auto text-gray-300 bg-black md:flex-row md:justify-evenly'>
      <div>
        <h1 className='text-3xl font-bold'>Housing.com</h1>
      </div>
      <div className='flex gap-5'>
        <Link to={"/"}>Home</Link>
        <Link to={"/seller/signin"}>Seller</Link>
      </div>
    </div>
  )
}
