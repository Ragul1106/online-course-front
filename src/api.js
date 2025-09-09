import axios from 'axios';


// Use environment variable for base URL
const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // <-- points to Render backend
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
});

// Courses APIs
export const listCourses = (instructorId) =>
  API.get('/courses/', { params: instructorId ? { instructor_id: instructorId } : {} });

export const createCourse = (payload) => API.post('/courses/', payload);
export const updateCourse = (id, payload) => API.put(`/courses/${id}/`, payload);
export const deleteCourse = (id) => API.delete(`/courses/${id}/`);
export const getCourse = (id) => API.get(`/courses/${id}/`);

// Instructors APIs
export const listInstructors = () => API.get('/instructors/');
export const createInstructor = (payload) => API.post('/instructors/', payload);
