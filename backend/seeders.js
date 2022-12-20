import mongoose from 'mongoose'
import dotenv from 'dotenv'
import products from './data/products.js'
import users from './data/users.js'
import Product from './models/productModel.js'
import User from './models/userModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'
dotenv.config()
await connectDB()
const importData=async()=>{
    try {
        await Order.deleteMany()
        await User.deleteMany()
        await Product.deleteMany()

        const createdUsers=await User.insertMany(users)
        const adminUer=createdUsers[0]._id
        const sapmleProducts=products.map(product=>{
            return {...product,user:adminUer}
         })
        await Product.insertMany(sapmleProducts)
        console.log('Data Imported')
        process.exit()
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}
const destroyData=async()=>{
    try {
        await Order.deleteMany()
        await User.deleteMany()
        await Product.deleteMany()
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

if(process.argv[2]==='-d'){
    destroyData()
}else{
    importData()
}