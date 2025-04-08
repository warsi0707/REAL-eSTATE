import {Link} from 'react-router-dom'
import { memo,  } from 'react'

function Navbar({onClose}) {
  return (
    <>
     <div className='mx-auto bg-blue-500 max-w-[1300px] py-7 rounded-b-full px-10 flex justify-between sticky top-0'>
      <Link to={"/"} className="ml-8 w-28 sm:w-40"><img src="/housing.png" alt="" /></Link>
      <div className="gap-5 mr-10 text-xl text-white sm:flex">
      </div>
    </div>   
    </>
  )
}

export default memo(Navbar)