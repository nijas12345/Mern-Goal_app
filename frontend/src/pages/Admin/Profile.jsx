import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editUser, profileUpdate } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if(!user) {
      navigate("/login")
    }
  }, [user, navigate, dispatch])

  const [image, setImage] = useState('')

  const uploadImage = (e) => {
    e.preventDefault();
    console.log("image",image);
    if(!image) {
      toast.error('please upload a file')
      return;
    }   
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
    data.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);

    fetch("https://api.cloudinary.com/v1_1/dxmbb9sei/image/upload", {
      method: "post",
      body: data,
    })
    .then((resp) => resp.json())
    .then((data) => {
        console.log("data",data);
      dispatch(profileUpdate(data.url))
    })
    .catch((err) => console.log(err))
  }

  const handleEdit = (userId, name, email) => {
    const newName = prompt("Enter new name:", name);
    const newEmail = prompt("Enter new Email", email);
    if(newName === null || newEmail === null) {
      return;
    }
    if(newName && newEmail) {
        console.log(newName);
      dispatch(editUser({ userId, name:newName, email:newEmail }))
    }
  }

  return (
    <div>
      <div>User Dashboard</div>
      <div className="profile">
        <div className="profile-image">
        <img
            src={
              user?.profileUrl
                ? user.profileUrl
                : "https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small/user-profile-icon-free-vector.jpg"
            }
            alt="profile"
          />
        </div>

        <div className="profile-card">
          <div className="profile-info">
            <p>Name: {user && user.name} </p>
            <p>Email: {user && user.email} </p>
          </div>

          <div className="profile-buttons">
            <button 
              className='btn-1'
              onClick={()=>handleEdit(user._id, user.name, user.email)}
              >Edit Profile
            </button>

            <div className="upload-button">
              <div class="custom-file-upload">
                <label for="profile" class="custom-button" style={{marginLeft:"80px"}}>
                  Choose File
                </label>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  name="profile"
                  id="profile"
                  class="hidden-input"
                />
              </div>

              <button className="btn" onClick={uploadImage}>
                Upload!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile