import React from 'react'
import {BrowserRouter,Routes,Route, Router} from 'react-router-dom'
import Home from './component/Home'
import Register from './component/Register'
import Login from './component/Login'
import Forgot from './component/Forgot'
import Newpass from './component/Newpass'
import { useSelector } from 'react-redux'

const App = () => {
const {user} = useSelector((state)=>state.user)

  return (
    <div>
<BrowserRouter>
<Routes>
  <Route path='/home' element={user && user?<Home/>:<Login/>}></Route>
  <Route path='/' element={<Register/>}></Route>
  <Route path='/login' element={<Login/>}></Route>
  <Route path='/forgotpassword' element={<Forgot/>}></Route>
  <Route path='/newpass' element={<Newpass/>}></Route>
</Routes>
</BrowserRouter>
    </div>
  )
}

export default App