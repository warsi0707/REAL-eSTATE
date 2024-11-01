import { BrowserRouter as Router,Route,Routes, Navigate, replace } from 'react-router-dom'
// import './App.css'
import Home from './Components/property/Home'
import Navbars from './Components/navbar/Navbar'
import Login from './Components/forms/Login'
import Signup from './Components/forms/Signup'
import Footer from './Components/navbar/Footer'
import Properties from './Components/property/Properties'
import Dashboard from './Components/admin/Dashboard'
import AdminNavbar from './Components/admin/AdminNavbar'
import AddProperty from './Components/admin/AddProperty'
import { UserAuth } from './Components/hooks/UserAuth'
import AdminLogin from './Components/admin/AdminLogin'
import  { AdminAuth }  from './Components/hooks/AdminAuth'
import AdminProperties from './Components/admin/AdminProperties'
import PropertyDetails from './Components/admin/PropertyDetails'
import UsersDetails from './Components/admin/UsersDetails'
import { useContext } from 'react'
import { AdminAuthContext } from './Components/hooks/AdminAuth'
import DetailProperty from './Components/property/DetailProperty'
import { UserAuthConext } from './Components/hooks/UserAuth'

function App() {
  const { isAdmin} = useContext(AdminAuthContext);
  const { isAuthenticated } = useContext(UserAuthConext)
  return (

    <>
    <Router>
      <UserAuth>
        <Routes>
          <Route path='/' element={<><Navbars/><Home/></> } />
          <Route path='/login' element={<><Navbars/><Login/></>}/>
          <Route path='/signup' element={<><Navbars/><Signup/></>}/>
          <Route path='/add' element={isAuthenticated?<> <AdminNavbar/><AddProperty/> </>: <Navigate to="/login"/>}/>
          <Route path='/property' element={<><Navbars/><Properties/></>}/>
          <Route path='/property/:id' element={isAdmin?<><Navbars/><DetailProperty/></>:<Navigate to="/login"/>}/>
        </Routes>
      </UserAuth>
      
      <AdminAuth>
        <Routes>
          <Route path='/dashboard' element={isAdmin?<><AdminNavbar/><Dashboard/></>: (<Navigate to="/admin/login"/>)}/>
          <Route path='/admin/login' element={!isAdmin?<> <AdminNavbar/><AdminLogin/> </>: <Navigate to="/dashboard" replace/>} />
          <Route path='/admin/properties' element={<><AdminNavbar/><AdminProperties/></>}/>
          <Route path='/admin/properties/:id' element={<><AdminNavbar/><PropertyDetails/></>  }/>
          <Route path='/admin/users' element={<><AdminNavbar/><UsersDetails/></> }/>
        </Routes>
      </AdminAuth> 
    
    </Router>
    <Footer/>
     
    </>
  )
}

export default App
