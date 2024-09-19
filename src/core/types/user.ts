export interface User {
    name: string; 
    email: string; 
    phone: string; 
    password: string;
    role:string;
  }

  export interface UserState {
    user: User | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }  

  export interface Instructor {
    id:number,
    name:string;
    email:string;
  }

  export interface InstructorState {
    items: Instructor[];
    currenItem: Instructor | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  } 