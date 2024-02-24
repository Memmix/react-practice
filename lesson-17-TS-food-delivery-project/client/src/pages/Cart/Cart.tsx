import axios from 'axios'
import cn from 'classnames'
import { useEffect, useState } from 'react'
import { FiCheck } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import CartProduct from '../../components/CartProduct/CartProduct'
import Heading from '../../components/Heading/Heading'
import { PREFIX } from '../../helpers/API'
import { IProduct } from '../../interfaces/product.interface'
import { RootState } from '../../store/store'
import styles from './Cart.module.css'

export function Cart() {
	const DELIVERY_PRICE = 4.99

	const products = useSelector((state: RootState) => state.cart.products)
	const [cartProducts, setCartProducts] = useState<IProduct[]>([])
	const [foodPrice, setFoodPrice] = useState<number>(0)
	const [totalPrice, setTotalPrice] = useState<number>(0)

	const getProduct = async (id: string) => {
		const { data } = await axios.get<IProduct>(`${PREFIX}/products/${id}`)
		return data
	}

	const loadAllProducts = async () => {
		const productData = await Promise.all(
			products.map(product => getProduct(product.product))
		)
		setCartProducts(productData)
	}

	useEffect(() => {
		loadAllProducts()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [products])

	useEffect(() => {
		const getFoodPrice = () => {
			return cartProducts.reduce((acc, el) => {
				const currElCount = products.find(el2 => el2.product === el._id)?.count
				if (currElCount) return (acc += currElCount * el.price)
				else return acc
			}, 0)
		}

		setFoodPrice(getFoodPrice())
		setTotalPrice(foodPrice + DELIVERY_PRICE)
	}, [cartProducts, foodPrice, products])

	return (
		<>
			<div className={cn(styles['header'])}>
				<Heading>Cart</Heading>
			</div>
			<div className={cn(styles['cart-container'])}>
				<div className={cn(styles['products-container'])}>
					{products.map(p => {
						const product = cartProducts.find(el => el._id === p.product)
						if (!product) return
						return (
							<CartProduct
								key={p.product}
								count={p.count}
								{...product}
							></CartProduct>
						)
					})}
				</div>
				<div className={cn(styles['order-container'])}>
					<p className={cn(styles['food-price'])}>
						<span>Food:</span>
						<span className={cn(styles['order-data'])}>{foodPrice} руб.</span>
					</p>
					<p className={cn(styles['delivery-price'])}>
						<span>Delivery:</span>
						<span className={cn(styles['order-data'])}>
							{DELIVERY_PRICE} руб.
						</span>
					</p>
					<p className={cn(styles['total-price'])}>
						<span>Total:</span>
						<span className={cn(styles['order-data'])}>{totalPrice} руб.</span>
					</p>
					<div className={cn(styles['promocode-container'])}>
						<input
							type='text'
							className={cn(styles['input'])}
							placeholder='enter promocode...'
						/>
						<button className={cn(styles['promocode-btn'])}>
							<FiCheck />
						</button>
					</div>
					<button className={cn(styles['send-btn'])}>Send</button>
				</div>
			</div>
		</>
	)
}
