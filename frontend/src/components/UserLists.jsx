import React,{useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { getAllUsers,reset,editUser,userBlock } from '../features/AdminAuth/adminAuthSlice'
import './UserLists.css'

function UserLists() {

    const dispatch = useDispatch()

    const users = useSelector((state)=>state.adminAuth.users)
    const isLoading = useSelector((state)=>state.adminAuth.isLoading)

    useEffect(() => {
        dispatch(getAllUsers());
    
        return() => {
          dispatch(reset())
        }
      },[dispatch])
    
      const handleEdit = (userId, name, email) => {
        const newName = prompt("Enter new name:", name);
        const newEmail = prompt("Enter new email:", email);
        if(newName === null || newEmail === null) {
          return
        }
        if (newEmail && newName) {
          dispatch(editUser({ userId, name: newName, email: newEmail }));
        }
      }

      const handleBlock = (userId,isBlock) => {
        if(isBlock === false){
            if(window.confirm("Are you sure want to block the user?")) {
                dispatch(userBlock(userId))
              }
        }
        else{
            if(window.confirm("Are you sure want to unblock the user?")) {
                dispatch(userBlock(userId))
              }
        }
        
      }

  return (
    <div className='user-list'>

    {isLoading && <p>Loading...</p>}
    {users && users.length > 0 ? (
     <table>
     <thead>
       <tr>
         <th>Sl No</th>
         <th>Photo</th>
         <th>Name</th>
         <th>Email</th>
         <th>Status</th>
         <th>Action</th>
       </tr>
     </thead>
     <tbody>
       {users.map((user, index) => (
         <tr key={index}>
           <td>{index + 1}</td>
           <td >
             <img className='userlistprofile' src={user?.profileUrl ? user.profileUrl :  "https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small/user-profile-icon-free-vector.jpg"} alt="profile" style={{width:"200px",height:"200px"}}  />
           </td>
           <td>{user.name}</td>
           <td>{user.email}</td>
           <td>{user.isBlock ? "Blocked" : "Unblocked"}</td>
           <td className="action-buttons">
             <div className="table-button">
               <button onClick={() => handleBlock(user._id,user.isBlock)} className="btn">
                 {user.isBlock ? "Unblock" : "Block"}
               </button>
               <button onClick={() => handleEdit(user._id, user.name, user.email)} className="btn-1">
                 Edit
               </button>
             </div>
           </td>
         </tr>
       ))}
     </tbody>
   </table>
   
    ) : (
      <p>No users available</p>
    )}
  </div>
  )
}

export default UserLists
