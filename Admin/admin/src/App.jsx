import React from 'react'
import SideBar from './Admin/components/SideBar'
import NavBar from './Admin/components/NavBar'
import Courses from './Admin/pages/courses'
import CourseDetail from './Admin/pages/CourseDetail'
import { Routes, Route } from 'react-router-dom'
function App() {
  return (
    <>
      <SideBar/>
      
    <div className="content">
    <NavBar/>
    <Routes>
    
    <Route path = "/" element = {<Courses/>}/>
      <Route path = "/course/:courseId" element = {<CourseDetail/>}/>
    </Routes>
    </div>
    </>
    
  )
}

export default App