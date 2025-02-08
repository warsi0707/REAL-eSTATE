import Dashboard from "./pages/Dashboard"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Signup from "./pages/Signup"
import SellerSignup from "./seller/SellerSignup"
import SellerLogin from "./seller/SellerLogin"
import SellerDashboard from "./seller/SellerDashboard"
import AddProperty from "./seller/AddProperty"
import EditProperty from "./seller/EditProperty"
import PropertyDetails from "./pages/PropertyDetails"
import Navbar from "./components/Navbar"
import { useState } from "react"
import Login from "./pages/Login"
import { useRecoilValue } from "recoil"
import { adminAuthenticatedAtom } from "./atom/Atom"
import SellerContact from "./seller/SellerContact"


function App() {
  const [open, setOpen] = useState(false)
  const isAdminLogin = useRecoilValue(adminAuthenticatedAtom)
  return (
    <>
    <BrowserRouter>
    {/* <Navbar open={open} onClose={()=> setOpen(true)} /> */}
    <Login open={open} onClose={()=> {setOpen(false)}}  />
    <Routes>
      <Route path="/" element={<><Navbar open={open} onClose={()=> setOpen(true)}/> <Dashboard/></> }/>
      <Route path="/property/:id" element={<><Navbar open={open} onClose={()=> setOpen(true)}/><PropertyDetails/></> }/>
      <Route path="/signup" element={<><Navbar open={open} onClose={()=> setOpen(true)}/><Signup/></>}/>

      <Route path="/seller/signup" element={<SellerSignup/>}/>
      <Route path="/seller/signin" element={isAdminLogin?<SellerDashboard/>: <SellerLogin/>}/>
      <Route path="/seller/dashboard" element={isAdminLogin? <SellerDashboard/>: <SellerLogin/>}/>
      <Route path="/seller/add" element={<AddProperty/>}/>
      <Route path="/seller/:id" element={isAdminLogin?<EditProperty/>:<SellerLogin/>}/>
      <Route path="/seller/contact" element={isAdminLogin?<SellerContact/>:<SellerLogin/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
