import { addCourse } from "@/core/redux/slices/course_slice";
import { AppDispatch, RootState } from "@/core/redux/store";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import RTE from "../atoms/RTE";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogOverlay, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

// Define schema using Zod
const formSchema = z.object({
  categoryId: z.string().min(1, { message: "Please select a category" }),
  instructorId: z.string().min(1, { message: "Please select an Instructor" }),
  title: z
    .string()
    .min(2, { message: "Course name must be at least 2 characters." }),
  duration: z.string().min(1, { message: "Please provide the duration" }),
  price: z.string().min(1, { message: "Please enter a valid fee" }),
  language: z.array(z.string()).min(1, "Please select at least one language"),
  level: z.string().min(2, { message: "Please select a course level" }),
  type: z.string().min(2, { message: "Please select a course type" }),
  courseImage: z.any(),
  description: z.string().min(10, "Please provide a description"),
  longdescription: z.string().min(10, "Please provide a description"),
});

const Form = () => {const categories = useSelector((state: RootState) => state.courses.categories);
  const instructors = useSelector((state: RootState) => state.instructors.items);

  type FormData = z.infer<typeof formSchema>;
  
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null); // To hold form data before confirmation

  const {
    
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: "",
      title: "",
      duration: "",
      price: "",
      language: [],
      level: "",
      type: "",
      courseImage: null,
      description: "",
      longdescription: "",
      instructorId: "",
    },
  });

  const onSubmit = async (data : z.infer<typeof formSchema>)  => {
    setFormData(data ); 
    setIsConfirmOpen(true);
  };

  const handleConfirm = async () => {
    const languagesString = formData?.language.join(", ");
    if(!formData) return;
    try {
      const modifiedData = {
        ...formData,
        categoryId: parseInt(formData?.categoryId, 10),
        instructorId: parseInt(formData?.instructorId, 10),
        duration: parseInt(formData?.duration, 10),
        language: languagesString,
        courseImage: formData?.courseImage[0],
      };
      console.log("modifiedData :", modifiedData);
      
      const response = await dispatch(addCourse(modifiedData)).unwrap();
      if (response) {
        toast({
          title: "Course added successfully!",
          description: "The course has been successfully added.",
          className: "bg-green-400 z-50 border-none top-2 w-fit p-4 mx-80 rounded shadow-lg",
        });
      }
      setIsConfirmOpen(false);
      setIsOpen(false);
      window.location.reload()
    } catch (err) {
      const errorMessage =
        err.message || "Course addition failed. Please try again.";
      toast({
        title: "Course addition failed",
        description: errorMessage,
        className: "bg-red-500  z-50 border-none text-white top-2 w-fit p-4 mx-80 rounded shadow-lg",
      });
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-blue-500 rounded hover:bg-blue-600 text-lg text-white font-semibold"
          >
            Add
          </Button>
        </DialogTrigger>

        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 z-40"></div>
        )}

        <DialogContent className="fixed left-1/2 top-1/2 z-50 max-w-4xl bg-white w-full max-h-[90vh] overflow-y-auto transform -translate-x-1/2 -translate-y-1/2 p-6 shadow-lg rounded">
          <DialogHeader>
            <DialogTitle>Add Course</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new course. Click save when you're
              done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              {/* Category Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Course Category
                </label>
                <select
                  {...register("categoryId")}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id.toString()}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.categoryId.message}
                  </p>
                )}
              </div>

              {/* Title Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Course Name
                </label>
                <input
                  {...register("title")}
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter course name"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Duration Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Course Duration (Days)
                </label>
                <input
                  {...register("duration")}
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter duration"
                />
                {errors.duration && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.duration.message}
                  </p>
                )}
              </div>

              {/* Price Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Course Fees (INR)
                </label>
                <input
                  {...register("price")}
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter course fees"
                />
                {errors.price && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>

              {/* Languages Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Course Languages
                </label>
                <div className="mt-2">
                  {["English", "Hindi", "Marathi"].map((language) => (
                    <div key={language} className="flex items-center">
                      <input
                        type="checkbox"
                        value={language}
                        {...register("language")}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                      <label className="ml-2 block text-sm text-gray-900">
                        {language}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.language && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.language.message}
                  </p>
                )}
              </div>

              {/* Level Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Course Level
                </label>
                <select
                  {...register("level")}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">Select level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
                {errors.level && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.level.message}
                  </p>
                )}
              </div>

              {/* Type Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Course Type
                </label>
                <select
                  {...register("type")}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">Select type</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
                {errors.type && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.type.message}
                  </p>
                )}
              </div>

              {/* Instructor Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Instructor
                </label>
                <select
                  {...register("instructorId")}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">Select an instructor</option>
                  {instructors.map((instructor) => (
                    <option
                      key={instructor.id}
                      value={instructor.id.toString()}
                    >
                      {instructor.name}
                    </option>
                  ))}
                </select>
                {errors.instructorId && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.instructorId.message}
                  </p>
                )}
              </div>

              {/* Course Image Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Course Thumbnail Image
                </label>
                <input
                  type="file"
                  {...register("courseImage")}
                  className="mt-1 block w-full text-gray-500"
                />
                {errors.courseImage && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.courseImage.message}
                  </p>
                )}
              </div>
            </div>

            {/* Description Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Short Description
              </label>
              <textarea
                {...register("description")}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter short description"
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <RTE
              name="longdescription"
              // control={control}
              label="Long Description"
            />

            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogTrigger asChild>
          {/* Trigger for AlertDialog should be integrated with the form submission */}
          {/* This is handled by the form submission in this setup */}
        </AlertDialogTrigger>
        <AlertDialogOverlay className="fixed inset-0 bg-black/30" />
        <AlertDialogContent className="fixed left-1/2 top-1/2 z-50 max-w-sm bg-white w-full max-h-[90vh] overflow-y-auto transform -translate-x-1/2 -translate-y-1/2 p-6 shadow-lg rounded-lg">
          <AlertDialogTitle>Confirm Save</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to add this course? This action cannot be
            undone.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <div>
              <AlertDialogCancel onClick={() => setIsConfirmOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirm}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                Confirm
              </AlertDialogAction>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Form;
