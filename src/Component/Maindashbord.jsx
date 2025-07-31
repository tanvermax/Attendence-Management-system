import React from 'react'
import { IoMdHappy } from 'react-icons/io'

export default function Maindashbord() {
  return (
    <div className=' place-items-center  text-center p-10 border-b-[1px] border-gray-400 w-11/12 mx-auto'>
        <h1 className='flex items-center gap-3 md:text-3xl'>Welcome to Admin Dashbord <IoMdHappy className='text-blue-500'/></h1>
    </div>
  )
}
