import { memo } from "react"

 function Search() {
  return (
    <>
    <div className="flex justify-center mt-10">
        <img className="w-[1300px] h-[450px] rounded-t-3xl absolute " src="/starter.png" alt="" />
        <div className='relative flex flex-col top-24'>
            <div className='flex flex-col items-center gap-5'>
                <h1 className='text-2xl font-semibold text-white sm:text-5xl'>Property in your city</h1>
                <p className='items-center mb-2 text-center text-white'>8K+ listings added daily and 97K+ total verified</p>
            </div>
            <div className="bg-blue-800  sm:w-[500px] py-2 rounded-t-2xl rounded-b-lg">
                <div className="flex justify-center translate-y-7">
                <h1 className="flex items-center justify-center py-2 text-xl bg-white border-r-2 rounded-l-full px-7">City</h1>
                    <input className='py-1 px-5 text-lg sm:py-3 border-none  sm:w-72 md:w-[500px]' type="text"  />
                    <button className='bg-white border-none rounded-r-full sm:px-5 sm:py-3'><p className='px-1 py-2 text-white transition-all duration-300 bg-green-400 sm:text-xl rounded-3xl sm:px-7 hover:bg-green-500'>Search</p></button>
                </div>

            </div>
        
        </div>
    </div>
    </>
    
  )
}

export default memo(Search)