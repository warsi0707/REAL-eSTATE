import React from 'react'
import { Link } from 'react-router-dom'

export default function Projects({title, price, location, city, configurations}) {
  return (
    <Link  className='flex h-48 my-10 transition-all duration-300 border-2 rounded-md w-80 hover:shadow-lg hover:cursor-pointer'>
        <img className='w-36 rounded-l-md' src="https://images.unsplash.com/photo-1459535653751-d571815e906b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D" alt="" />
        <div className='flex flex-col gap-3 p-2'>
            <div className='flex flex-col'>
                <h1 className='font-bold text-md'>Trident Tower Type</h1>
                <p className='text-gray-700'>By shri krishna </p>
            </div>
            <div>
                <h1 className='font-bold text-md'>1 bhk apartments</h1>
                <p>Badlapur </p>
            </div>
            <div>
                <h1 className='font-bold text-md'>32 L</h1>
            </div>
        </div>
    </Link>
  )
}
