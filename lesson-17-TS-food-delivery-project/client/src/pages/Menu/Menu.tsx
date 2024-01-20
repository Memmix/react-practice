import cn from 'classnames'
import { LuSearch } from 'react-icons/lu'
import Heading from '../../components/Heading/Heading'
import ProductCard from '../../components/ProductCard/ProductCard'
import Search from '../../components/Search/Search'
import styles from './Menu.module.css'

export function Menu() {
	return (
		<>
			<div className={cn(styles['header'])}>
				<Heading>Menu</Heading>
				<div className={cn(styles['search-container'])}>
					<LuSearch className={cn(styles['search-icon'])} />
					<Search placeholder='type to search...' />
				</div>
			</div>

			<div className={cn(styles['products-container'])}>
				<ProductCard
					id='1'
					title='Пицца "ПЕППЕРОНИ"'
					price={17.99}
					description='секретный соус, сыр моцарелла, салями, маслины, орегано'
					image='https://takiepirogi.by/assets/images/products/13/pepperoni.jpg'
				/>
				<ProductCard
					id='2'
					title='Пицца "ПЕППЕРОНИ #2"'
					price={17.99}
					description='секретный соус, сыр моцарелла, салями, маслины, орегано'
					image='https://takiepirogi.by/assets/images/products/13/pepperoni.jpg'
				/>
				<ProductCard
					id='3'
					title='Пицца "ПЕППЕРОНИ #3"'
					price={17.99}
					description='секретный соус, сыр моцарелла, салями, маслины, орегано'
					image='https://takiepirogi.by/assets/images/products/13/pepperoni.jpg'
				/>
			</div>
		</>
	)
}
