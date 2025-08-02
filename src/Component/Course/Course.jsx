import React, { useEffect, useState } from 'react'
import CourseForm from './CourseForm'
import CourseList from './CourseList'
import axios from 'axios';

export default function Course() {

  const [courses, setCourses] = useState([]);


  const fethCourse = async ()=>{
    try {
    axios.get("http://localhost:5000/course")
      .then(response => {
        console.log(response.data);
        setCourses(response.data)
      })
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }

  useEffect(() => {
    fethCourse();
  }, []);

 const handleAddClass = (newClass) => {
    setCourses(prev => [...prev, newClass]);
  };


  return (
    <div className='flex justify-around p-5'>
        <CourseForm onAddClass={handleAddClass} setCourses={setCourses}/>
        <CourseList courses={courses} setCourses={setCourses}/>
    </div>
  )
}
