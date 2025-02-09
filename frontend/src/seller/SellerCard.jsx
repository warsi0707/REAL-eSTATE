import React from 'react'
import { Link } from 'react-router-dom'
import { BackendUrl } from '../providers/Provider'
import { useRecoilState } from 'recoil'
import { messageAtom, successAtom } from '../atom/Atom'


export default function SellerCard({title, location, price, image, id, ondelete}) {
  const [message, setMessage] = useRecoilState(messageAtom)
  const [success, setSuccess] = useRecoilState(successAtom)
  const Delete =async()=>{
    const response = await fetch(`${BackendUrl}/admin/property/${id}`,{
      method :'DELETE',
      credentialsl: 'include'
    })
    const result = await response.json()
    if(response.ok){
      setMessage(result.message)
      setSuccess(true)
    }else{
      setMessage(result.message)
      setSuccess(false)
    }
  }
  return (
    <div className='flex gap-12 mx-auto mt-2 border-2 border-gray-200 rounded-md w-[800px]'>
    <div className='h-32 w-52'>
         <img className='object-cover w-full h-full rounded-l-md' src={image} alt="" />
    </div>
    <div className='flex justify-between w-full'>
        <div className="h-32 p-2 space-y-2">
            <h1 className='text-2xl'>{title}</h1>
            <p>{location}</p>
            <p>{price}</p>
        </div>
        <div className="p-2 text-2sxl">
          <div className='flex gap-2'>
          <Link to={`/seller/${id}`}><i className="fa-regular fa-pen-to-square"></i></Link>
          <button onClick={(id)=>ondelete(id)} className=''><i className="mt-1 fa-solid fa-trash"></i></button>
          </div>
        </div>
    </div>
 </div>
  )
}
