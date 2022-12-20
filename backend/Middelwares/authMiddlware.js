import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

const protect=asyncHandler(async(req,res,next)=>{
    let token
    const{authorization}=req.headers
    if(authorization && authorization.startsWith('Bearer')){
        try {
            token=authorization.split(' ')[1]
            const decode=jwt.verify(token,process.env.JWT_SECRET)
            req.user=await User.findById(decode.id)
            next()
        } catch (error) {
            res.status(401)
            throw new Error('Authorization failed,token failed')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Authorization failed,no token')
    }
    
    
})

const isAdmin=asyncHandler(async(req,res,next)=>{
    const {user}=req
    if( user && user.isAdmin){
        try {
            next()
        } catch (error) {
            res.status(401)
            throw new Error('Not Autorized as an admin')
        }
    }}
    )
export {protect,isAdmin}