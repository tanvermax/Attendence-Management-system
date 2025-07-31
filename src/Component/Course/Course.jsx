import React from 'react'
import CourseForm from './CourseForm'
import CourseList from './CourseList'

export default function Course() {
  return (
    <div className='flex justify-around p-5'>
        <CourseForm/>
        <CourseList/>
    </div>
  )
}
