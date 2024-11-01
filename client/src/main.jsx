import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { NextUIProvider } from "@nextui-org/react";
import { UserAuth } from "./Components/hooks/UserAuth.jsx";
import {AdminAuth} from "./Components/hooks/AdminAuth.jsx";
// import ErrorBoundary from "./ErrorBoundry.jsx";
createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <NextUIProvider>
      <main className="dark text-foreground bg-background h-auto ">
        <>
        {/* <ErrorBoundary> */}
        <AdminAuth>
          <UserAuth>
            <App/>
          </UserAuth>
        </AdminAuth>
        {/* </ErrorBoundary> */}
        </>
      
      </main>
     
    </NextUIProvider>
  // </StrictMode>
);
