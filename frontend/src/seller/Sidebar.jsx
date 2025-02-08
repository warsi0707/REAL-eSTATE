import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className='fixed h-screen bg-gray-300 max-w-96'>
      <h1 className='pb-3.5 my-10 text-2xl text-center text-black border-b-2 border-black'>Dashboard</h1>
      <div className='p-5 mt-10'>
        <button className='flex justify-center w-full gap-5 p-2 text-xl transition-all duration-300 rounded-md hover:bg-white'><i className="mt-1 fa-solid fa-plus"></i><p>Publish</p></button>
      </div>
      <div className='p-5 mt-10'>
        <Link to={"/seller/contact"} className='flex justify-center w-full gap-5 p-2 text-xl transition-all duration-300 rounded-md hover:bg-white'><i className="mt-1 fa-solid fa-plus"></i><p>Concatact</p></Link>
      </div>
      <div className='p-5 mt-32'>
        <button className='w-full p-2 text-xl text-center text-white bg-blue-400 rounded-md p2'>Logout</button>
      </div>
    </div>
  )
}
