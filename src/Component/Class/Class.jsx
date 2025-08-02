import React, { useEffect, useState } from 'react'
import ClassAddForm from './ClassAddForm'
import ClassList from './ClassList'
import axios from 'axios';

export default function Class() {

  const [classssss,setClass] = useState([]);

  const fethCourse = async () => {
    try {
      axios.get("http://localhost:5000/class")
        .then(response => {
          console.log(response.data);
          setClass(response.data);

        })
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }

  useEffect(() => {
    fethCourse();
  }, []);
  const handleAddClass = (newClass) => {
    setClass(prev => [...prev, newClass]);
  };
  return (
    <div className='flex justify-around p-5'>
        <ClassAddForm onAddClass={handleAddClass} setClass={setClass}/>
        <ClassList classes={classssss} setClass={setClass}/>
    </div>
  )
}
