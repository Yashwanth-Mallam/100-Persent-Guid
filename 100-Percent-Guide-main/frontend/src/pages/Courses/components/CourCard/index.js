import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCourseById } from "../../../../utils/api/courseApi"; // Update API function to fetch course by ID

import "./css/card.css";

import { BsArrowUpRightCircle } from "react-icons/bs";

const Card = ({ id }) => { // Accept id as a prop
  const navigate = useNavigate();
  const [course, setCourse] = useState(null); // Store single course data

  // Fetch course by ID
  const fetchCourseById = async () => {
    try {
      const response = await getCourseById(id); // Call API with course ID
      setCourse(response.data); // Set course data
      console.log("Fetched course by id:", response.data);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCourseById(); // Fetch course data when id is available
    }
  }, [id]);

  const ProfileButtonClick = (event) => {
    event.preventDefault();
    navigate("/pro");
  };
  const handleCardClick = () => {
    navigate(`/courses/${id}`); // Navigate to the course description page
  };
  // If course data isn't available yet, show a loading message
  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="group box rounded-[1.5rem] h-[20rem] w-[16rem] bg-white p-3 transition-all duration-300 ease-in-out hover:cursor-pointer hover:shadow-md hover:border"
      onClick={handleCardClick}
    >
      {/* Course Image */}
      <img
        className="thumb w-full rounded-lg h-[8rem] object-cover"
        src={course.coverImage}
        alt={course.courseTitle}
      />
  
      {/* Tutor and Course Details */}
      <div className="tutor mt-3 flex items-center gap-4">
        {/* Tutor Avatar */}
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={course.tutor.avatar}
          alt={course.tutor.name}
          onClick={() => ProfileButtonClick(course._id)}
        />
  
        {/* Course Details */}
        <div className="details flex-1">
          <h3 className="title text-lg font-semibold capitalize truncate">
            {course.courseTitle}
          </h3>
          <h4 className="text-sm text-gray-600 truncate">{course.tutor.name}</h4>
          <span className="text-xs text-gray-500">
            {new Date(course.uploadedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
  
      {/* Additional Info */}
      <div className="flex justify-between items-center mt-4">
        {/* Video Count */}
        <div className="flex items-center gap-2">
          <lord-icon
            src="https://cdn.lordicon.com/xddtsyvc.json"
            trigger="hover"
            colors="primary:#121331"
            state="hover"
            style={{ width: '20px', height: '20px' }}
          />
          <h3 className="text-sm text-gray-700">41 Videos</h3>
        </div>
  
        {/* Navigate Icon */}
        <BsArrowUpRightCircle className="text-xl text-gray-700 cursor-pointer hover:text-gray-900" />
      </div>
  
      {/* Hover Action */}
      <div className="relative opacity-0 group-hover:opacity-100 bottom-[18rem] left-[13rem] transition-all duration-300">
        <lord-icon
          className="cursor-pointer"
          src="https://cdn.lordicon.com/gigfpovs.json"
          trigger="hover"
          style={{ width: '25px', height: '25px' }}
        />
      </div>
    </div>
  );
}
export default Card;
