import React, { useEffect, useState } from "react";
import { listInstructors, createInstructor } from "../api";
import InstructorForm from "../components/InstructorForm";
import InstructorList from "../components/InstructorList";

export default function InstructorPage() {
  const [instructors, setInstructors] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const loadInstructors = async () => {
    try {
      const { data } = await listInstructors();
      setInstructors(Array.isArray(data) ? data : data.instructors || []);
    } catch (err) {
      console.error("Failed to load instructors:", err);
      setInstructors([]);
    }
  };

  useEffect(() => {
    loadInstructors();
  }, []);

  const handleCreateInstructor = async (payload) => {
    try {
      await createInstructor(payload);
      await loadInstructors();
      setShowForm(false);
    } catch (err) {
      console.error("Failed to create instructor:", err);
    }
  };

  return (
    <div className="mx-auto px-6 py-10 font-sans bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 min-h-screen">
      {/* Page Title */}
      <h1 className="text-4xl font-extrabold text-purple-700 mb-8 text-center">
        👨‍🏫 Our Instructors
      </h1>

      {/* Toggle Add Instructor Button */}
      <div className="mb-6 text-center">
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          {showForm ? "Cancel" : "Add Instructor"}
        </button>
      </div>

      {/* Animated Form */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          showForm ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {showForm && (
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-200 mb-8">
            <InstructorForm onSubmit={handleCreateInstructor} />
          </div>
        )}
      </div>

      {/* Instructor List */}
      <div className="space-y-4">
        {instructors.length === 0 ? (
          <p className="text-gray-500 italic text-center">No instructors available.</p>
        ) : (
          instructors.map((ins) => (
            <div
              key={ins.id}
              className="bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 hover:shadow-2xl rounded-2xl p-5 transition transform hover:-translate-y-1 flex justify-between items-center"
            >
              <div>
                <p className="font-medium text-gray-800">{ins.name}</p>
                <p className="text-sm text-gray-600">{ins.email}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
