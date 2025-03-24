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
import { useContext, useState } from "react"
import Login from "./pages/Login"
import SellerContact from "./seller/SellerContact"
import Footer from "./components/Footer"
import AuthContext from "./context/authContext"


function App() {
  const [open, setOpen] = useState(false)
  const {isAdminLogin} = useContext(AuthContext)
  return (
    <>
    <BrowserRouter>
    <Login open={open} setopen={setOpen}  />
      <Routes>
        <Route path="/" element={<><Navbar open={open} onClose={()=> setOpen(true)}/> <Dashboard/><Footer/></> }/>
        <Route path="/property/:id" element={<><Navbar open={open} onClose={()=> setOpen(true)}/><PropertyDetails/><Footer/></> }/>
        <Route path="/signup" element={<><Navbar open={open} onClose={()=> setOpen(true)}/><Signup/><Footer/></>}/>
        <Route path="/seller/signup" element={<SellerSignup/>}/>
        <Route path="/seller/signin" element={isAdminLogin?<SellerDashboard/>:<SellerLogin/>}/>
        <Route path="/seller/dashboard" element={ isAdminLogin?<SellerDashboard/>:<SellerLogin/>}/>
        <Route path="/seller/add" element={<AddProperty/>}/>
        <Route path="/seller/:id" element={isAdminLogin &&<EditProperty/>}/>
        <Route path="/seller/contact" element={isAdminLogin?<SellerContact/>:<SellerLogin/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
