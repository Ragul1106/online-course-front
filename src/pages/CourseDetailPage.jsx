import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCourse, listInstructors } from "../api"; // listInstructors fetches all instructors

export default function CourseDetailPage() {
  const { pk } = useParams();
  const [course, setCourse] = useState(null);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: courseData }, { data: instructorsData }] = await Promise.all([
          getCourse(pk),
          listInstructors(),
        ]);
        setCourse(courseData);
        setInstructors(instructorsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [pk]);

  const getInstructorName = (id) => {
    const instructor = instructors.find((i) => i.id === id);
    return instructor ? instructor.name : "Unknown";
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!course) return <p className="text-center mt-10 text-red-500 font-semibold">Course not found.</p>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 bg-gradient-to-b from-purple-50 to-pink-50 rounded-xl shadow-lg">
      <h1 className="text-4xl font-extrabold text-purple-700 mb-4">{course.title}</h1>
      <p className="text-gray-700 mb-4">{course.description}</p>
      <p className="text-lg text-blue-600 mb-2">Instructor: {getInstructorName(course.instructor)}</p>
      <p className="text-lg text-indigo-600 mb-6">Total Lessons: {course.total_lessons}</p>
      <Link
        to="/courses"
        className="inline-block px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow hover:scale-105 transition-transform"
      >
        ← Back to Courses
      </Link>
    </div>
  );
}
