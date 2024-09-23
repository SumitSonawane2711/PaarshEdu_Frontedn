
import React from 'react';

// Define the props type
interface ContainerProps {
  children: React.ReactNode;
}

// Functional component with typed props
const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 items-center flex flex-col">
    {children}
  </div>
  );
};

export default Container;
