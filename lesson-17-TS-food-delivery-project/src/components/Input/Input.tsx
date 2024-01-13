import cn from 'classnames'
import styles from './Input.module.css'
import { IInputProps } from './Input.props'

function Input({ isValid = true, className, ...props }: IInputProps) {
	return (
		<input
			className={cn(styles.button, className, {
				[styles['invalid']]: !isValid
			})}
			{...props}
		/>
	)
}

export default Input
