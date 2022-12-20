import express from 'express'
import {addOrderItem,getOrderById,updateOrderToPaid,getMyOrders,getOrders,updateOrderToDilevered} from '../controllers/orderControllers.js'
import {protect,isAdmin} from '../Middelwares/authMiddlware.js'
const router=express.Router()
router.route('/')
    .post(protect,addOrderItem)
    .get(protect,isAdmin,getOrders)
router.route('/myOrders').get(protect,getMyOrders)
router.route('/:id').get(protect,getOrderById)
router.route('/:id/payed').put(protect,updateOrderToPaid)
router.route('/:id/dilevered').put(isAdmin,protect,updateOrderToDilevered)



export default router