import { FiMinus, FiPlus, FiX } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions, editProductsInCart } from '../../store/cart.slice'
import { AppDispatch, RootState } from '../../store/store'
import styles from './CartProduct.module.css'
import { ICartProductsProps } from './CartProduct.props'

function CartProduct(props: ICartProductsProps) {
	const dispatch = useDispatch<AppDispatch>()

	const profile = useSelector((state: RootState) => {
		return state.user.profile
	})

	const plusProduct = () => {
		dispatch(cartActions.add(props._id))

		const data = {
			option: 'add',
			userId: profile?._id,
			productId: props._id,
			count: 1
		}

		dispatch(editProductsInCart(data))
	}

	const minusProduct = () => {
		dispatch(cartActions.minus(props._id))

		const data = {
			option: 'minus',
			userId: profile?._id,
			productId: props._id,
			count: 1
		}

		dispatch(editProductsInCart(data))
	}

	const removeProduct = () => {
		dispatch(cartActions.remove(props._id))

		const data = {
			option: 'remove',
			userId: profile?._id,
			productId: props._id,
			count: 0
		}

		dispatch(editProductsInCart(data))
	}

	const editProductCount = () => {
		const data = {
			option: 'change',
			userId: profile?._id,
			productId: props._id,
			count: Number(props.count)
		}

		dispatch(editProductsInCart(data))
	}

	const changeProductCount = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number(e.target.value)
		if (value >= 0 && !isNaN(value)) {
			dispatch(cartActions.change({ product: props._id, count: value }))
		} else if (value < 0) e.target.value = '0'
	}

	return (
		<div className={styles['cart-product']}>
			<div className={styles['cart-product__info']}>
				<div
					className={styles['cart-product__image']}
					style={{ backgroundImage: `url(${props.image})` }}
				></div>
				<div className={styles['cart-product__text']}>
					<div className={styles['cart-product__name']}>{props.title}</div>
					<div className={styles['cart-product__price']}>
						{props.price} руб.
					</div>
				</div>
			</div>
			<div className={styles['cart-product__actions']}>
				<button
					className={styles['cart-product__plus-button']}
					onClick={plusProduct}
				>
					<FiPlus />
				</button>
				<input
					type='text'
					className={styles['cart-product__count']}
					value={props.count.toString()}
					onChange={changeProductCount}
					onBlur={() => {
						editProductCount()
					}}
				/>
				<button
					className={styles['cart-product__minus-button']}
					onClick={minusProduct}
				>
					<FiMinus />
				</button>
				<button
					className={styles['cart-product__remove']}
					onClick={removeProduct}
				>
					<FiX />
				</button>
			</div>
		</div>
	)
}

export default CartProduct
