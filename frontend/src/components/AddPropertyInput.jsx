import { memo } from "react"

 function AddPropertyInput({label,placeholder,type,refs}) {
  return (
    <div className="flex flex-col gap-2">
    <label htmlFor="" className="text-lg">{label}</label>
    <input ref={refs} className="w-full px-5 py-2 text-lg rounded-md" type={type} placeholder={placeholder}
    />
  </div>
  )
}
export default memo(AddPropertyInput)