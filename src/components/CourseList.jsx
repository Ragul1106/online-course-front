import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CourseList({ courses, instructors, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(null);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    instructor: "",
    total_lessons: 0,
  });

  const startEdit = (course) => {
    setEditing(course.id);
    setForm({
      title: course.title,
      description: course.description,
      instructor: course.instructor,
      total_lessons: course.total_lessons,
    });
  };

  const cancelEdit = () => {
    setEditing(null);
    setForm({ title: "", description: "", instructor: "", total_lessons: 0 });
  };

  const save = async (id) => {
    await onUpdate(id, {
      title: form.title,
      description: form.description,
      instructor: form.instructor,
      total_lessons: Number(form.total_lessons),
    });
    cancelEdit();
  };

  const getInstructorName = (id) => {
    const ins = instructors.find((i) => i.id === id);
    return ins ? ins.name : "Unknown";
  };

  return (
    <div className="space-y-6 mt-6">
      {courses.map((c) => (
        <div
          key={c.id}
          className="bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50 border-2 border-purple-200 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
        >
          {editing === c.id ? (
            <div className="flex flex-col gap-4">
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="px-4 py-2 border-2 border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none shadow-sm bg-white placeholder-purple-400 text-purple-700"
                placeholder="Course Title"
              />
              <input
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="px-4 py-2 border-2 border-pink-300 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none shadow-sm bg-white placeholder-pink-400 text-pink-700"
                placeholder="Description"
              />
              <select
                value={form.instructor}
                onChange={(e) => setForm({ ...form, instructor: Number(e.target.value) })}
                className="px-4 py-2 border-2 border-indigo-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none shadow-sm bg-white text-indigo-700"
              >
                <option value="">Select Instructor</option>
                {instructors.map((ins) => (
                  <option key={ins.id} value={ins.id}>
                    {ins.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                min="0"
                value={form.total_lessons}
                onChange={(e) => setForm({ ...form, total_lessons: e.target.value })}
                className="px-4 py-2 border-2 border-green-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none shadow-sm bg-white placeholder-green-400 text-green-700"
                placeholder="Total Lessons"
              />
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => save(c.id)}
                  className="bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-white px-5 py-2 rounded-xl shadow-md hover:scale-105 hover:shadow-xl transition-transform duration-200"
                >
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-xl transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <h3 className="text-xl font-bold text-purple-700">{c.title}</h3>
              <p className="text-gray-700">{c.description}</p>
              <p className="text-sm text-indigo-600">
                Instructor: <span className="font-medium">{getInstructorName(c.instructor)}</span>
              </p>
              <p className="text-sm text-green-700">Total Lessons: {c.total_lessons}</p>
              <div className="flex gap-3 mt-3 flex-wrap">
                <button
                  onClick={() => startEdit(c)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-xl shadow-md transition duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(c.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow-md transition duration-200"
                >
                  Delete
                </button>
                <button
                  onClick={() => navigate(`/courses/${c.id}`)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl shadow-md transition duration-200"
                >
                  See
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
