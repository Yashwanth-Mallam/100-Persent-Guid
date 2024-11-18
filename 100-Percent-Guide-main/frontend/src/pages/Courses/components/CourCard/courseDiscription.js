import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCourseById } from "../../../../utils/api/courseApi";

const CourseDescription = () => {
  const { id } = useParams(); // Extract the course ID from the URL
  const [course, setCourse] = useState(null); // State to store course details
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await getCourseById(id);
        setCourse(response.data);
      } catch (error) {
        console.error("Error fetching course details:", error);
        setError("Error fetching course details");
      }
    };

    fetchCourseDetails();
  }, [id]);

  if (!course && !error) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="course-description p-8">
      <img
        src={course.coverImage}
        alt={course.courseTitle}
        className="w-full h-64 object-cover rounded-md"
      />
      <h1 className="text-3xl font-bold mt-4">{course.courseTitle}</h1>
      <p className="text-gray-500 text-sm mt-1">{course.category}</p>
      <p className="text-lg mt-4">{course.description}</p>
      
      <div className="flex items-center mt-6">
        <img
          src={course.tutor.avatar}
          alt={course.tutor.name}
          className="w-10 h-10 rounded-full mr-3"
        />
        <p className="text-md font-medium">By {course.tutor.name}</p>
      </div>

      <p className="text-sm text-gray-500 mt-2">
        Uploaded on {new Date(course.uploadedAt).toLocaleDateString()} by{" "}
        {course.uploadedBy}
      </p>
      
      {/* Display the course ID for debugging purposes */}
      <p className="text-sm text-gray-500 mt-4">Course ID: {course._id}</p>
    </div>
  );
};

export default CourseDescription;
