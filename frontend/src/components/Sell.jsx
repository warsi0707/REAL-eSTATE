import React from 'react'
import { Link } from 'react-router-dom'

export default function Sell() {
  return (
    <div className='flex flex-col justify-center w-full gap-5 py-10 border border-purple-800 bg-purple-00 border- rounded-xl'>
        <h1 className='px-2 mx-auto text-xl'>List your property & connect with clients fatser!</h1>
        <Link to={"/seller/signin"} className='px-2 py-1 m-auto text-center transition-all duration-500 border border-purple-500 md:py-2 md:text-xl md:w-72 rounded-xl hover:bg-purple-600'>Sell your property</Link>
    </div>
  )
}
