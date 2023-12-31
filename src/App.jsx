import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from 'react-bootstrap/Button';
import CartsContextComponent from "./utils/CartsContextComponent"
import Cartss from "./components/Cartss"


import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return <>     
  <BrowserRouter>
       <Routes>
       <Route path="/Carts" element={<CartsContextComponent><Cartss /></CartsContextComponent>}/>
       <Route path="*" element={<Navigate to='/Carts'/>}/>
       </Routes>
       </BrowserRouter>
      
    </>
  
}

export default App
