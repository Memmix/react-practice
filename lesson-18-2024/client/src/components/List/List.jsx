/* eslint-disable react/prop-types */
import cn from 'classnames'
import styles from './List.module.css'
// import uuid
import { v4 as uuid } from 'uuid'

const List = ({ title, bgColor, listItems, l2, setL2 }) => {
	const deleteElement = index => {
		setL2(l2.filter((el, i) => i != index))
	}

	return (
		<div className={cn(styles['container'], styles[bgColor])}>
			<h2>{title}</h2>
			<ul>
				{listItems.map((el, index) => {
					return (
						<li
							className={cn(styles['item'])}
							onClick={() => {
								deleteElement(index)
							}}
							key={uuid()}
						>
							{el}
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default List
