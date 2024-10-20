import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Toaster } from '@/components/ui/toaster';
import { getAllCategories, selectAllCategories } from '@/core/redux/slices/category_slice';
import { deleteCourse, fetchCourses, selectAllCourses } from '@/core/redux/slices/course_slice';
import { getAllInstrucotrs, selectAllInstructors } from '@/core/redux/slices/instructor_slice';
import { AppDispatch } from '@/core/redux/store';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog } from '@radix-ui/react-alert-dialog';
import { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import CourseForm from './admin_compnents/course_form';
import ViewCourse from './admin_compnents/view_course';

const Edit_course = () => {

  const courses = useSelector(selectAllCourses);
  const categories = useSelector(selectAllCategories);
  const instructors = useSelector( selectAllInstructors);
  const dispatch = useDispatch<AppDispatch>();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const { toast } = useToast();
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [isToggled, setIsToggled] = useState(false);

  // Function to toggle the state
  const toggleState = () => {
    setIsToggled(prevState => !prevState);
  };

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(getAllInstrucotrs());
    dispatch(getAllCategories());
  },[dispatch,isToggled]);


  const currentCourses = courses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(courses.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleDelete = async () => {
    if (selectedCourseId === null) return;

    try {
      const response = await dispatch(deleteCourse(selectedCourseId));
      setDialogOpen(false);

      if (response) {
        toast({
          title: "Course Successfully Deleted",
          description: `The course has been successfully removed.`,
          className: "bg-green-500 text-white",
        });
      } else {
        toast({
          title: "Deletion Error",
          description: `There was an issue deleting the course. Please try again.`,
          className: "bg-red-500 text-white ",
        });
      }
    } catch (error) {
      console.log(error);

      const errorMessage = "Course deletion failed. Please try again.";
      toast({ title: "Course deletion failed", description: errorMessage });
    }
  };

  return (
    <div className="">
      <div className="flex justify-between px-2 items-center mb-4">
        <h1 className="text-2xl font-bold">Courses</h1>
        <div>
          <CourseForm onToggle={toggleState}/>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr>
              <th className="p-2 border-b border-gray-200">#</th>
              <th className="p-2 border-b border-gray-200">Category</th>
              <th className="p-2 border-b border-gray-200">Name</th>
              <th className="p-2 border-b border-gray-200">Type</th>
              <th className="p-2 border-b border-gray-200">Duration (days)</th>

              <th className="p-2 border-b border-gray-200">Fees</th>
              <th className="p-2 border-b border-gray-200">Created by</th>
              <th className="p-2 border-b border-gray-200">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentCourses.map((course, index) => {
              const category = categories?.find(
                (category) => category.id === course.categoryId
              );
              const instructor = instructors.find(
                (instructor) => instructor.id === course.instructorId
              );
              return (
                <tr key={course.id}>
                  <td className="p-2 border-b text-center border-gray-200">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="p-2 border-b text-center border-gray-200">
                    {category?.name || "Unknown"}
                  </td>
                  <td className="p-2 border-b text-center border-gray-200">
                    {course.title}
                  </td>
                  <td className="p-2 border-b text-center border-gray-200">
                    {course?.type}
                  </td>
                  <td className="p-2 border-b text-center border-gray-200">
                    {course.duration}
                  </td>
                  <td className="p-2 border-b text-center border-gray-200">
                    {course.price}
                  </td>
                  <td className="p-2 border-b text-center border-gray-200">
                    {instructor?.name}
                  </td>
                  <td className="p-4 border-b text-center border-gray-200 ">
                    <div className='flex gap-2'>
                      <ViewCourse courseId={course.id} />
                      <CourseForm course={course} onToggle={toggleState} />
                      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <AlertDialogTrigger asChild>
                          <button
                            className="text-red-500  hover:text-red-700"
                            onClick={() => {
                              setSelectedCourseId(course.id);
                              setDialogOpen(true);
                            }}
                          >
                            <FaTrash />
                          </button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                          </AlertDialogHeader>
                          <AlertDialogDescription>
                            Are you sure you want to delete this course? This
                            action cannot be undone.
                          </AlertDialogDescription>
                          <AlertDialogFooter>
                            <div>
                              <AlertDialogCancel
                                className="border-none felx "
                                onClick={() => setDialogOpen(false)}
                              >
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-500 text-white hover:bg-red-600"
                                onClick={() => {
                                  handleDelete();
                                  setDialogOpen(false);
                                }}
                              >
                                Confirm
                              </AlertDialogAction>
                            </div>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm">
          {`${(currentPage - 1) * itemsPerPage + 1} to ${currentPage * itemsPerPage < courses.length
            ? currentPage * itemsPerPage
            : courses.length
            } Items of ${courses.length} — `}
          <a href="#" className="text-blue-500 hover:underline">
            View all
          </a>
        </span>
        <div className="space-x-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="bg-gray-200 text-gray-600 px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-gray-200 text-gray-600 px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <Toaster />
    </div>
  )
}



export default Edit_course;
