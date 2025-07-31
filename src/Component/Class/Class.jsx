import React, { useState } from 'react'
import ClassAddForm from './ClassAddForm'
import ClassList from './ClassList'

export default function Class() {

    const [classes, setClasses] = useState([]);

  const handleAddClass = (newClass) => {
    setClasses(prev => [...prev, newClass]);
  };
  return (
    <div className='flex justify-around p-5'>
        <ClassAddForm onAddClass={handleAddClass}/>
        <ClassList classes={classes}/>
    </div>
  )
}
