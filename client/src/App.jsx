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
          <Route path='/' element={<><Navbars/><Home/></> } errorElement={<ErrorPage/>} />
          <Route path='/login' element={<><Navbars/><Login/></>} errorElement={<ErrorPage/>}/>
          <Route path='/signup' element={<><Navbars/><Signup/></>} errorElement={<ErrorPage/>}/>
          <Route path='/add' element={isAuthenticated?<> <AdminNavbar/><AddProperty/> </>: <Navigate to="/login"/>} errorElement={<ErrorPage/>}/>
          <Route path='/property' element={<><Navbars/><Properties/></>} errorElement={<ErrorPage/>}/>
          <Route path='/property/:id' element={isAdmin?<><Navbars/><DetailProperty/></>:<Navigate to="/login"/>} errorElement={<ErrorPage/>}/>
        </Routes>
      </UserAuth>
      
      <AdminAuth>
        <Routes>
          <Route path='/dashboard' element={isAdmin?<><AdminNavbar/><Dashboard/></>: (<Navigate to="/admin/login"/>)} errorElement={<ErrorPage/>}/>
          <Route path='/admin/login' element={!isAdmin?<> <AdminNavbar/><AdminLogin/> </>: <Navigate to="/dashboard" replace/>} errorElement={<ErrorPage/>} />
          <Route path='/admin/properties' element={<><AdminNavbar/><AdminProperties/></>} errorElement={<ErrorPage/>}/>
          <Route path='/admin/properties/:id' element={<><AdminNavbar/><PropertyDetails/></>  } errorElement={<ErrorPage/>}/>
          <Route path='/admin/users' element={<><AdminNavbar/><UsersDetails/></> } errorElement={<ErrorPage/>}/>
          {/* <Route path='*' errorElement={<NotFound/>}/> */}
        </Routes>
      </AdminAuth> 
    
    </HashRouter>
    <Footer/>
     
    </>
  )
}

export default App
