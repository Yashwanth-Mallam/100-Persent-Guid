import React, { useState, useEffect } from "react";

import Sidebar from "./components/Sidebar/index";
import Navbar from "./components/Navbar/index";
import Card from "./components/CourCard/index"; // Updated import name to match "Card" component

import { getAllCourses } from "../../utils/api/courseApi"; 

import AddBtn from "../../components/Btn/add";

const Courses = () => {   
  const [courses, setCourses] = useState([]); // State to store all courses

  // Fetch courses from backend
  const fetchCourses = async () => {
    try {
      const response = await getAllCourses();
      console.log("Fetched courses from API:", response.data);  // Log the data after fetching
      setCourses(response.data);  // Set courses state
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // Run the fetchCourses function on component mount
  useEffect(() => {
    fetchCourses();
  }, []); // Empty dependency array ensures it runs only once on mount
  
  return (
    <div>
      {/* Navbar & Main Content */}
      <div className="p-[1rem]">
        <Navbar />
      </div>
      <div className="mt-3 grid h-full grid-cols-1 gap-1 xl:grid-cols-2 2xl:grid-cols-3">
        <Sidebar />
        {/* Main Content */}
        <div className="h-fit w-[80rem] xl:col-span-1 2xl:col-span-3  ml-[17rem] ">

          <div className="fixed ml-[95rem] mt-[44rem] z-50 ">
            <AddBtn />
          </div>
   
          {/* Courses */}
          <div className="mt-[2rem] ml-5">
            <h1 className="text-2xl text-navy-700 font-bold">
              Our Courses
            </h1>
            <div className="box-container grid grid-cols-4 gap-4 items-start justify-center mt-8">
              {courses.map((course) => (
                <Card key={course._id} id={course._id} /> // Pass `id` to `Card` component
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Courses;
