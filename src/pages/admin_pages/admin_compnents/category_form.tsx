import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogOverlay, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createCategory, updateCategory } from '@/core/redux/slices/category_slice'
import { AppDispatch } from '@/core/redux/store';
import { Category } from '@/core/types/category';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogTitle } from '@radix-ui/react-dialog';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaEdit } from 'react-icons/fa';
import { useDispatch } from 'react-redux'
import { z } from 'zod';

//Categoryschema
const CategorySchema = z.object({
    name: z.string().min(2, { message: "Category name must be at least 2 characters." }),
    description: z.string().min(10, "Please provide a description"),
});

interface CategoryProps {
    category?: Category;
}

type Categroy = z.infer<typeof CategorySchema>;
const Category_form: React.FC<CategoryProps> = ({ category }) => {
    const { toast } = useToast();
    const dispatch = useDispatch<AppDispatch>();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isOpen, setIsopen] = useState(false);

    const [formData, setFormData] = useState<Categroy>()

    const form = useForm<z.infer<typeof CategorySchema>>({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            name: category?.name || "",
            description: category?.description || ""
        }
    })

    const handleConfirm = async () => {
        try {
            // const modifiedData = new FormData();
             
            // if (formData?.name) modifiedData.append("name", formData.name);
            // if (formData?.description) modifiedData.append("description",formData.description);

            if (category) {
                const categoryData = {
                    ...formData,
                    id: category.id, 
                  };
                  
                //   console.log("categoryData :",categoryData);
                  
                const response = await dispatch(updateCategory(categoryData)).unwrap();
                if (response) {
                    toast({
                        title: "Category updated successfully!",
                        description: "The Category has been successfully updated.",
                        className: "bg-green-500 text-white",
                    });
                    window.location.reload();
                }

            } else {
                const response = await dispatch(createCategory(formData)).unwrap()

                if (response) {
                    toast({
                        title: "Category added successfully!",
                        description: "The Category has been successfully added.",
                        className: "bg-green-500 text-white",
                    });
                    window.location.reload();
                }

            }

            setIsConfirmOpen(false);
            setIsopen(false);
            
        } catch (error) {
            console.log(error);
            toast({
                title: "Failed",
                description: "Category Action falied",
                className: "bg-red-500 text-white ",
            })
            setIsopen(false);
        }

    }

    function onSubmit(values: Categroy) {
        setFormData(values);
        setIsConfirmOpen(true);
    }

    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsopen} >
                <DialogTrigger asChild>
                    {category ? <span><FaEdit className="text-green-500  hover:text-green-700 cursor-pointer" /></span>
                      :<Button variant="outline" className='text-lg text-white bg-blue-600'>ADD</Button>}
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{category? "Update category" : "ADD category"}</DialogTitle>
                        <DialogDescription>
                            Make changes to your Category here. Click save when you're done.
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
                                    name='description'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category Discription</FormLabel>
                                            <FormControl>
                                                <Input placeholder='description' {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type="submit" >Submit</Button>

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

export default Category_form;
