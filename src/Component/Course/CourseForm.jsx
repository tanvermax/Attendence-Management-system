import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const CourseForm = ({setCourses}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Course Data:", data);

    axios.post("http://localhost:5000/course",data)
     .then(response => {
    console.log(response.data);

    setCourses(prev=>[...prev,response.data])
    toast.success("course data added successfully")
  })
  .catch(error => {
    console.error('Error fetching course:', error);
  });
    // You can send data to backend here
    reset();
  };

  const handlecancle=()=>{
    reset();

  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md mt-6">
      <h2 className="text-2xl font-semibold mb-4">Add Course</h2>
      <form onSubmit={handleSubmit(onSubmit)}>

        {/* Subject Field */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Subject</label>
          <input
            type="text"
            {...register('subject', { required: 'Subject is required' })}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            placeholder="Enter subject"
          />
          {errors.subject && <p className="text-red-500 text-sm">{errors.subject.message}</p>}
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            placeholder="Enter course description"
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

       <div className='flex justify-between'>
         <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
        <button
         onClick={handlecancle} type="button"
          className="bg-red-400 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Cancel
        </button>
       </div>

      </form>
    </div>
  );
};

export default CourseForm;
