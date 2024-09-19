
import React from 'react';

// Define the props type
interface ContainerProps {
  children: React.ReactNode;
}

// Functional component with typed props
const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className='w-full max-w-7xl mx-auto px-4'>
      {children}
    </div>
  );
};

export default Container;
