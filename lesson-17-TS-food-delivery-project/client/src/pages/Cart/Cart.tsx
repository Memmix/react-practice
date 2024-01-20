import cn from 'classnames'
import Heading from '../../components/Heading/Heading'
import styles from './Cart.module.css'

export function Cart() {
	return (
		<>
			<div className={cn(styles['header'])}>
				<Heading>Cart</Heading>
			</div>
		</>
	)
}
