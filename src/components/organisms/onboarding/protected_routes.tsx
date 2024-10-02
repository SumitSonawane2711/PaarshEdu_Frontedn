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
  const role = currentUser?.role ?? 'unknown';
  // console.log("currentUser :", currentUser);


  //   if(isAdmin){
  //     return <AdminHome/>
  //   }

    if (!isLoggedIn) {
      return <Navigate to={redirectTo??'/signin'} />
    }

  if (!requiredRoles.includes(role)) {
    return <Navigate to={redirectTo??'/admin'} />
  }
  return <>{children}</>
};



export default ProtectedRoute;
