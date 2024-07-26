const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const registerUser = asyncHandler(async(req,res)=>{
    const {name,email,password} = req.body
    if(!name ||!email ||!password){
        res.status(400)
        throw new Error('Please add all field')
    }
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User already Exists')
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const user = await User.create({
        name,
        email,
        password:hashedPassword,
    })
    if(user){
      res.status(201).json({
        _id:user.id,
        name:user.name,
        email:user.email,
        profileUrl:user.profileUrl,
        token:generateToken(user.id)
      })     
    }
    else{
        res.status(400)
        throw new Error('Invalid user data')
      }
})
const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    const user = await User.findOne({email})
    if(user &&  (await bcrypt.compare(password,user.password))){
        res.json({
            _id:user.id,
            name:user.name,
            email:user.email,
            profileUrl:user.profileUrl,
            token:generateToken(user.id)
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid Credentials')
    }
})
const getMe = asyncHandler(async(req,res)=>{
    
    res.status(200).json(req.user)
})

const editUser=asyncHandler(async(req,res)=>{
    const {userId,name,email}=req.body
    console.log("headers",req.headers);
    console.log("edit in controller",userId,name,email);
    const user=await User.findByIdAndUpdate(userId,{name,email},{new:true})
  
    if(user){
        res.status(200).json({
          _id: user.id,
          name: user.name,
          email: user.email,
          profileUrl: user.profileUrl,
          token: req.token
        })
    }else{
        res.status(404)
        throw new Error('User not Found')
    }
  })

  const profileUpload = asyncHandler(async (req, res) => {
    const url = req.body.url;
    console.log("profile url",url);
  
    const user = await User.findByIdAndUpdate(req.user.id, {
      profileUrl: url
    }, { new: true });
  
    
    res.status(200).json(user);
  });

const generateToken = (id) =>{
   return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'})
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
    editUser,
    profileUpload
}