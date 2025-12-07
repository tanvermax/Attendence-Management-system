import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Faculty() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
  });

  const [faculty, setFaculty] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Edit State
  const [editId, setEditId] = useState(null);

  const fetchCourse = async () => {
    try {
      const response = await axios.get("http://localhost:5000/faculty");
      setFaculty(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Add new faculty
  const handleAddFaculty = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/faculty', formData);

      setFaculty(prev => [...prev, response.data]);
      toast.success('Faculty added successfully!');
      setFormData({ name: '', email: '', contact: '', address: '' });
      setIsFormVisible(false);

    } catch (error) {
      console.error('Error adding faculty:', error);
      toast.error('Failed to add faculty');
    }
  };

  // Delete faculty
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure?")) return;

    axios.delete(`http://localhost:5000/faculty/${id}`)
      .then(() => {
        toast.warning("Faculty deleted");
        setFaculty(faculty.filter(item => item._id !== id));
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to delete faculty");
      });
  };

  // OPEN EDIT FORM
  const handleEdit = (faculty) => {
    setEditId(faculty._id);
    setFormData({
      name: faculty.name,
      email: faculty.email,
      contact: faculty.contact,
      address: faculty.address,
    });

    setIsFormVisible(true);
  };

  // UPDATE(existing faculty)
  const handleUpdateFaculty = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5000/faculty/${editId}`,
        formData
      );
console.log(response)
      toast.success("Faculty updated successfully!");

      // Update UI instantly
      setFaculty(prev =>
        prev.map(item =>
          item._id === editId ?
            { ...item, ...formData } :
            item
        )
      );

      // Reset
      setEditId(null);
      setIsFormVisible(false);
      setFormData({ name: '', email: '', contact: '', address: '' });

    } catch (error) {
      console.error('Error updating faculty:', error);
      toast.error("Failed to update faculty");
    }
  };

  return (
    <div className='p-4'>
      <h2 className='text-xl font-semibold mb-4'>Faculty</h2>

      <button
        onClick={() => {
          setIsFormVisible(!isFormVisible);
          setEditId(null);
          setFormData({ name: '', email: '', contact: '', address: '' });
        }}
        className='mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
      >
        {isFormVisible ? 'Cancel' : 'Add New Faculty'}
      </button>

      {isFormVisible && (
        <form onSubmit={editId ? handleUpdateFaculty : handleAddFaculty} className='mb-6 space-y-4'>
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
            className={`${editId ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'} text-white px-4 py-2 rounded`}
          >
            {editId ? 'Update Faculty' : 'Submit'}
          </button>
        </form>
      )}

      <table className='w-full border text-left text-sm'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='border p-2'></th>
            <th className='border p-2'>#ID</th>
            <th className='border p-2'>Name</th>
            <th className='border p-2'>Email</th>
            <th className='border p-2'>Contact</th>
            <th className='border p-2'>Address</th>
            <th className='border p-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {faculty.map((person, index) => (
            <tr key={person._id}>
              <td className='border p-2'>{index + 1}</td>
              <td className='border p-2'>{index + 1001}</td>
              <td className='border p-2'>{person.name}</td>
              <td className='border p-2'>{person.email}</td>
              <td className='border p-2'>{person.contact}</td>
              <td className='border p-2'>{person.address}</td>
              <td className='border p-2 space-x-2'>
                <button
                  onClick={() => handleEdit(person)}
                  className='bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600'
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(person._id)}
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
