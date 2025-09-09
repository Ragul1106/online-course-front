import React, { useState } from 'react';

export default function CourseForm({ instructors, onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [instructor, setInstructor] = useState('');
  const [totalLessons, setTotalLessons] = useState(0);

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      description,
      instructor: instructor ? Number(instructor) : null,
      total_lessons: Number(totalLessons),
    };
    await onSubmit(payload);
    setTitle('');
    setDescription('');
    setInstructor('');
    setTotalLessons(0);
  };

  return (
    <form
      onSubmit={submit}
      className="bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50 shadow-lg rounded-3xl p-8 flex flex-col gap-5 max-w-xl mx-auto border border-pink-200"
    >
      <h2 className="text-2xl font-bold text-purple-700 mb-3 text-center">🎨 Add New Course</h2>

      <input
        placeholder="Course title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="px-4 py-3 border-2 border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none shadow-lg bg-white placeholder-purple-400 text-purple-700 transition duration-200"
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="px-4 py-3 border-2 border-pink-300 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none shadow-lg bg-white placeholder-pink-400 text-pink-700 transition duration-200"
      />

      <select
        value={instructor}
        onChange={(e) => setInstructor(e.target.value)}
        className="px-4 py-3 border-2 border-indigo-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none shadow-lg bg-white text-indigo-700 transition duration-200"
      >
        <option value="">Select instructor</option>
        {instructors.map((ins) => (
          <option key={ins.id} value={ins.id}>
            {ins.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        min="0"
        value={totalLessons}
        onChange={(e) => setTotalLessons(e.target.value)}
        className="px-4 py-3 border-2 border-green-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none shadow-lg bg-white placeholder-green-400 text-green-700 transition duration-200"
        placeholder="Total lessons"
      />

      <button
        type="submit"
        className="bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-200"
      >
        Add Course
      </button>
    </form>
  );
}
