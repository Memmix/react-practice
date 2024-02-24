import cn from 'classnames'
import { MouseEvent } from 'react'
import { LuShoppingCart } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { cartActions, editProductsInCart } from '../../store/cart.slice'
import { AppDispatch, RootState } from '../../store/store'
import Button from '../Button/Button'
import styles from './ProductCard.module.css'
import { IProductCardProps } from './ProductCard.props'

function ProductCard(props: IProductCardProps) {
	const dispatch = useDispatch<AppDispatch>()

	const profile = useSelector((state: RootState) => {
		return state.user.profile
	})

	const add = (e: MouseEvent) => {
		e.preventDefault()
		dispatch(cartActions.add(props.id))

		const data = {
			option: 'add',
			userId: profile?._id,
			productId: props.id,
			count: 1
		}
		dispatch(editProductsInCart(data))
	}

	return (
		<Link className={cn(styles['link'])} to={`/product/${props.id}`}>
			<div className={cn(styles['card-container'])}>
				<div className={cn(styles['card-image-container'])}>
					<p className={cn(styles['price'])}>{props.price} руб.</p>

					<img src={props.image} alt='card image' />
				</div>
				<div className={cn(styles['text-info'])}>
					<p className={cn(styles['title'])}>{props.title}</p>
					<p className={cn(styles['description'])}>{props.description}</p>
					<Button className={cn(styles['add-to-cart-btn'])} onClick={add}>
						<LuShoppingCart />
					</Button>
				</div>
			</div>
		</Link>
	)
}

export default ProductCard
