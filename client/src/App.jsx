import { BrowserRouter as Router,Route,Routes, Navigate, HashRouter } from 'react-router-dom'
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
import ErrorPage from './Components/navbar/ErrorPage'
import NotFound from './Components/navbar/NotFound'

function App() {
  const { isAdmin} = useContext(AdminAuthContext);
  const { isAuthenticated } = useContext(UserAuthConext)
  return (

    <>
    <HashRouter>
      <UserAuth>
        <Routes>
          <Route exact path='/'  element={<><Navbars/><Home/></> } />
          <Route path='/login' element={<><Navbars/><Login/></>}/>
          <Route path='/signup' element={<><Navbars/><Signup/></>}/>
          <Route path='/add' element={isAuthenticated?<> <Navbars/><AddProperty/> </>: <Navigate to="/login"/>}/>
          <Route path='/property' element={<><Navbars/><Properties/></>}/>
          <Route path='/property/:id' element={<><Navbars/><DetailProperty/></>} />
        </Routes>
      </UserAuth>
      
      <AdminAuth>
        <Routes>
          <Route  path='/dashboard' element={isAdmin?<><AdminNavbar/><Dashboard/></>: (<Navigate to="/admin/login"/>)}/>
          <Route path='/admin/login' element={!isAdmin?<> <AdminNavbar/><AdminLogin/> </>: <Navigate to="/dashboard" />} />
          <Route path='/admin/properties' element={<><AdminNavbar/><AdminProperties/></>}/>
          <Route path='/admin/properties/:id' element={<><AdminNavbar/><PropertyDetails/></>  }/>
          <Route path='/admin/users' element={<><AdminNavbar/><UsersDetails/></> }/>
          {/* <Route path='*' errorElement={<NotFound/>}/> */}
        </Routes>
      </AdminAuth> 
    
    </HashRouter>
    <Footer/>
     
    </>
  )
}

export default App
