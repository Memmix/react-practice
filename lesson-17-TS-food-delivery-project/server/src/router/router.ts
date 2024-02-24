import { Router } from 'express'
import {
	addProductToCart,
	getCartByUserId
} from '../controllers/cart-controller'
import {
	getAllProducts,
	getProductById,
	getProfile,
	loginUser,
	registerUser
} from '../controllers/user-controller'

const router = Router()

// user routes
router.post('/auth/register', registerUser)
router.post('/auth/login', loginUser)
router.get('/getProfile', getProfile)
router.get('/products', getAllProducts)
router.get('/products/:id', getProductById)

// cart routes
router.get('/cart/get/:userId', getCartByUserId)
router.post('/cart/add/', addProductToCart)

export default router
