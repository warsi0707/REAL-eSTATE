import { Link } from "react-router-dom";
import { BackendUrl } from "../providers/Provider";
import { useNavigate } from "react-router-dom";
import { useCallback, useRef } from "react";
import toast from "react-hot-toast";
import UserAuthInput from "../components/UserAuthInput";
import UserAuthButton from "../components/UserAuthButton";

export default function SellerSignup() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const backendUrl = BackendUrl;
  const navigate = useNavigate();

  const Signup = useCallback(async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const response = await fetch(`${backendUrl}/user/signup`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (response.ok) {
      toast.success(result.message);
      setTimeout(() => {
        navigate("/seller/signin");
      }, 3000);
    } else {
      toast.error(result.message);
    }
  }, []);
  return (
    <div>
      <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen gap-5 opacity-90 bg-slate-600">
        <div className="relative p-5 py-5 bg-white opacity-100 w-96">
          <div className="mt-16 space-y-5">
            <h1 className="text-xl font-bold text-center">Seller Signup</h1>
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
            <h1 className="flex my-3">
              <p>Already A User? </p>
              <Link
                to={"/seller/signin"}
                className="underline underline-offset-2"
              >
                Login
              </Link>
            </h1>
            <UserAuthButton onclick={Signup} title={"Signup"} />
          </div>
        </div>
      </div>
    </div>
  );
}
