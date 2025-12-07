import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function SubjectList({ subject, setSubject }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Editing State
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Filter subjects by search term
  const filteredSubjects = subject.filter((item) =>
    item.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Delete
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this subject?")) return;

    axios
      .delete(`http://localhost:5000/subject/${id}`)
      .then((response) => {
        if (response.data.message) {
          toast.warning(response.data.message);
        }

        setSubject(subject.filter((item) => item._id !== id));
      })
      .catch((err) => {
        console.error("Delete error:", err);
        toast.error("Failed to delete subject.");
      });
  };

  // Open edit modal
  const handleEdit = (item) => {
    setEditingId(item._id);
    setEditName(item.subject);
    setEditDescription(item.description || "");
  };

  // Save updated data
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/subject/${editingId}`, {
        subject: editName,
        description: editDescription,
      });

      toast.success("Subject updated successfully!");

      // update UI instantly
      setSubject((prev) =>
        prev.map((item) =>
          item._id === editingId
            ? { ...item, subject: editName, description: editDescription }
            : item
        )
      );

      setEditingId(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update subject");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-semibold mb-4">Subject List</h2>

      {/* Search Bar */}
      <form onSubmit={(e) => e.preventDefault()} className="flex mb-6">
        <input
          type="text"
          placeholder="Search subjects"
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

      {/* Subject Table */}
      <table className="w-full border-collapse table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left"></th>
            <th className="border px-4 py-2 text-left">Subject</th>
            <th className="border px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSubjects.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center py-4 text-gray-500">
                No subjects found.
              </td>
            </tr>
          ) : (
            filteredSubjects.map((item, index) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{index + 1}</td>

                <td className="border px-4 py-2">
                  <p>{item.subject}</p>
                  <p className="text-[10px] text-gray-500">{item.description}</p>
                </td>

                <td className="border px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
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
      {editingId && (
        <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center">

          <form
            onSubmit={handleUpdate}
            className="bg-white w-[400px] p-6 rounded shadow"
          >
            <h2 className="text-xl font-semibold mb-4">Edit Subject</h2>

            {/* Subject */}
            <label className="block text-sm font-medium mb-1">Subject</label>
            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="border w-full px-3 py-2 mb-3 rounded"
            />

            {/* Description */}
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="border w-full px-3 py-2 mb-4 rounded"
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingId(null)}
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
