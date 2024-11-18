import axios from 'axios';

//Fetch all courses

export const getAllCourses = () => {
    // Make sure the URL matches the backend route
    return axios.get('http://localhost:5000/');
};

//Fetch a specific course by ID

export const getCourseById = (courseId) => {
    return axios.get(`http://localhost:5000/${courseId}`);
};

//Create a new course

export const createCourse = (courseData) => {
    return axios.post('/api/courses',courseData);
};

//update an existing course 

export const updateCourse = (courseId,courseData) => {
    return axios.put(`/api/courses/${courseId}`,courseData);
};

//Delete a course

export const deleteCourse = (courseId) => {
    return axios.delete(`/api/courses/${courseId}`);
};