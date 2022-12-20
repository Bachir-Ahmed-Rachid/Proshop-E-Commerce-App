import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import genrateToken from '../Utils/generateToken.js'
const authUser=asyncHandler(async(req,res)=>{
    const{email,password}=req.body
    const user=await User.findOne({email})
    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:genrateToken(user._id)

        })
    }else{
        res.status(401)
        throw new Error('Invalide email or password')
    }
})
const registreUser=asyncHandler(async(req,res)=>{
    const{name,email,password}=req.body
    const isUserExist=await User.findOne({email})
    if(isUserExist){
        res.status(400)
        throw new Error('User already exist')
    }
    const user=await User.create({name,email,password})
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:genrateToken(user._id)

        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const getUserProfile=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id)
    if(user){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
        })
    }else{
        res.status(404)
        throw new Error('User not Found')
    }
})
const upadateUserProfile=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id)
    if(user){
    user.name=req.body.name || user.name
    user.email=req.body.email || user.email
    if(req.body.password){
        user.password=req.body.password 
    }
    const updatedUer=await user.save()
        res.json({
            _id:updatedUer._id,
            name:updatedUer.name,
            email:updatedUer.email,
            isAdmin:updatedUer.isAdmin,
        })
    }else{
        res.status(404)
        throw new Error('User not Found')
    }
})

const getUsers=asyncHandler(async(req,res)=>{
    const users=await User.find({})
     res.json(users)

})

const deleteUser=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.params.id)
    if(user){
        user.remove()
        res.json({Message:'User deleted'})

    }
    res.status(404)
    throw new Error('User not Found')

})

const getUserById=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.params.id).select('-password')
    if(user){
        res.json(user)
    }else{
        res.status(404)
        throw new Error('User not Found')
    }
})
const updateUser=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.params.id)
    if(user){
    user.name=req.body.name || user.name
    user.email=req.body.email || user.email
    user.isAdmin=req.body.isAdmin 
    const updatedUer=await user.save()
        res.json({
            _id:updatedUer._id,
            name:updatedUer.name,
            email:updatedUer.email,
            isAdmin:updatedUer.isAdmin,
        })
    }else{
        res.status(404)
        throw new Error('User not Found')
    }
})
export{authUser,getUserProfile,registreUser,upadateUserProfile,getUsers,deleteUser,getUserById,updateUser}