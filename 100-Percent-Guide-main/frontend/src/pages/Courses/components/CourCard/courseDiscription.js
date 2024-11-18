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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-black">
              Course Description
            </h1>
          </div>
          <hr className="border-t-3 my-4 border-[#333]" />

          <img
            src={course.coverImage}
            alt={course.courseTitle}
            className="w-[100px] h-[100px] object-cover rounded-full"
          />
          <h1 className="text-3xl font-semibold mt-4">{course.courseTitle}</h1>
          <p className="text-gray-500 text-sm mt-1">{course.category}</p>
          <hr className="border-t-4 my-4 border-black" />
          <h2>Description:</h2>
          <ul>
            <li>
              <p className="text-lg mt-4 text-gray-700">{course.description}</p>
            </li>
          </ul>
          <h2 className="my-2"> tutor info:</h2>
          <div className="flex items-center mt-6">
            <img
              src={course.tutor.avatar}
              alt={course.tutor.name}
              className="w-12 h-12 rounded-full mr-3"
            />
            <p className="text-md mx-4 font-medium">By {course.tutor.name}</p>
          </div>
          <div>
  <h2 className="my-2">Course Videos</h2>
  <div className="flex flex-col mt-4 items-center">
    <iframe
      width="800"
      height="400"
      src="https://www.youtube.com/embed/QXeEoD0pB3E?list=PLsyeobzWxl7poL9JTVyndKe62ieoN-MZ3"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Python Tutorial"
    ></iframe>
  </div>
</div>

          <p className="text-sm text-gray-500 mt-2 text-right">
            Uploaded on {new Date(course.uploadedAt).toLocaleDateString()} by{" "}
            {course.uploadedBy}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseDescription;
