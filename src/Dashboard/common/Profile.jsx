import useAuth from "../../Hooks/useAuth"
import UserRole from "../../Hooks/UserRole"

const Profile = () => {
  const { user } = useAuth()
  const [role, isRoleLoading] = UserRole()
  console.log(role)
  if (isRoleLoading) return 
  return (
 <div className='flex items-center justify-center min-h-screen bg-gray-100 italic '>
        <div className='bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-3/5'>
        <img
          alt='cover photo'
          src={'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTExL210MTA5OGEtMDIwNjIzLXB1bnlhLTAwNi1hbm5vdW5jZW1lbnQtYmxvZ2Jhbm5lci5qcGc.jpg'}
          className='w-full mb-4 h-56'
        />
       
        <div className='flex flex-col items-center justify-center p-4 -mt-16'>
          <a href='#' className='relative block'>
            <img
              alt='profile'
              src={'https://cdn-icons-png.flaticon.com/512/3135/3135768.png'}
              className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
            />
          </a>

          <p className='p-2 px-4 text-xs text-white bg-slate-500 rounded-full'>
            {role?.toUpperCase()}
          </p>
          <p className='mt-2 text-xl font-medium text-gray-800 '>
           User Id: {user.uid}
          </p>
          <div className='w-full p-2 mt-4 rounded-lg'>
            <div className='flex flex-wrap items-center justify-between text-sm text-gray-600 '>
              <p className='flex flex-col'>
                Name
                <span className='font-bold text-black '>
                  {user.displayName}
                </span>
              </p>
              <p className='flex flex-col'>
                Email
                <span className='font-bold text-black '>{user.email}</span>
              </p>

              <div>
                <button className='bg-slate-500 px-10 py-1 rounded-lg text-black cursor-pointer hover:bg-slate-800 block mb-1'>
                  Update Profile
                </button>
                <button className='bg-slate-500 px-7 py-1 rounded-lg text-black cursor-pointer hover:bg-slate-800'>
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile