import React, { useEffect, useState } from 'react'
import SubjectFrom from './SubjectFrom'
import SubjectList from './SubjectList'
import axios from 'axios';

export default function Subject() {
  const [subject, setSubject] = useState([]);

  const fethCourse = async () => {
    try {
      axios.get("http://localhost:5000/subject")
        .then(response => {
          console.log(response.data);
          setSubject(response.data);

        })
    } catch (error) {
      console.error('Error fetching subject:', error);
    }
  }

  useEffect(() => {
    fethCourse();
  }, []);
  return (
    <div className='flex justify-around p-5'>
      <SubjectFrom setSubject={setSubject} />
      <SubjectList subject={subject} setSubject={setSubject} />
    </div>
  )
}
