import { Link, useNavigate } from "react-router-dom";
import { BackendUrl } from "../providers/Provider";
import { memo, useCallback, useContext, useRef } from "react";
import toast from "react-hot-toast";
import AuthContext from "../context/authContext";
import UserAuthInput from "../components/UserAuthInput";
import UserAuthButton from "../components/UserAuthButton";

function SellerLogin() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const { setIsLogin } = useContext(AuthContext);

  const Signin = useCallback(async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const response = await fetch(`${BackendUrl}/user/signin`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const result = await response.json();
    if (response.ok) {
      setIsLogin(true);
      toast.success(result.message);
      setTimeout(() => {
        navigate("/seller/dashboard");
      }, 2000);
    } else {
      toast.error(result.message);
    }
  }, []);
  return (
    <div className="flex items-center justify-center w-screen h-screen opacity-90 bg-slate-600">
      <div className="relative p-5 py-5 bg-white opacity-100 w-96">
        <div className="mt-16 space-y-5">
          <h1 className="text-xl font-bold text-center">Seller Login</h1>
          <UserAuthInput
            refs={usernameRef}
            type={"text"}
            placeholder={"user@123"}
          />
          <UserAuthInput
            refs={passwordRef}
            type={"password"}
            placeholder={"password"}
          />

          <Link to={"/seller/signup"} className="underline">
            Create an acoount
          </Link>
          <UserAuthButton onclick={Signin} title={"Signin"} />
        </div>
      </div>
    </div>
  );
}

export default memo(SellerLogin);
