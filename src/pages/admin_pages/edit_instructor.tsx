import { AlertDialogAction,
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
 } from '@/components/ui/alert-dialog';

         
import { Toaster } from '@/components/ui/toaster';
import { AppDispatch } from '@/core/redux/store';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog } from '@radix-ui/react-alert-dialog';
import {  useEffect, useState } from 'react'
import {  FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import { deleteInstructor, getAllInstrucotrs, selectAllInstructors } from '@/core/redux/slices/instructor_slice';
import Instructor_form from './admin_compnents/instructor_form';


const Edit_instructor = () => {
  const instructors = useSelector(selectAllInstructors);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const { toast } = useToast();
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const currentInstructors = instructors?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(instructors?.length / itemsPerPage );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    dispatch(getAllInstrucotrs());
  },[dispatch]);
  
  const handleDelete = async () => {
    if (selectedCourseId === null) return;

    try {
      const response = await dispatch(deleteInstructor(selectedCourseId));
      setDialogOpen(false);

      if (response) {
        toast({
          title: "Instructor Successfully Deleted",
          description: `The course has been successfully removed.`,
          className: "bg-green-500 ",
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

      const errorMessage = "Instructor deletion failed. Please try again.";
      toast({ title: "Course deletion failed", description: errorMessage });
    }
  };

  return (
    <div className="">
    <div className="flex justify-between px-2 items-center mb-4">
      <h1 className="text-2xl font-bold">Instructor</h1>
      <div>
        <Instructor_form/>
      </div>
    </div>

    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr>
            <th className="p-2 border-b border-gray-200">#</th>
            <th className="p-2 border-b border-gray-200">Name</th>
            <th className="p-2 border-b border-gray-200">Email</th>
            <th className="p-2 border-b border-gray-200">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentInstructors?.map((instructor, index) => {
            return (
              <tr key={instructor.id}>
                <td className="p-2 border-b text-center border-gray-200">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="p-2 border-b text-center border-gray-200">
                  {instructor?.name || "Unknown"}
                </td>
                <td className="p-2 border-b text-center border-gray-200">
                  {instructor?.email || "Unknown"}
                </td>
                
                
                <td className="p-4 border-b border-gray-200 ">
                  <div className='flex gap-2 justify-center'>
                    <Instructor_form instructor={instructor}/>
                    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                      <AlertDialogTrigger asChild>
                        <button
                          className="text-red-500  hover:text-red-700"
                          onClick={() => {
                            setSelectedCourseId(instructor.id);
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
        {`${(currentPage - 1) * itemsPerPage + 1} to ${currentPage * itemsPerPage < instructors?.length
          ? currentPage * itemsPerPage
          : instructors?.length
          } Items of ${instructors?.length} — `}
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

export default Edit_instructor
