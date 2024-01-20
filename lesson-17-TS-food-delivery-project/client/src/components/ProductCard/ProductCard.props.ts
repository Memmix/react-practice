export interface IProductCardProps
	extends React.HTMLAttributes<HTMLDivElement> {
	id: string
	title: string
	description: string
	image: string
	price: number
}
