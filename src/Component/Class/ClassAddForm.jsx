import React, { Component } from 'react';

export default class ClassAddForm extends Component {
  state = {
    subject: '',
    year: '',
    semester: '',
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { subject, year, semester } = this.state;

    if (!subject || !year || !semester) {
      alert('Please fill all fields');
      return;
    }

    // Pass new class data to parent (via props)
    if (this.props.onAddClass) {
      this.props.onAddClass({ 
        id: Date.now(), 
        subject, 
        year, 
        semester 
      });
    }

    this.setState({ subject: '', year: '', semester: '' });
  };

  render() {
    const { subject, year, semester } = this.state;

    return (
      <div className="w-xl mx-auto p-6 bg-white rounded shadow mt-6">
        <h2 className="text-xl font-semibold mb-4">Add Class</h2>
        <form onSubmit={this.handleSubmit}>

          <div className="mb-4">
            <label className="block mb-1 text-xs font-medium">Subject</label>
            <input
              type="text"
              name="subject"
              value={subject}
              onChange={this.handleChange}
              placeholder="e.g. CSE, BBA"
              className="w-full border text-xs border-gray-300 px-3 py-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-xs font-medium">Year</label>
            <input
              type="text"
              name="year"
              value={year}
              onChange={this.handleChange}
              placeholder="e.g. 1, 2, 3"
              className="w-full border text-xs border-gray-300 px-3 py-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-xs font-medium">Semester</label>
            <input
              type="text"
              name="semester"
              value={semester}
              onChange={this.handleChange}
              placeholder="e.g. 1, 2"
              className="w-full border text-xs border-gray-300 px-3 py-2 rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-xs text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Class
          </button>
        </form>
      </div>
    );
  }
}
