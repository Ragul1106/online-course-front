import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import HomePage from "./pages/HomePage";
import CoursePage from "./pages/CoursePage";
import InstructorPage from "./pages/InstructorPage";
import CourseDetailPage from "./pages/CourseDetailPage";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 fixed top-0 left-0 right-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo / Brand */}
          <div className="text-2xl font-bold text-white">
            🎓 CourseTracker
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-6">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `font-medium transition-colors duration-300 px-3 py-1 rounded-md ${
                  isActive ? "bg-white text-blue-600" : "text-white hover:bg-white hover:text-blue-600"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/instructors"
              className={({ isActive }) =>
                `font-medium transition-colors duration-300 px-3 py-1 rounded-md ${
                  isActive ? "bg-white text-purple-600" : "text-white hover:bg-white hover:text-purple-600"
                }`
              }
            >
              Instructors
            </NavLink>
            <NavLink
              to="/courses"
              className={({ isActive }) =>
                `font-medium transition-colors duration-300 px-3 py-1 rounded-md ${
                  isActive ? "bg-white text-pink-600" : "text-white hover:bg-white hover:text-pink-600"
                }`
              }
            >
              Courses
            </NavLink>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white hover:text-yellow-300 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 shadow-lg">
            <div className="flex flex-col px-6 py-4 space-y-3">
              <NavLink
                to="/"
                end
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block font-medium px-3 py-2 rounded-md transition-colors duration-300 ${
                    isActive ? "bg-white text-blue-600" : "text-white hover:bg-white hover:text-blue-600"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/instructors"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block font-medium px-3 py-2 rounded-md transition-colors duration-300 ${
                    isActive ? "bg-white text-purple-600" : "text-white hover:bg-white hover:text-purple-600"
                  }`
                }
              >
                Instructors
              </NavLink>
              <NavLink
                to="/courses"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block font-medium px-3 py-2 rounded-md transition-colors duration-300 ${
                    isActive ? "bg-white text-pink-600" : "text-white hover:bg-white hover:text-pink-600"
                  }`
                }
              >
                Courses
              </NavLink>
            </div>
          </div>
        )}
      </nav>

      {/* Page Content */}
      <div className="pt-24">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses/:pk" element={<CourseDetailPage />} />
          <Route path="/instructors" element={<InstructorPage />} />
          <Route path="/courses" element={<CoursePage />} />
        </Routes>
      </div>
    </Router>
  );
}
