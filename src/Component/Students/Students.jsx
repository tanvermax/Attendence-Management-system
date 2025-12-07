import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Students() {
  const [student, setStudent] = useState([]);
  const [classs, setClasss] = useState([]);

  // Fetch classes
  useEffect(() => {
    axios
      .get("http://localhost:5000/class")
      .then((res) => setClasss(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch students
  useEffect(() => {
    axios
      .get("http://localhost:5000/student")
      .then((res) => setStudent(res.data))
      .catch((err) => console.error(err));
  }, []);

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    sid: "",
    name: "",
    class: "",
  });

  // Handle input change
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  // Submit handler (Add / Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    if (!formData.sid || !formData.name || !formData.class) {
      toast.error("All fields are required!");
      return;
    }

    // ---------------- EDIT MODE ----------------
    if (editingId) {
      try {
        await axios.put(`http://localhost:5000/student/${editingId}`,
          formData
        );

        setStudent((prev) =>
          prev.map((s) => (s._id === editingId ? { ...s, ...formData } : s))
        );

        toast.success("Student updated successfully!");

        setEditingId(null);
        setFormOpen(false);
        setFormData({ sid: "", name: "", class: "" });
        return;
      } catch (error) {
        console.error(error);
        toast.error("Failed to update student");
      }
    }

    // ---------------- ADD MODE ----------------
    try {
      const res = await axios.post("http://localhost:5000/student", formData);

      setStudent((prev) => [...prev, res.data]);
      toast.success("Student added successfully!");

      setFormData({ sid: "", name: "", class: "" });
      setFormOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add student");
    }
  };

  // Set form data for edit
  const handleEdit = (s) => {
    setFormData({
      sid: s.sid,
      name: s.name,
      class: s.class,
    });

    setEditingId(s._id);
    setFormOpen(true);
  };

  // Delete student
  const handleDelete = async (id) => {
    if (!confirm("Are you sure to delete?")) return;

    try {
      await axios.delete(`http://localhost:5000/student/${id}`);

      setStudent((prev) => prev.filter((s) => s._id !== id));

      toast.success("Student deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete student");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Student List</h2>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        onClick={() => {
          setFormOpen(!formOpen);
          setEditingId(null);
          setFormData({ sid: "", name: "", class: "" });
        }}
      >
        {formOpen ? "Close Form" : "Add Student +"}
      </button>

      {/* FORM */}
      {formOpen && (
        <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded mb-6 space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              name="sid"
              placeholder="Student ID"
              value={formData.sid}
              onChange={handleInput}
              className="w-1/3 px-3 py-2 border rounded"
              required
            />

            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInput}
              className="w-1/3 px-3 py-2 border rounded"
              required
            />

            <div className="w-1/3">
              <select
                name="class"
                value={formData.class}
                onChange={handleInput}
                className="w-full px-2 py-2 border rounded"
                required
              >
                <option value="">Select Class</option>
                {classs.map((c, i) => (
                  <option
                    key={i}
                    value={`${c.subject} ${c.year} ${c.semester}`}
                  >
                    {`${c.subject} - Year ${c.year} - Sem ${c.semester}`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {editingId ? "Update Student" : "Add Student"}
          </button>
        </form>
      )}

      {/* TABLE */}
      <table className="w-full text-left border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2"></th>
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Class</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {student.map((stu, i) => (
            <tr key={stu._id} className="border-t hover:bg-gray-50">
              <td className="p-2">{i + 1}</td>
              <td className="p-2">{stu.sid}</td>
              <td className="p-2">{stu.name}</td>
              <td className="p-2">{stu.class}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => handleEdit(stu)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(stu._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {student.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center text-gray-500 p-4">
                No students available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
