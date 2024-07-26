import React from 'react'
import { useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset, adminLogout, searchUser, getAllUsers } from '../../features/AdminAuth/adminAuthSlice'
import UserLists from '../../components/UserLists'
import { FaSearch } from 'react-icons/fa'

 
function AdminDashboard() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { admin } = useSelector((state) => state.adminAuth)

  const onLogout = () => {
    dispatch(adminLogout())
    dispatch(reset())
    navigate('/admin/login')
  }

  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if(!admin) {
      navigate('/admin/login')
    }
    if(searchQuery) {
      dispatch(searchUser(searchQuery))
    } else {
      dispatch(getAllUsers())
    }
    return()=>{
      dispatch(reset())
    }
  }, [navigate, dispatch, admin, searchQuery])

  const handleSearchchange=(e) => {
    e.preventDefault()
    setSearchQuery(e.target.value)
  }
  if(!admin) {
    return null
  }

  const onAddUser = (e) => {
    e.preventDefault()
    navigate('/admin/adduser')
  }
  
  return (
    <div className='container-1'>
      <div className="nav">
        <h3>Admin Dashboard</h3>

        <div style={{display:'flex'}}  className='form-group'>
            <input style={{height:'35px'}} className='form-control' placeholder='Enter your username'  type='text'
          value={searchQuery}
          onChange={handleSearchchange} />
            <button style={{height:'35px',marginLeft:'10px'}} className='btn-1'> <FaSearch/>Search</button>
        </div>
      </div>

      <div className="profile">
        <div className="profile-image" >
          <img  src={admin?.profileUrl ? admin.profileUrl :  "https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small/user-profile-icon-free-vector.jpg"} alt="profile"  />
        </div>

        <div className="profile-card">
          <div className="profile-info">
            <p>Name : {admin && admin.name}</p>
            <p>Email : {admin && admin.email}</p>
          </div>

          <div className="profile-buttons">
            <button onClick={onAddUser} className='btn'>Add User</button>
            <button onClick={onLogout} className='btn'  > logout</button>
          </div>
        </div>
      </div>
      <UserLists />
    </div>
  )
}

export default AdminDashboard