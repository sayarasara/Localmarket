import { useQueryClient, useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import { toast } from 'react-toastify'

const AllusersModal = ({role, userEmail}) => {



  const axiosSecure = useAxiosSecure()
  const queryClient = useQueryClient()
  const [updatedRole, setUpdatedRole] = useState(role)
 console.log(updatedRole)

   const mutation = useMutation({
     mutationFn: async role => {
       const { data } = await axiosSecure.patch(
         `/user/role/update/${userEmail}`,
         { role }
       )
       return data
     },
    onSuccess: data => {
      console.log(data)
      // refetch()
      toast.success('User Role Updated Successfully')
     // setIsOpen(false)
      // invalidate query
      queryClient.invalidateQueries(['users'])
    },
    onError: error => {
      console.log(error)
    },
  })

  const handleSubmit = e => {
    e.preventDefault()
    mutation.mutate(updatedRole)
  }



  return (
    <div>
      {/* The button to open modal */}
<a href="#my_modal_8" className="btn">open modal</a>

{/* Put this part before </body> tag */}
<div className="modal" role="dialog" id="my_modal_8">
  <div className="modal-box">
    <h3 className="text-lg font-bold">Hello!</h3>
    <p className="py-4">This modal works with anchor links</p>
    <div className="modal-action">
      <a href="#" className="btn">Yay!</a>
    </div>
        <form onSubmit={handleSubmit}>
                <div>
                  <select
                    value={updatedRole}
                    onChange={e => setUpdatedRole(e.target.value)}
                    className='w-full my-3 border border-gray-200 rounded-xl px-2 py-3'
                    name='role'
                    id=''
                  >
                    <option value='customer'>Customer</option>
                    <option value='seller'>Seller</option>
                    <option value='admin'>Admin</option>
                  </select>
                </div>
                <div className='flex justify-between mt-5'>
                  <button
                    type='submit'
                    className='bg-green-400 py-2 px-3 cursor-pointer text-gray-700 rounded-xl '
                  >
                    Update
                  </button>
               
                </div>
              </form>
  </div>
</div>
    </div>
  )
}

export default AllusersModal
