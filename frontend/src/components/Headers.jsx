import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import { Link,useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'

 const Headers = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const{user} = useSelector((state)=>state.auth)
  // const {admin} = useSelector((state)=>{state.adminAuth})
  const onLogout = () =>{
    dispatch(logout())
    // navigate('/')
  }
   return (
     <header className='header'>
          <div className="logo">
            <Link to="/" >GoalSetter</Link>
          </div>
          <ul>
            {user?(
              <li>
                 <button className='btn' onClick={onLogout }>
                 <FaSignOutAlt/>Logout
                 </button> 
              </li>
            ):(
              <>
              <li>
              <Link to='/login'>  <FaSignInAlt/>Login</Link>
              </li>
              <li>
                <Link to='/register'><FaUser/>register</Link>
              </li>
              </>
            )}
          </ul>
     </header>
   )
 }
 
 export default Headers