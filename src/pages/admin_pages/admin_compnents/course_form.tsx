import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import RTE from "@/components/atoms/RTE"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useDispatch, useSelector } from "react-redux"
import { addCourse, updateCourse } from "@/core/redux/slices/course_slice"
import { selectAllInstructors } from "@/core/redux/slices/instructor_slice"
import { useToast } from "@/hooks/use-toast"
import { selectAllCategories } from "@/core/redux/slices/category_slice"
import { useState } from "react"
import { AppDispatch } from "@/core/redux/store"
import { FaEdit } from "react-icons/fa"
import { Course } from "@/core/types/courses"

// Define schema using Zod
const formSchema = z.object({
  categoryId: z.string().min(1, { message: "Please select a category" }),
  instructorId: z.string().min(1, { message: "Please select an Instructor" }),
  title: z.string().min(2, { message: "Course name must be at least 2 characters." }),
  duration: z.string().min(1, { message: "Please provide the duration" }),
  price: z.string().min(1, { message: "Please enter a valid fee" }),
  language: z.array(z.string()).min(1, "Please select at least one language"),
  level: z.string().min(2, { message: "Please select a course level" }),
  type: z.string().min(2, { message: "Please select a course type" }),
  courseImage: z.any(),
  description: z.string().min(10, "Please provide a description"),
  longdescription: z.string().min(10, "Please provide a long description"),
});

interface CourseFormProp {
  course?: Course ;
}

const CourseForm: React.FC<CourseFormProp> = ({ course }) => {
  const categories = useSelector(selectAllCategories);
  const instructors = useSelector(selectAllInstructors);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);

  type Course = z.infer<typeof formSchema>;
  const [formData, setFormData] = useState<Course | null>(null); // To hold form data before confirmation
  
  console.log("course:",course);
  

  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: course?.categoryId.toString() || "",
      title: course?.title || "",
      duration: course?.duration !== null && course?.duration.toString()   || "",
      price: course?.price.toString() || "",
      language: course?.language ? course.language.split(", ") : [],
      level: course?.level || "",
      type: course?.type || "",
      courseImage: course?.imageUrl || null,
      description: course?.description || "",
      longdescription: course?.longdescription || "",
      instructorId: course?.instructorId.toString() || "",
    },
  });

  const handleConfirm = async () => {

    // console.log("data :", formData);

    const languagesString = formData?.language?.join(", ") || "";
    console.log("formdataCID",formData?.categoryId)

     try {
      const modifiedData= {
        ...formData,
        categoryId:parseInt(formData?.categoryId || "0",10),
        instructorId:parseInt(formData?.instructorId || "0",10),
        duration:parseInt(formData?.duration || "0",10),
        language:languagesString
      }
    


    console.log("formdata: ", formData);
    console.log("modifiedData: ", modifiedData);
    

      //update the course
      if (course) {
        const updatedData= {
          ...formData,
          categoryId:parseInt(formData?.categoryId || "0",10),
          instructorId:parseInt(formData?.instructorId || "0",10),
          duration:parseInt(formData?.duration || "0",10),
          language:languagesString,
          id:course.id
        }
        console.log("updatedData :",updatedData);
                
        const response = await dispatch(updateCourse(updatedData)).unwrap();
        if (response) {
          toast({
            title: "Course Updated Successfully",
            description: "The course information has been updated successfully.",
            className: "bg-green-500 text-white",
          });
        }
      } else {
        const response = await dispatch(addCourse(modifiedData)).unwrap();

        if (response) {
          toast({
            title: "Course added successfully!",
            description: "The course has been successfully added.",
            className: "bg-green-500 text-white",
          });
        }
      }

      setIsConfirmOpen(false);
      setIsOpen(false);
      // window.location.reload();
    } catch (err) {
      console.log(err);
      const errorMessage = "Course Action failed failed. Please try again.";
      toast({
        title: "Course addition failed",
        description: errorMessage,
        className: "bg-red-500 text-white ",
      });
      setIsOpen(false);
    }
  };

  function onSubmit(values: Course) {
    setFormData(values);
    setIsConfirmOpen(true);
  }


  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen} >
        <DialogTrigger asChild>
          {course ? <FaEdit />
            : <Button variant="outline" className='text-lg text-white bg-blue-600'>ADD</Button>
          }
        </DialogTrigger>
        <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto transform">
          <DialogHeader>
            {course ? <DialogTitle>Update Course</DialogTitle> : <DialogTitle>ADD Course</DialogTitle>}
            <DialogDescription>
              Make changes to your Course here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-5">
              <div className="grid grid-cols-3 gap-5 ">
                {/* Course Category */}
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Category</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {categories?.map((category) => (

                                <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Course Name */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Course name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Course Duration */}
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Duration (in days)</FormLabel>
                      <FormControl>
                        <Input placeholder="Course duration" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-4 gap-5 ">
                {/* Price */}
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Fees (INR)</FormLabel>
                      <FormControl>
                        <Input placeholder="Price"  {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Languages */}
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Languages</FormLabel>
                      <FormControl>
                        <div className="mt-2">
                          {["English", "Hindi", "Marathi"].map((lang) => (
                            <div key={lang} className="flex items-center space-x-2">
                              <Checkbox
                                value={lang}
                                checked={field.value.includes(lang)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    field.onChange([...field.value, lang]);
                                  } else {
                                    field.onChange(field.value.filter((l: string) => l !== lang));
                                  }
                                }}
                              />
                              <Label>{lang}</Label>
                            </div>
                          ))}
                        </div>

                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Level */}
                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Level</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="beginner">Beginner</SelectItem>
                              <SelectItem value="intermediate">Intermediate</SelectItem>
                              <SelectItem value="advanced">Advanced</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Type */}
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Type</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="online">Online</SelectItem>
                              <SelectItem value="offline">Offline</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Instructor */}
              <FormField
                control={form.control}
                name="instructorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Instructor</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select instructor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {instructors.map((instructor, index) => (
                              <SelectItem key={index} value={instructor.id.toString()}>{instructor.name}</SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Course Image */}
              <FormField
                control={form.control}
                name="courseImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Image</FormLabel>
                    <FormControl>
                      <Input type="file" onChange={(e) => field.onChange(e.target.files?.[0])} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Short description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Long Description */}
              <FormField
                control={form.control}
                name="longdescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Long Description</FormLabel>
                    <FormControl>
                      <RTE {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" >Submit</Button>
            </form>
          </Form>
          <DialogFooter>

          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogTrigger asChild>
          {/* Trigger for AlertDialog should be integrated with the form submission */}
          {/* This is handled by the form submission in this setup */}
        </AlertDialogTrigger>
        <AlertDialogOverlay />
        <AlertDialogContent >
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

export default CourseForm;
