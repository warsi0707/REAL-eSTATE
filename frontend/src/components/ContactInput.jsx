import { memo } from "react"

 function ContactInput({refs,type,placeholder}) {
  return (
    <input ref={refs}className="w-full p-2 border-b-2 rounded-md " type={type} placeholder={placeholder}/>
  )
}
export default memo(ContactInput)