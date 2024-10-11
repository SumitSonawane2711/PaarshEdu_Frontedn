import { Card } from "@/components/ui/card";
import { useState } from "react";

// Dummy Data (simulating enrolled courses)
const enrolledCourses = [
  {
    id: 1,
    title: "React for Beginners",
    description: "Learn the basics of React with hands-on projects.",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    description: "Master JavaScript with in-depth concepts and exercises.",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "Node.js and Express",
    description: "Build backend applications using Node.js and Express.",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    title: "CSS and Flexbox",
    description: "Create beautiful layouts using modern CSS techniques.",
    imageUrl: "https://via.placeholder.com/150",
  },
];

const Courses = () => {
  const [courses] = useState(enrolledCourses);

  return (
    <div className="min-h-screen p-6 ">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">My Enrolled Courses</h1>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 rounded lg:grid-cols-3 gap-8 ">
        {courses.map((course) => (
          <Card
            key={course.id}
            className=" w-full sm:w-auto px-4 py-3 rounded-xl  hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
          >
            <img
              src={course.imageUrl}
              alt={course.title}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-2 dark:text-white">{course.title}</h2>
            <p className="text-gray-600 mb-4 dark:text-white">{course.description}</p>
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-500">
              View Course
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Courses;
