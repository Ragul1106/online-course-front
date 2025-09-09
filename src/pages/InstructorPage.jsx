import React, { useEffect, useState } from "react";
import { listInstructors, createInstructor } from "../api";
import InstructorForm from "../components/InstructorForm";
import InstructorList from "../components/InstructorList";

export default function InstructorPage() {
  const [instructors, setInstructors] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const loadInstructors = async () => {
    const { data } = await listInstructors();
    setInstructors(data);
  };

  useEffect(() => {
    loadInstructors();
  }, []);

  const handleCreateInstructor = async (payload) => {
    await createInstructor(payload);
    await loadInstructors();
    setShowForm(false);
  };

  return (
    <div className=" mx-auto px-6 py-10 font-sans bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 min-h-screen">
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
      <InstructorList
        instructors={instructors}
        cardClassName="bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 hover:shadow-2xl rounded-2xl p-5 transition transform hover:-translate-y-1"
        buttonClasses={{
          edit: "bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md transition",
          delete: "bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition",
          see: "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition",
        }}
      />
    </div>
  );
}
