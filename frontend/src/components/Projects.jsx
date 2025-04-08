import { memo } from 'react'
import { Link } from 'react-router-dom'


 function Projects({title, price, location, city, bhk,id,image}) {
  return (
    <Link to={`/property/${id}`} className='flex h-48 my-10 transition-all duration-300 border-2 rounded-md w-80 hover:shadow-lg hover:cursor-pointer'>
        <img className='w-36 rounded-l-md' src={image} alt="" />
        <div className='flex flex-col gap-3 p-2'>
            <div className='flex flex-col'>
                <h1 className='font-bold text-md'>{title}</h1>
                <p className='text-gray-700'>By shri krishna </p>
            </div>
            <div>
                <h1 className='font-bold text-md'>{bhk} bhk apartments</h1>
                <p>{city} </p>
            </div>
            <div>
                <h1 className='font-bold text-md'>{price} L</h1>
            </div>
        </div>
    </Link>
  )
}
export default memo(Projects)