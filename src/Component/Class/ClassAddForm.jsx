import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';

const ClassAddForm = ({ setClass }) => {

  const [data, setData] = useState([]);


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/class', data);
      console.log('Class added:', response.data);
      setClass(prev => [...prev, response.data]);

      toast.success('Class added successfully!');

      reset();
    } catch (error) {
      console.error('Error adding class:', error);
      toast.error('Failed to add class');
    }
  };

  const fethCourse = async () => {
    try {
      axios.get("http://localhost:5000/course")
        .then(response => {
          console.log(response.data);
          setData(response.data)
        })
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }

  useEffect(() => {
    fethCourse();
  }, []);

  const handleCancel = () => {
    reset();
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-6">
      <h2 className="text-xl font-semibold mb-4">Add Class</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Subject */}
        <div className="mb-4">
          <label className="block mb-1 text-xs font-medium">Subject</label>
          <select
            {...register('subject', { required: 'Subject is required' })}
            className="block w-full border p-2 rounded text-sm"
            defaultValue=""
          >
            <option disabled value="">Select a Course</option>
            {data.map((course, index) => (
              <option key={index} value={course.subject}>
                {course.subject}
              </option>
            ))}
          </select>
          {errors.subject && (
            <p className="text-red-500 text-sm">{errors.subject.message}</p>
          )}


        {/* Year */}

        </div>
        <div className="mb-4">
          <label className="block mb-1 text-xs font-medium">Year</label>
          <select
            {...register('year', { required: 'Year is required' })}
            className="block w-full border p-2 rounded text-sm"
            defaultValue=""
          >
            <option disabled value="">Select a Year</option>
             <option>1st Year</option>
             <option>2nd Year</option>
             <option>3rd Year</option>
             <option>4th Year</option>
              
              
          </select>
          {errors.subject && (
            <p className="text-red-500 text-sm">{errors.subject.message}</p>
          )}
        </div>

       

        {/* Semester */}
        <div className="mb-4">
          <label className="block mb-1 text-xs font-medium">Semester</label>
          <select
            {...register('semester', { required: 'Semester is required' })}
            className="block w-full border p-2 rounded text-sm"
            defaultValue=""
          >
            <option disabled value="">Select a Year</option>
             <option>1st Semester</option>
             <option>2nd Semester</option>
             <option>3rd Semester</option>
             <option>4th Semester</option>
             <option>5th Semester</option>
             <option>6th Semester</option>
             <option>7th Semester</option>
             <option>8th Semester</option>
              
              
          </select>
          {errors.subject && (
            <p className="text-red-500 text-sm">{errors.subject.message}</p>
          )}
        </div>
       

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-xs text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Class
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-red-400 text-xs text-white px-4 py-2 rounded hover:bg-red-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClassAddForm;
