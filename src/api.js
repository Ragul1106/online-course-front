import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false
});

export const listCourses = (instructorId) =>
  API.get('/courses/', { params: instructorId ? { instructor_id: instructorId } : {} });

export const createCourse = (payload) => API.post('/courses/', payload);
export const updateCourse = (id, payload) => API.put(`/courses/${id}/`, payload);
export const deleteCourse = (id) => API.delete(`/courses/${id}/`);

export const getCourse = (id) => API.get(`/courses/${id}/`);


export const listInstructors = () => API.get('/instructors/');
export const createInstructor = (payload) => API.post('/instructors/', payload);
