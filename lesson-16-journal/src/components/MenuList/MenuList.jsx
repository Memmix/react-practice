import styles from './MenuList.module.css'
import JournalItem from '../JournalItem/JournalItem'

const MenuList = ({ items, selectItem, deleteItem }) => {
	return (
		<>
			{items.length === 0 ? (
				<p className={styles.text}>Нет воспоминаний...</p>
			) : (
				items.map((item) => (
					<JournalItem
						item={item}
						key={item.id}
						// Мы не можем повесить события на пользовательские компоненты, поэтому прокидывает дальше и вешаем внутри на div
						onClick={() => {
							selectItem(item)
						}}
						deleteItem={deleteItem}
					/>
				))
			)}
		</>
	)
}

export default MenuList
