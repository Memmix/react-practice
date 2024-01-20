import cn from 'classnames'
import { LuShoppingCart } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'
import styles from './ProductCard.module.css'
import { IProductCardProps } from './ProductCard.props'

function ProductCard(props: IProductCardProps) {
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
					<Button className={cn(styles['add-to-cart-btn'])}>
						<LuShoppingCart />
					</Button>
				</div>
			</div>
		</Link>
	)
}

export default ProductCard
