// App.jsx (TEMPORARY FOR DEBUGGING)
import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Customize from './pages/Customize'
import { userDataContext } from './context/UserContext'
import Home from './pages/Home'
import Customize2 from './pages/Customize2'

function App() {
  const {userData}=useContext(userDataContext) // userData is still needed for Home/Customize
  return (
   <Routes>
     {/* Home route still conditional */}
     <Route path='/' element={(userData?.assistantImage && userData?.assistantName)? <Home/> :<Navigate to={"/customize"}/>}/>

     {/* TEMPORARY: Render directly without !userData check for testing */}
     <Route path='/signup' element={<SignUp/>}/>
     <Route path='/signin' element={<SignIn/>}/>

     {/* Customize routes can remain conditional for now if user data is expected */}
     <Route path='/customize' element={userData?<Customize/>:<Navigate to={"/signup"}/>}/>
     <Route path='/customize2' element={userData?<Customize2/>:<Navigate to={"/signup"}/>}/>
   </Routes>
  )
}

export default App