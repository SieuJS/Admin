import React from 'react'
import SideBar from './Admin/components/SideBar'
import Courses from './Admin/pages/courses'
import { Routes, Route } from 'react-router-dom'
function App() {
  return (
    <>
      <SideBar/>
    <Routes>
      <Route path = "/courses" element = {<Courses/>}/>
    </Routes>
    </>
    
  )
}

export default App