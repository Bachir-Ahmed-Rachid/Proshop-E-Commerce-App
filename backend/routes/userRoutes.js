import express from 'express'
import {authUser,getUserProfile,registreUser,upadateUserProfile,getUsers,deleteUser,getUserById,updateUser} from '../controllers/userControllers.js'
import {protect,isAdmin} from '../Middelwares/authMiddlware.js'
const router=express.Router()
router
    .route('/')
    .post(registreUser)
router
    .route('/')
    .get(protect,isAdmin,getUsers)


router
    .post('/login',authUser)
router
    .route('/profile')
    .get(protect,getUserProfile)
    .put(protect,upadateUserProfile)

    router
    .route('/:id')
    .delete(protect,isAdmin,deleteUser)
    .get(protect,isAdmin,getUserById)
    .put(protect,isAdmin,updateUser)

export default router