import React from 'react'

export default function Contacts({name, email, phone}) {
  return (
    <div className='flex justify-between p-2 border-2 border-gray-400 rounded-md w-96 md:w-full'>
        <div className='flex gap-10 ml-5'>
          <h1 className='text-xl'>{name}</h1>
          <p className='text-xl text-gray-400'>{email}</p>
        </div>
        <div className='mr-10'>
          <h1>{phone}</h1>
        </div>
      </div>
  )
}
