import React, { useEffect, useState } from "react";
import {
  listCourses,
  createCourse,
  deleteCourse,
  updateCourse,
  listInstructors,
} from "../api";
import CourseList from "../components/CourseList";
import CourseForm from "../components/CourseForm";

export default function CoursePage() {
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructorId, setSelectedInstructorId] = useState("");
  const [showForm, setShowForm] = useState(false);

  const loadInstructors = async () => {
    const { data } = await listInstructors();
    setInstructors(data);
  };

  const loadCourses = async (instructorId) => {
    const { data } = await listCourses(instructorId || undefined);
    setCourses(data);
  };

  useEffect(() => {
    loadInstructors();
    loadCourses();
  }, []);

  const handleCreateCourse = async (payload) => {
    await createCourse(payload);
    await loadCourses(selectedInstructorId || undefined);
    setShowForm(false);
  };

  const handleUpdateCourse = async (id, payload) => {
    await updateCourse(id, payload);
    await loadCourses(selectedInstructorId || undefined);
  };

  const handleDeleteCourse = async (id) => {
    await deleteCourse(id);
    await loadCourses(selectedInstructorId || undefined);
  };

  const handleFilterByInstructor = async (e) => {
    const val = e.target.value;
    setSelectedInstructorId(val);
    await loadCourses(val ? val : undefined);
  };

  return (
    <div className=" mx-auto px-6 py-10 font-sans bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
    
      <h1 className="text-4xl font-extrabold text-purple-700 mb-8 text-center">
        🎓 Our Courses
      </h1>

      <div className="mb-6 flex flex-col md:flex-row items-center justify-center gap-4">
        <label className="font-medium text-gray-700 text-lg">Filter by Instructor:</label>
        <select
          value={selectedInstructorId}
          onChange={handleFilterByInstructor}
          className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none bg-white"
        >
          <option value="">All</option>
          {instructors.map((ins) => (
            <option key={ins.id} value={ins.id}>
              {ins.name} ({ins.email})
            </option>
          ))}
        </select>
      </div>

      {/* Add Course Button */}
      <div className="mb-6 text-center">
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          {showForm ? "Cancel" : "Add New Course"}
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          showForm ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {showForm && (
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-200 mb-8">
            <CourseForm instructors={instructors} onSubmit={handleCreateCourse} />
          </div>
        )}
      </div>

      <CourseList
        courses={courses}
        instructors={instructors}
        onUpdate={handleUpdateCourse}
        onDelete={handleDeleteCourse}
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
