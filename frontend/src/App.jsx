import { useState } from 'react'
import './App.css'
import Login from './pages/login/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Display from './pages/Display/Display'
import Newdisplay from './pages/Display/Newdisplay'
import Manage from './pages/ContentMange/Manage'


function App() {
  const [count, setCount] = useState(0)
  const [logged, isLogged] = useState(false)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login islogged={isLogged} />} />
          <Route path='/display' element={<Display />} />
          <Route path='/newdisplay' element={<Newdisplay />} />
          <Route path='/interface' element={logged ? <Manage /> : <Login islogged={isLogged} />} />
        </Routes>
      </BrowserRouter>
      {/* <Login /> */}
    </>
  )
}

export default App
