import { useState } from 'react'


import './App.css'
import { Outlet } from 'react-router'

function App() {
  const [count, setCount] = useState(0)

  return (
    
      <h1>
       <Outlet/>
      </h1>
    
  )
}

export default App
