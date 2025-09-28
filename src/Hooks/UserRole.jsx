import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure.jsx';

const UserRole = () => {
  const { user, loading } = useAuth()
  // const [role, setRole] = useState(null)
  // const [isRoleLoading, setIsRoleLoading] = useState(true)
  const axiosSecure = useAxiosSecure()

  const { data: roleData, isLoading: isRoleLoading, isError } = useQuery({
    queryKey: ['role', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/role/${user?.email}`)
      return data
    },
    onError: (error) => {
      console.error('Error fetching user role:', error);
      // Return a default role or null in case of error
      return null;
    }
  })
 // console.log(roleData, isRoleLoading, isError)
    // If there's an error, return null for role and false for loading
    if (isError) {
      return [null, false];

    }
   // console.log(roleData)
    return [roleData?.role, isRoleLoading]
}

export default UserRole;