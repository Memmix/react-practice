import { Suspense } from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import { IProduct } from '../../interfaces/product.interface'

export function Product() {
	const data = useLoaderData() as { data: IProduct }
	// const data = useLoaderData() as IProduct
	// return <>Product {data.title}</>

	return (
		<>
			{/* Await работает, так, что как только сработает resolve промиса, мы получим data */}
			{/* resolve - что нужно вернуть в наш компонент */}
			<Suspense fallback={<div>Loading...</div>}>
				<Await resolve={data.data}>
					{({ data }: { data: IProduct }) => (
						<>
							<h1>{data.title}</h1>
							<p>{data.description}</p>
						</>
					)}
				</Await>
			</Suspense>
		</>
	)
}
