import { Card } from '@/components/ui/card';
import { RootState } from '@/core/redux/store';
import { useSelector } from 'react-redux';

const UserProfile = () => {
  const currentUser = useSelector((state: RootState) => state.users.user);

  return (
    <div className="container mx-auto p-4 sm:p-6 flex flex-col items-center justify-center min-h-screen">
      {/* Profile Section */}
      <div className=" shadow-md rounded-lg overflow-hidden w-full max-w-lg transform hover:scale-105 transition duration-500 ease-in-out">
        <div className="flex items-center justify-between bg-blue-600 p-4">
          <h1 className="Dark:text-white text-xl font-bold">User Profile</h1>
        </div>

        <Card className="flex flex-col items-center p-6">
          {/* Profile Picture */}
          <img
            src={""} // Add user profile image URL here
            alt="Profile"
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-blue-500 mb-4 transition-transform duration-300 hover:scale-110"
          />

          {/* User Details */}
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">{currentUser?.name}</h2>
          <p className="text-gray-600 text-sm sm:text-base">{currentUser?.email}</p>
          <p className="text-blue-500 font-semibold mt-1 text-sm sm:text-base">Active Learner</p> {/* Change role dynamically */}

          {/* Bio Section */}
          <div className="mt-4 text-center px-4">
            <p className="text-gray-700 dark:text-white text-sm sm:text-base">
              This is a short bio about the user. They are passionate about learning and sharing knowledge.
            </p>
          </div>

          {/* Course Stats Section */}
          <div className="flex flex-col items-center mt-6 w-full">
            <div className="w-full flex justify-around py-4 border-t">
              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-bold text-blue-600">2</h3>
                <p className="text-gray-600 text-sm">Courses Enrolled</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-bold text-blue-600">0</h3>
                <p className="text-gray-600 text-sm">Course Completed</p>
              </div>  
            </div>
          </div>
        </Card>

        {/* Edit Profile and View Courses Buttons */}
        <div className="flex flex-col sm:flex-row justify-between p-4 space-y-2 sm:space-y-0">
          <button className="bg-blue-500 text-white w-full sm:w-auto px-4 py-2 rounded-md hover:bg-blue-600 hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
            Edit Profile
          </button>
          <button className="bg-red-500 text-white w-full sm:w-auto px-4 py-2 rounded-md hover:bg-red-600 hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
            Delete Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
