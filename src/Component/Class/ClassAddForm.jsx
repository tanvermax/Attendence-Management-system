import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';

const ClassAddForm = () => {
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
      toast.success('Class added successfully!');
      reset();
    } catch (error) {
      console.error('Error adding class:', error);
      toast.error('Failed to add class');
    }
  };

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
          <input
            type="text"
            {...register('subject', { required: 'Subject is required' })}
            placeholder="e.g. CSE, BBA"
            className="w-full border text-xs border-gray-300 px-3 py-2 rounded"
          />
          {errors.subject && (
            <p className="text-red-500 text-sm">{errors.subject.message}</p>
          )}
        </div>

        {/* Year */}
        <div className="mb-4">
          <label className="block mb-1 text-xs font-medium">Year</label>
          <input
            type="text"
            {...register('year', { required: 'Year is required' })}
            placeholder="e.g. 1, 2, 3"
            className="w-full border text-xs border-gray-300 px-3 py-2 rounded"
          />
          {errors.year && (
            <p className="text-red-500 text-sm">{errors.year.message}</p>
          )}
        </div>

        {/* Semester */}
        <div className="mb-4">
          <label className="block mb-1 text-xs font-medium">Semester</label>
          <input
            type="text"
            {...register('semester', { required: 'Semester is required' })}
            placeholder="e.g. 1, 2"
            className="w-full border text-xs border-gray-300 px-3 py-2 rounded"
          />
          {errors.semester && (
            <p className="text-red-500 text-sm">{errors.semester.message}</p>
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
