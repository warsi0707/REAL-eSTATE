import { memo } from "react";

function UserAuthButton({ onclick,title }) {
  return (
    <button
      onClick={onclick}
      className="w-full py-2 text-xl text-white transition-all duration-300 bg-purple-500 rounded-md hover:cursor-pointer hover:bg-purple-800"
    >
      {title}
    </button>
  );
}
export default memo(UserAuthButton);
