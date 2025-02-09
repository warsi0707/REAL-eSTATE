import { Link } from 'react-router-dom'


export default function Projects({title, price, location, city, bhk,id}) {
  return (
    <Link to={`/property/${id}`} className='flex h-48 my-10 transition-all duration-300 border-2 rounded-md w-80 hover:shadow-lg hover:cursor-pointer'>
        <img className='w-36 rounded-l-md' src="https://images.unsplash.com/photo-1459535653751-d571815e906b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D" alt="" />
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
