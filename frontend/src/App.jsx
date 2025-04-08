import Dashboard from "./pages/Dashboard"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import SellerSignup from "./seller/SellerSignup"
import SellerLogin from "./seller/SellerLogin"
import SellerDashboard from "./seller/SellerDashboard"
import AddProperty from "./seller/AddProperty"
import EditProperty from "./seller/EditProperty"
import PropertyDetails from "./pages/PropertyDetails"
import Navbar from "./components/Navbar"
import { useContext, useState } from "react"
import SellerContact from "./seller/SellerContact"
import Footer from "./components/Footer"
import AuthContext from "./context/authContext"


function App() {
  const [open, setOpen] = useState(false)
  const {isLogin} = useContext(AuthContext)
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Navbar open={open} onClose={()=> setOpen(true)}/> <Dashboard/><Footer/></> }/>
        <Route path="/property/:id" element={<><Navbar open={open} onClose={()=> setOpen(true)}/><PropertyDetails/><Footer/></> }/>
        <Route path="/seller/signup" element={<SellerSignup/>}/>
        <Route path="/seller/signin" element={isLogin?<SellerDashboard/>:<SellerLogin/>}/>
        <Route path="/seller/dashboard" element={ isLogin?<SellerDashboard/>:<SellerLogin/>}/>
        <Route path="/seller/add" element={<AddProperty/>}/>
        <Route path="/seller/:id" element={isLogin &&<EditProperty/>}/>
        <Route path="/seller/contact" element={isLogin?<SellerContact/>:<SellerLogin/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
