import  { useState } from 'react';

export default function Faculty() {
  const [faculties, setFaculties] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      contact: '01234567890',
      address: 'Dhaka, Bangladesh',
    },
    {
      id: 2,
      name: 'John Doe',
      email: 'john@example.com',
      contact: '01234567890',
      address: 'Dhaka, Bangladesh',
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
  });

  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddFaculty = (e) => {
    e.preventDefault();
    const newFaculty = {
      id: faculties.length + 1,
      ...formData,
    };
    setFaculties(prev => [...prev, newFaculty]);
    setFormData({ name: '', email: '', contact: '', address: '' });
    setIsFormVisible(false);
  };

  const handleDelete = (id) => {
    const updated = faculties.filter(faculty => faculty.id !== id);
    setFaculties(updated);
  };

  return (
    <div className='p-4'>
      <h2 className='text-xl font-semibold mb-4'>Faculty</h2>
      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className='mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
      >
        {isFormVisible ? 'Cancel' : 'Add New Faculty'}
      </button>

      {isFormVisible && (
        <form onSubmit={handleAddFaculty} className='mb-6 space-y-4'>
          <input
            type='text'
            name='name'
            placeholder='Name'
            value={formData.name}
            onChange={handleChange}
            className='block w-full border p-2 rounded'
            required
          />
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
            className='block w-full border p-2 rounded'
            required
          />
          <input
            type='text'
            name='contact'
            placeholder='Contact'
            value={formData.contact}
            onChange={handleChange}
            className='block w-full border p-2 rounded'
            required
          />
          <input
            type='text'
            name='address'
            placeholder='Address'
            value={formData.address}
            onChange={handleChange}
            className='block w-full border p-2 rounded'
            required
          />
          <button
            type='submit'
            className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
          >
            Submit
          </button>
        </form>
      )}

      <table className='w-full border text-left'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='border p-2'>ID</th>
            <th className='border p-2'>Name</th>
            <th className='border p-2'>Email</th>
            <th className='border p-2'>Contact</th>
            <th className='border p-2'>Address</th>
            <th className='border p-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {faculties.map((faculty) => (
            <tr key={faculty.id}>
              <td className='border p-2'>{faculty.id}</td>
              <td className='border p-2'>{faculty.name}</td>
              <td className='border p-2'>{faculty.email}</td>
              <td className='border p-2'>{faculty.contact}</td>
              <td className='border p-2'>{faculty.address}</td>
              <td className='border p-2 space-x-2'>
                <button className='bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600'>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(faculty.id)}
                  className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600'
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
