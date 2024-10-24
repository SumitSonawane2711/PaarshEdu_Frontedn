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
import { AppDispatch, RootState } from '@/core/redux/store';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog } from '@radix-ui/react-alert-dialog';
import {  useEffect, useState } from 'react'
import {  FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import { deleteUser, getAllUsers } from '@/core/redux/slices/user_slice';


const Edit_user = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state:RootState)=>state.users.items);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const { toast } = useToast();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllUsers());
  },[dispatch]);

  const currentUsers = users?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const totalPages = Math.ceil(users?.length / itemsPerPage );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleDelete = async () => {
    if (selectedUserId === null) return;

    try {
      const response = await dispatch(deleteUser(selectedUserId));
      setDialogOpen(false);

      if (response) {
        toast({
          title: "user Successfully Deleted",
          description: `The user has been successfully removed.`,
          className: "bg-green-500 ",
        });
        window.location.reload();
      } else {
        toast({
          title: "Deletion Error",
          description: `There was an issue deleting the user. Please try again.`,
          className: "bg-red-500 text-white ",
        });
      } 
    } catch (error) {
      console.log(error);
      const errorMessage = "user deletion failed. Please try again.";
      toast({ title: "Course deletion failed", description: errorMessage });
    }
  };

  return (
    <div className="">
    <div className="flex justify-between px-2 items-center mb-4">
      <h1 className="text-2xl font-bold">Users</h1>
    </div>

    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr>
            <th className="p-2 border-b border-gray-200">#</th>
            <th className="p-2 border-b border-gray-200">Name</th>
            <th className="p-2 border-b border-gray-200">Email</th>
            <th className="p-2 border-b border-gray-200">number</th>
            <th className="p-2 border-b border-gray-200">Role</th>
            <th className="p-2 border-b border-gray-200">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers?.filter(user => user.role !== "admin").map((user, index) => {
            return (
              <tr key={user.id}>
                <td className="p-2 border-b text-center border-gray-200">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="p-2 border-b text-center border-gray-200">
                  {user?.name || "Unknown"}
                </td>
                <td className="p-2 border-b text-center border-gray-200">
                  {user?.email || "Unknown"}
                </td>
                <td className="p-2 border-b text-center border-gray-200">
                  {user?.phone || "Unknown"}
                </td>
                <td className="p-2 border-b text-center border-gray-200">
                  {user?.role || "Unknown"}
                </td>
                <td className="p-4 border-b border-gray-200 ">
                  <div className='flex gap-2 justify-center'>
                    {/* <Instructor_form instructor={user}/> */}
                    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                      <AlertDialogTrigger asChild>
                        <button
                          className="text-red-500  hover:text-red-700"
                          onClick={() => {
                            setSelectedUserId(user.id);
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
        {`${(currentPage - 1) * itemsPerPage + 1} to ${currentPage * itemsPerPage < users?.length
          ? currentPage * itemsPerPage
          : users?.length
          } Items of ${users?.length} — `}
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

export default Edit_user
