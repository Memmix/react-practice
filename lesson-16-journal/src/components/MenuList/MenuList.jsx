import { v4 as uuidv4 } from 'uuid'
import styles from './MenuList.module.css'
import JournalItem from '../JournalItem/JournalItem'

const MenuList = ({ items }) => {
	console.log(items)

	return (
		<>
			{items.length === 0 ? (
				<p className={styles.text}>Нет воспоминаний...</p>
			) : (
				items.map((item) => <JournalItem item={item} key={uuidv4()} />)
			)}
		</>
	)
}

export default MenuList
