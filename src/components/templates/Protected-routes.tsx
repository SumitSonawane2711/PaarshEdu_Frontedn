import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { RootState } from "@/core/redux/store";

interface ProtectedRouteProps {
  redirectTo?: string,
  children: ReactNode,
  requiredRoles?: string[],
}
const ProtectedRoute = ({ redirectTo, requiredRoles = [],children }: ProtectedRouteProps) => {

  const currentUser = useSelector((state: RootState) => state.users.user)
  const isLoggedIn = currentUser !== null
  const role = currentUser?.role || "";
  console.log("currentUser :", currentUser);
  console.log(isLoggedIn);
  


  //   if(isAdmin){
  //     return <AdminHome/>
  //   }

    if (!isLoggedIn) {
      
      return <Navigate to={redirectTo??'/login'} />
    }

  if (!requiredRoles.includes(role)) {
    if (role === "user") {
      return <Navigate to="/user" />; // Redirect user to user-specific dashboard
    }
    if (role === "admin") {
      return <Navigate to="/admin" />; // Redirect admin to admin-specific dashboard
    }
    return <Navigate to={redirectTo??'/login'} />
  } 
  return <>{children}</>
};

export default ProtectedRoute;
