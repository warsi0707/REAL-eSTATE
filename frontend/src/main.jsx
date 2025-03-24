import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RecoilRoot } from "recoil";
import { Auth } from "./context/authContext.jsx";
import {Toaster} from 'react-hot-toast'
createRoot(document.getElementById("root")).render(
<div className="h-full bg-gray-100">
  <RecoilRoot>
      <Auth>
        <Toaster position="top-right"/>
          <App />
      </Auth>
  </RecoilRoot>
   </div>

);
