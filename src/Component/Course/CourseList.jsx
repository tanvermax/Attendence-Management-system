import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CourseList({ courses, setCourses }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCourse, setEditingCourse] = useState(null);
  const [editSubject, setEditSubject] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Filter courses based on searchTerm
  const filteredCourses = courses.filter((course) =>
    course.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      axios.delete(`http://localhost:5000/course/${id}`).then((response) => {
        if (response.data.message) {
          toast.warning(response.data.message);
        }
        setCourses(courses.filter((course) => course._id !== id));
      });
    }
  };

  // Open modal with selected course
  const handleEdit = ({ _id, subject, description }) => {
    setEditingCourse(_id);
    setEditSubject(subject);
    setEditDescription(description);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:5000/course/${editingCourse}`,
        {
          subject: editSubject,
          description: editDescription,
        }
      );
      console.log(res)
      toast.success("Course updated successfully!");

      // update UI instantly
      setCourses((prev) =>
        prev.map((item) =>
          item._id === editingCourse
            ? { ...item, subject: editSubject, description: editDescription }
            : item
        )
      );

      setEditingCourse(null);
    } catch (err) {
      toast.error("Update failed!", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-semibold mb-4">Course List</h2>

      {/* Search Bar */}
      <form onSubmit={(e) => e.preventDefault()} className="flex mb-6">
        <input
          type="text"
          placeholder="Search by subject"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 rounded-r hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {/* Courses Table */}
      <table className="w-full border-collapse table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left"></th>
            <th className="border px-4 py-2 text-left">Subject</th>
            <th className="border px-4 py-2 text-left">Description</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No courses found.
              </td>
            </tr>
          ) : (
            filteredCourses.map(({ _id, subject, description }, index) => (
              <tr key={_id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{subject}</td>
                <td className="border px-4 py-2">{description}</td>
                <td className="border px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() =>
                      handleEdit({ _id, subject, description })
                    }
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(_id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* EDIT MODAL */}
      {editingCourse && (
        <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center">

          <form
            onSubmit={handleUpdate}
            className="bg-white w-[400px] p-6 rounded shadow"
          >
            <h2 className="text-xl font-semibold mb-4">Edit Course</h2>

            <label className="block text-sm font-medium mb-1">Subject</label>
            <input
              value={editSubject}
              onChange={(e) => setEditSubject(e.target.value)}
              className="border w-full px-3 py-2 mb-3 rounded"
            />

            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="border w-full px-3 py-2 mb-3 rounded"
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingCourse(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
