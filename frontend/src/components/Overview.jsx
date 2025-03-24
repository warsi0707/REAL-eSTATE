import  { memo } from "react";

 function Overview({icon, title,value}) {
  return (
    <div className="flex w-40 justify-evenly">
      <p>
        {icon}
      </p>
      <div>
        <p className="text-gray-400">{title}</p>
        <p>{value}</p>
      </div>
    </div>
  );
}

export default memo(Overview)