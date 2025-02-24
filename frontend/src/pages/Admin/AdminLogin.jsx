import {useEffect, useState} from 'react'
import {FaUser} from 'react-icons/fa'
import Spinner from '../../components/Spinner'
import {adminLogin,reset} from '../../features/AdminAuth/adminAuthSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

function AdminLogin(){
    const [formData,setFormData] = useState({
        email:'',
        password:''
    })

    const {email,password} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {admin,isLoading,isError,isSuccess,message} = useSelector(
        (state) =>state.adminAuth
    );

    useEffect(()=>{
        if(isError){
            toast.error(message)
            console.log("error");
        }
        if(isSuccess || admin){
            navigate('/admin')
        }
        dispatch(reset())
    },[admin,isError,isSuccess,dispatch,message,navigate])
    const onChange = (e) =>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    const onSubmit = (e) =>{
        e.preventDefault()
        const adminData = {
            email,
            password
        }
        
        dispatch(adminLogin(adminData))
    }
    if(isLoading){
        return <Spinner/>
    }

    return(
        <div className='adminLogin-card'>
            <section className="heading">
                <h1>
                    <FaUser/>AdminLogin
                </h1>
                <p>Authorized Login only</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input type="email"
                              className='form-control'
                              id='email'
                              name='email'
                              value={email}
                              placeholder='Enter your email'
                              onChange={onChange}
                            />
                        </div>
                         <div className="form-group">
                            <input type="password"
                            className='form-control'
                            id='password'
                            name='password'
                            value={password}
                            placeholder='Enter password'
                            onChange={onChange}
                            />
                         </div>
                         <div className="formgroup">
                            <button type='submit' className='btn btn-block'>
                                Login
                            </button>
                         </div>
                </form>
            </section>

        </div>
    )
}

export default AdminLogin
