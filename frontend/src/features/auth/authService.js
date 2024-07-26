import axios from 'axios'

const API_URL = '/api/users/'

const register = async(userData)=>{
  const response = await axios.post(API_URL,userData )
  
  if(response.data){
    localStorage.setItem('user',JSON.stringify(response.data))
  }
  return response.data
}

const login = async(userData)=>{
    const response = await axios.post(API_URL +'login' ,userData )
    if(response.data){
      localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
  }

const logout = () =>{
    localStorage.removeItem('user')
}

const editUserDetails=async(token,userId,name,email)=>{
  console.log("token",token);
  const config={
      headers:{
          Authorization:`Bearer ${token}`
      }
  }
console.log("edit in authservice",userId,name,email);
  const response=await axios.put(API_URL+userId,{userId,name,email},config)
  if(response.data){
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  
  return response.data
}

// Profile Uplaod
const profileUpload = async(token, url) => {
  const config = {
      headers : {
          Authorization: `Bearer ${token}`
      }
  }
  console.log("profile url in service",url);
  const liveUser = JSON.parse(localStorage.getItem('user'))
  const response = await axios.post(API_URL + 'profile/upload',{url, liveUser}, config)

const userString = localStorage.getItem('user');

if (userString) {
  const user = JSON.parse(userString);
  user.profileUrl = response.data.profileUrl;
  localStorage.setItem('user', JSON.stringify(user));
}

  return response.data
}


const authService = {
    register,
    logout,
    login,
    editUserDetails,
    profileUpload
}

export default authService