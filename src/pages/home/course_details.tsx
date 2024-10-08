import { useSelector } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { selectAllCourses } from "@/core/redux/slices/course_slice";
import { selectAllCategories } from "@/core/redux/slices/category_slice";

function CourseDetails() {
  const courses = useSelector(selectAllCourses);
  const categories = useSelector(selectAllCategories);
  const [activeTab, setActiveTab] = useState<'tab1' | 'tab2'>('tab1');

  const { id } = useParams<{ id: string }>();
  const courseId = Number(id);

  const course = courses.find((course) => course.id === courseId);
  const categoryname = categories?.find((category) => category.id === course?.categoryId);

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gray-900 h-64 sm:h-80 flex items-center justify-center">
        <div className="w-full sm:w-1/2 px-4 sm:px-10 text-center sm:text-left">
          <div className="inline-block border-b border-yellow-300 font-semibold bg-blue-950 rounded-full text-white px-4 py-2">
            {categoryname?.name}
          </div>
          <h1 className="text-white text-2xl sm:text-3xl font-bold mt-4">{course?.title}</h1>
        </div>
      </div>

      {/* Tab Section */}
      <div className="flex flex-col px-6 sm:px-20 py-10">
        <header className="bg-slate-300 flex items-center justify-center w-full rounded py-4 mb-6">
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setActiveTab('tab1')}
              className={`py-2 px-4 font-semibold rounded-lg transition-colors duration-300 ${
                activeTab === 'tab1' ? 'underline text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('tab2')}
              className={`py-2 px-4 font-semibold rounded-lg transition-colors duration-300 ${
                activeTab === 'tab2' ? 'underline text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Syllabus
            </button>
          </div>
        </header>

        {/* Content Section */}
        <main className="flex-1 bg-white p-4 sm:p-8 rounded-lg shadow-lg transition-all duration-500 ease-in-out">
          {activeTab === 'tab1' ? (
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold">{course?.description}</h2>
              <div className="text-justify py-6 text-gray-700 leading-relaxed">{parse(course?.longdescription || "")}</div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold">Syllabus</h2>
              <ul className="list-disc list-inside py-4 text-gray-700 leading-relaxed">
                {/* Example Syllabus Content */}
                <li>Introduction to the course</li>
                <li>Core concepts and fundamentals</li>
                <li>Practical applications</li>
                <li>Assessments and final project</li>
              </ul>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default CourseDetails;
