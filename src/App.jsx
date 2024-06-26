import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import { createBrowserRouter } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'

const router=createBrowserRouter([
  {
    element:<AppLayout/>,
    children:[
      {
          path:'/',
          element:""
      }
    ]
  }
])

function App() {
 

  return (
    <>
      <Button variant="outline">Button</Button>

    </>
  )
}

export default App
