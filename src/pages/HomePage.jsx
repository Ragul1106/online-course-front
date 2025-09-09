import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex flex-col justify-center items-center px-6 py-20 text-center">
      {/* Main Heading */}
      <h1 className="text-4xl md:text-6xl font-extrabold text-purple-700 mb-6">
        🎓 Welcome to <span className="text-pink-500">CourseTracker</span>
      </h1>

      {/* Subheading */}
      <p className="text-lg md:text-xl text-gray-700 mb-12">
        Manage your <span className="font-semibold text-purple-600">instructors</span> and{" "}
        <span className="font-semibold text-blue-600">courses</span> efficiently in one place.
      </p>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row justify-center gap-6">
        <Link
          to="/instructors"
          className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold shadow-lg hover:scale-105 transition-transform"
        >
          👨‍🏫 View Instructors
        </Link>
        <Link
          to="/courses"
          className="px-8 py-3 bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-full font-semibold shadow-lg hover:scale-105 transition-transform"
        >
          📚 View Courses
        </Link>
      </div>
    </div>
  );
}
