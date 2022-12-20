import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
const getProducts=asyncHandler(async(req,res)=>{
    const pageSize=4
    const page=Number(req.query.pageNumber) || 1
    const keyword=req.query.keyword ? {
        name:{
            $regex:req.query.keyword,
            $options:'i'
        }
    }:{}
    const count=await Product.countDocuments({...keyword})
    const products=await Product.find({...keyword}).limit(pageSize).skip(pageSize*(page-1))
    res.json({products,page,pages:Math.ceil(count/pageSize)})
})
const getProductsById=asyncHandler(async(req,res)=>{
    const product=await Product.findById(req.params.id)
    if(product){
        res.json(product)
    }else{
        res.status(404)
        throw new Error('Product Not Found')
    }
})

 
const deleteProduct=asyncHandler(async(req, res)=>{
    const product=await Product.findById(req.params.id)
    if(product){
        await product.remove()
        res.json({message:'Product deleted'})
    }else{
        res.status(404)
        throw new Error('Product Not Found')
    }
})

const creatProduct=asyncHandler(async(req,res)=>{
    const product=new Product({
        name: 'sample',
        image: '/images/sample.jpg',
        user:req.user._id,
        description:'description sample',
        brand: 'brand simple',
        category: 'category simple',
        price: 0,
        countInStock: 0,
        numReviews: 0

    })
    const createdProduct=await product.save()
    res.status(201).json(createdProduct)
})


const updateProduct=asyncHandler(async(req,res)=>{
    const{  
    name,
    image,
    description,
    brand,
    category,
    price,
    countInStock,
    numReviews}=req.body
    const product=await Product.findById(req.params.id)
    if(product){
    product.name=name,
    product.image=image,
    product.description=description,
    product.brand=brand,
    product.category=category,
    product.price=price,
    product.countInStock=countInStock,
    product.numReviews=numReviews
    const updatedProduct=await product.save()
    res.json(updatedProduct)
    }else{
        res.status(404)
        throw new Error('Product Not Found')
    }
})
const creatProductReview=asyncHandler(async(req,res)=>{
    const{  
        rating,comment
    }=req.body
    const product=await Product.findById(req.params.id)
    if(product){
        const alreadyReviewed=product.reviews.find(r=>r.user.toString()===req.user._id.toString())
        if(alreadyReviewed){
            res.status(400)
            throw new Error('Product product already reviwed')
        }
        const review={
            name:req.user.name,
            rating:Number(rating),
            comment,
            user:req.user._id
        }
        product.reviews.push(review)
        product.numReviews=product.reviews.length
        product.rating=product.reviews.reduce((acc,item)=>item.rating+acc,0)/product.reviews.length
        await product.save()
        res.status(201).json({message:'Review added'})
    }else{
        res.status(404)
        throw new Error('Product Not Found')
    }
})

const getTopProducts=asyncHandler(async(req,res)=>{
const product=await Product.find({}).sort({rating:-1}).limit(3)
res.json(product)
})
export{getProducts,getProductsById,deleteProduct,creatProduct,updateProduct,creatProductReview,getTopProducts}


