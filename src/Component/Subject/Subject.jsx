import React from 'react'
import SubjectFrom from './SubjectFrom'
import SubjectList from './SubjectList'

export default function Subject() {
  return (
    <div className='flex justify-around p-5'>
        <SubjectFrom/>
        <SubjectList/>
    </div>
  )
}
