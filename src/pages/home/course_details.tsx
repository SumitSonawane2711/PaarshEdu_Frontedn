import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { fetchCourses, selectAllCourses, selectCoursesError, selectCoursesStatus } from "@/core/redux/slices/course_slice";
import { getAllCategories, selectAllCategories } from "@/core/redux/slices/category_slice";
import { AppDispatch } from "@/core/redux/store";
import { Card } from "@/components/ui/card";
import Container from "@/components/templates/Container";
import { CarouselSize } from "@/components/molecules/carousel";
import { Button } from "@/components/ui/button";

function CourseDetails() {
  const courses = useSelector(selectAllCourses);
  const categories = useSelector(selectAllCategories);
  const [activeTab, setActiveTab] = useState<'tab1' | 'tab2'>('tab1');
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const courseId = Number(id);
  const courseStatus = useSelector(selectCoursesStatus);
  const courseError = useSelector(selectCoursesError);


  useEffect(() => {
    dispatch(fetchCourses())
    dispatch(getAllCategories())
  }, [dispatch])

  const course = courses.find((course) => course.id === courseId);
  const categoryname = categories?.find((category) => category.id === course?.categoryId);
  const courseCardRef = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useState(false);


  const popularCourses = useMemo(
    () => courses
      .filter(course => course.price > 200)
      .map(course => ({
        id: course.id,
        description: course.description,
        name: course.title || "Data Analyst Master Course",
        href: `/product-detail/${course.id}`,
        imageSrc: course.imageUrl || "https://learn.g2.com/hs-fs/hubfs/Screen%20Shot%202020-01-24%20at%208.01.03%20AM.png",
        discountPrice: course.price,
        originalPrice: 1000,
      })),
    [courses]
  );

  const handleScroll = () => {
    if (courseCardRef.current) {
      const sticky = courseCardRef.current.offsetTop;
      setIsFixed(window.pageYOffset > sticky);
    }
  };

  useEffect(()=>{
    window.addEventListener("scroll", handleScroll);
    handleScroll()
    return window.addEventListener("scroll", handleScroll);

  })
    
  return (
    <>
      {/* Hero Section */}
      <div className="relative">
        <div className="bg-gray-900 h-64 sm:h-80 flex items-center justify-center ">
          <div className="w-full sm:w-1/2 px-4 sm:px-10 text-center sm:text-left">
            <div className="inline-block border-b border-yellow-300 font-semibold bg-blue-950 rounded-full text-white px-4 py-2">
              {categoryname?.name}
            </div>
            <h1 className="text-white text-2xl sm:text-3xl font-bold mt-4">{course?.title}</h1>
          </div>
        </div>
      </div>

      
      {/* sticky card */}
      
          <Card ref={courseCardRef} className={`top-80 p-2 absolute w-1/4 right-28  rounded overflow-hidden shadow-lg
             bg-white dark:bg-gray-800 transition-all duration-300 ${isFixed? 'fixed w-1/4 top-32 ' : ""}`}>
          <div className="max-w-sm rounded overflow-hidden shadow-lg dark:shadow-gray-800 bg-white dark:bg-gray-800 transition-all duration-300">
      <img className="w-full" src={course?.imageUrl} alt="NLP Course" />
      <div className="p-4">
        <div className="font-bold text-xl mb-2 text-gray-900 dark:text-white">
          {course?.title}
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-base">
          9075201035 www.paarshlearning.com
        </p>
      
        <div className="flex items-center mb-3 mt-4">
          <span className="text-gray-700 dark:text-gray-300">Duration: </span>
          <span className="ml-auto text-blue-500">{course?.duration} Days</span>
        </div>
        
        <div className="flex items-center mb-3">
          <span className="text-gray-700 dark:text-gray-300">Skill Level: </span>
          <span className="ml-auto text-blue-500">{course?.level}</span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-700 dark:text-gray-300">Language: </span>
          <span className="ml-auto text-blue-500">{course?.language}</span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-700 dark:text-gray-300">type: </span>
          <span className="ml-auto text-blue-500">{course?.type}</span>
        </div>
        <Button className="w-full mt-5">Enquery</Button>
      </div>
    </div>
    </Card>
        
     
      {/* Tab Section */}
      <div ref={courseCardRef}  className="flex mx-20">
        {/* Main Content */}
        <div className="flex flex-col px-6 sm:px-20 py-10 w-3/4">
          <header className="bg-slate-300 dark:bg-slate-900 flex items-center justify-center w-full rounded py-4 mb-6">
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setActiveTab('tab1')}
                className={`py-2 px-4 font-semibold rounded-lg transition-colors duration-300 ${activeTab === 'tab1' ? 'underline text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'
                  }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('tab2')}
                className={`py-2 px-4 font-semibold rounded-lg transition-colors duration-300 ${activeTab === 'tab2' ? 'underline text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'
                  }`}
              >
                Syllabus
              </button>
            </div>
          </header>

          {/* Content Section */}
          <main className="flex-1 bg-white dark:bg-gray-900 p-4 sm:p-8 rounded-lg shadow-lg transition-all duration-500 ease-in-out">
            {activeTab === 'tab1' ? (
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold">{course?.title}</h2>
                <div className="text-justify py-6  leading-relaxed">{parse(course?.longdescription || "")}</div>
              </div>
            ) : (
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold">Syllabus</h2>
                <ul className="list-disc list-inside py-4 text-gray-700 dark:text-gray-400 leading-relaxed">
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

        
        
      </div>
      <Container>
        <h1 className=" sm:text-5xl text-3xl font-semibold py-10">Popular Courses</h1>
        <CarouselSize products={popularCourses} role="popular" status={courseStatus} error={courseError}></CarouselSize>
        </Container>
    </>
  );
}

export default CourseDetails;
