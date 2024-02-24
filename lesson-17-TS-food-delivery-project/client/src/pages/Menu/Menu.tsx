import axios, { AxiosError } from 'axios'
import cn from 'classnames'
import { ChangeEvent, useEffect, useState } from 'react'
import { LuSearch } from 'react-icons/lu'
import Heading from '../../components/Heading/Heading'
import ProductCard from '../../components/ProductCard/ProductCard'
import Search from '../../components/Search/Search'
import { PREFIX } from '../../helpers/API'
import { IProduct } from '../../interfaces/product.interface'
import styles from './Menu.module.css'

export function Menu() {
	const [products, setProducts] = useState<IProduct[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | undefined>()
	const [filter, setFilter] = useState<string>('')

	const search = (e: ChangeEvent<HTMLInputElement>) => {
		setFilter(e.target.value)
	}

	useEffect(() => {
		getMenu()
	}, [])

	const getMenu = async () => {
		try {
			setIsLoading(true)
			const { data } = await axios.get(`${PREFIX}/products`, {
				withCredentials: true
			})
			setProducts(data)
			setIsLoading(false)
		} catch (err) {
			console.error(err)
			if (err instanceof AxiosError) {
				setError(err.message)
			}
			setIsLoading(false)
		}
	}

	return (
		<>
			<div className={cn(styles['header'])}>
				<Heading>Menu</Heading>
				<div className={cn(styles['search-container'])}>
					<LuSearch className={cn(styles['search-icon'])} />
					<Search
						placeholder='type to search...'
						onChange={e => {
							search(e)
						}}
					/>
				</div>
			</div>

			<div className={cn(styles['products-container'])}>
				{error && (
					<>
						Oops! something going wrong:
						<br />
						{error}
					</>
				)}
				{!isLoading &&
					products.map(
						product =>
							product.title.toLowerCase().includes(filter.toLowerCase()) && (
								<ProductCard
									key={product._id}
									id={product._id}
									title={product.title}
									price={product.price}
									description={
										product.description.length > 44
											? product.description.slice(0, 44) + '...'
											: product.description
									}
									image={product.image}
								/>
							)
					)}
				{/* прелодер */}
				{isLoading && <>loading products...</>}
			</div>
		</>
	)
}
