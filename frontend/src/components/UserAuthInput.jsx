import { memo } from 'react'

 function UserAuthInput({refs,type, placeholder}) {
  return (
    <input ref={refs} className='w-full px-5 py-2 text-xl border border-gray-400 rounded-md' type={type} placeholder={placeholder} />
  )
}
export default memo(UserAuthInput)