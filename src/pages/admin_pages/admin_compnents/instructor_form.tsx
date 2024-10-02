import React, { useState } from 'react'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogOverlay, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { useToast } from '@/hooks/use-toast';
import { AppDispatch } from '@/core/redux/store';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createInstructor, updateInstructor } from '@/core/redux/slices/instructor_slice';
import { FaEdit } from 'react-icons/fa';
import { Instructor } from '@/core/types/user';

const InstructorSchema = z.object({
    name: z.string().min(2, { message: "Instructor name must be at least 2 characters." }),
    email: z.string().min(2, { message: "mail is required" }),
})

interface InstructorProps {
  instructor?: Instructor;
}

type InstructorType = z.infer<typeof InstructorSchema>;
const Instructor_form:React.FC<InstructorProps> = ({instructor}) => {
    const { toast } = useToast();
    const dispatch = useDispatch<AppDispatch>();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isOpen, setIsopen] = useState(false);

    const [formData, setFormData] = useState<InstructorType | null>(null)

    const form = useForm<z.infer<typeof InstructorSchema>>({
      resolver: zodResolver(InstructorSchema),
      defaultValues: {
          
          name: instructor?.name || "",
          email: instructor?.email || ""
      }
  })

  const handleConfirm = async ()=> {
    try {
      const modifiedData = new FormData();

      if (formData?.name) modifiedData.append("name", formData.name);
      if (formData?.email) modifiedData.append("description",formData.email);

      if(instructor) {
        const instructorData:Partial<Instructor> = {
          ...modifiedData,
          id: instructor.id,
        }
        const response = await dispatch(updateInstructor({instructorData})).unwrap();
        if(response){
          toast({
            title: "Instructor updated successfully!",
            description: "The Instructor has been successfully updated.",
            className: "bg-green-500 text-white",
        });
        }

      } else {
        const response = await dispatch(createInstructor(modifiedData));

        if (response) {
          toast({
              title: "Instructor added successfully!",
              description: "The Instructor has been successfully added.",
              className: "bg-green-500 text-white",
          });
      }
      }

    } catch (error) {
      console.log(error);
            toast({
                title: "Failed",
                description: "Instructor Action falied",
                className: "bg-red-500 text-white ",
            })
            setIsopen(false);
    }
  }

  function onSubmit(values : InstructorType){
    setFormData(values);
    setIsConfirmOpen(true);
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsopen} >
                <DialogTrigger asChild>
                    {instructor ? <Button variant="outline" className='text-lg text-white bg-blue-600'>ADD</Button>
                        : <FaEdit />}
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{instructor? "ADD category" : "Update category"}</DialogTitle>
                        <DialogDescription>
                            Make changes to your instructor here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 p-5'>
                            <div>

                                <FormField
                                    control={form.control}
                                    name='name'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder='Categry name' {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='email'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>instructor email</FormLabel>
                                            <FormControl>
                                                <Input placeholder='email' {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </form>
                    </Form>

                    <AlertDialogFooter></AlertDialogFooter>
                </DialogContent>

            </Dialog>

            {/* confirmation dialog */}
            <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                <AlertDialogTrigger asChild>
                </AlertDialogTrigger>
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogTitle>Confirm Save</AlertDialogTitle>
                    <AlertDialogDescription>Are you sure you want to add this course? This action cannot be
                        undone.</AlertDialogDescription>
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
  )
}

export default Instructor_form
