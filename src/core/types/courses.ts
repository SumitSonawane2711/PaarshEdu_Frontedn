import { Category } from "./category";

// types.ts
export interface Course {
    id: number;
    title: string;
    description: string;
    price: number;
    instructorId: number;
    imageUrl: string;
    categoryId: number;
    duration:number;
    language: string,
    level:string,
    type:string,
    longdescription:string,
    updatedAt:string

  }
  
 
  export interface CoursesState {
    items: Course[];
    categories: Category[];
    currentItem: Course | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }
  