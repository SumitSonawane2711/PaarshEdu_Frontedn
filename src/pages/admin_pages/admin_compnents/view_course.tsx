import { selectAllCategories } from "@/core/redux/slices/category_slice";
import { selectAllCourses } from "@/core/redux/slices/course_slice";
import { useSelector } from "react-redux";

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { FaEye } from "react-icons/fa";
import parse from 'html-react-parser';

interface ViewCourseProps {
    courseId: number; // Expecting an object with courseId of type number
}


const ViewCourse : React.FC<ViewCourseProps>= ({courseId}) => {
    const courses = useSelector(selectAllCourses);
    const categories = useSelector(selectAllCategories);
    const course = courses.find(course => course.id === courseId);

    const category = categories?.find(cat => cat.id === course?.categoryId);

    return (
        
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <FaEye className="text-blue-500  hover:text-blue-700 cursor-pointer"/>
            </AlertDialogTrigger>
            <AlertDialogContent className="sm:max-w-5xl max-h-[80vh] overflow-y-auto transform">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                </AlertDialogHeader>
                <div >
                    <div className="flex space-x-4 mt-4">
                        <img
                            src={course?.imageUrl} // Replace with actual image URL
                            alt="Course Thumbnail"
                            className="w-24 h-24 rounded-lg"
                        />
                        <div>
                            <div className="flex items-center space-x-2">
                                <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">{category?.name}</span>
                                <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">{course?.type}</span>
                                <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">{course?.level}</span>
                            </div>
                            <h3 className="text-lg font-semibold mt-2">{course?.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">
                                {course?.description}
                            </p>
                            <div className="flex items-center mt-2">
                                <span className="text-lg font-bold text-gray-800">{course?.price}</span>
                                <span className="ml-4 text-yellow-500">★ 4.5/5.0</span>
                                <span className="ml-4 text-gray-500">12k Enrolled</span>
                                <span className="ml-4 text-green-600">{course?.level}</span>
                                <span className="ml-4 text-red-600">{course?.updatedAt}</span>
                            </div>
                            <div className="mt-2 text-gray-500">
                                <span>English, Hindi, Marathi</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 border-b">
                        <nav className="flex space-x-4">
                            <button className="text-blue-600 border-b-2 border-blue-600 pb-2">Overview</button>
                            <button className="text-gray-600 hover:text-blue-600 pb-2">Syllabus</button>
                            <button className="text-gray-600 hover:text-blue-600 pb-2">Notes</button>
                            <button className="text-gray-600 hover:text-blue-600 pb-2">Downloadable</button>
                            <button className="text-gray-600 hover:text-blue-600 pb-2">Assignments</button>
                            <button className="text-gray-600 hover:text-blue-600 pb-2">Batches</button>
                            <button className="text-gray-600 hover:text-blue-600 pb-2">Reviews</button>
                        </nav>
                    </div>

                    <div className="mt-4">
                        <h4 className="text-lg font-semibold">Course Description</h4>
                        <div>
                            {parse(course?.longdescription || "")}
                        </div>
                    </div>
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ViewCourse
