import { Navigate, useLocation } from "react-router";
import UserRole from "../Hooks/UserRole";



const AdminRoute = ({ children }) => {
  const [role, isRoleLoading] = UserRole()
  const location = useLocation()
  console.log(location)
  console.log('I was here, in Admin route')
  if (isRoleLoading) return <div>Loading...</div>;
  if (role === 'admin') return children;
  // If role is null or not admin, navigate to home
  return <Navigate to='/' replace='true' />
}

export default AdminRoute