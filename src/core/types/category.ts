
export interface Category {
    id: number;
    name: string;
    description: string;
  }
  
export interface CategoryState {
    items: Category [] | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  } 