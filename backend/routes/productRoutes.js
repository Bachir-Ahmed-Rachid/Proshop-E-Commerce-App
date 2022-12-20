import express from 'express'
import {getProducts,
    getProductsById,
    deleteProduct,
    creatProduct,
    updateProduct,
    creatProductReview,
    getTopProducts} from '../controllers/productControllers.js'
import {protect,isAdmin} from '../Middelwares/authMiddlware.js'
const router=express.Router()

router.route('/').get(getProducts).post(protect,isAdmin,creatProduct)
router.route('/top').get(getTopProducts)
router.route('/:id/reviews').post(protect,creatProductReview)
router.route('/:id')
    .get(getProductsById)
    .delete(protect,isAdmin,deleteProduct)
    .put(protect,isAdmin,updateProduct)


export default router