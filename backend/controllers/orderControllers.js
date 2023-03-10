import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
const addOrderItem=asyncHandler(async(req,res)=>{
    const{shippingAddress,paymentMethode,orderItems,itemsPrice,shippingPrice,taxPrice,totalPrice}=req.body
        if(orderItems && orderItems.length===0){
            res.status(400)
            throw new Error('No Order Items')
    }else{
        const order=new Order({user:req.user._id,shippingAddress,paymentMethode,orderItems,itemsPrice,shippingPrice,taxPrice,totalPrice})
        const createdOrder=await order.save()
        res.status(201).json(createdOrder)

    }
})

const getOrderById=asyncHandler(async(req,res)=>{
    const{id}=req.params
    const order=await Order.findById(id).populate('user','name email')
    if(order){
        res.json(order)
    }else{
        res.status(404)
        throw new Error('Order not Found')
    }
})

const updateOrderToPaid=asyncHandler(async(req,res)=>{
    const{id}=req.params
    const order=await Order.findById(id)
    if(order){
        order.isPaid=true
        order.paidAt=Date.now()
        order.paymenetResult={
            id:req.body.id,
            status:req.body.status,
            update_time:req.body.update_time,
            email_adsress:req.body.email_adsress
        }
        const updateOrder=order.save()
        res.json(updateOrder)
    }else{
        res.status(404)
        throw new Error('Order not Found')
    }
})

const getMyOrders=asyncHandler(async(req,res)=>{
    
    const myOrder=await Order.find({user:req.user._id})
    
    res.json(myOrder)
    
})


const getOrders=asyncHandler(async(req,res)=>{
    
    const orders=await Order.find({}).populate('user','id name')
    
    res.json(orders)
    
})


const updateOrderToDilevered=asyncHandler(async(req,res)=>{
    const{id}=req.params
    const order=await Order.findById(id)
    if(order){
        order.isDelivered=true
        order.DeliveredAt=Date.now()
        const updateOrder=order.save()
        res.json(updateOrder)
    }else{
        res.status(404)
        throw new Error('Order not Found')
    }
})
export{addOrderItem,getOrderById,updateOrderToPaid,getMyOrders,getOrders,updateOrderToDilevered}