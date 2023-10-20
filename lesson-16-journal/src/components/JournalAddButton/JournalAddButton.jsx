import styles from './JournalAddButton.module.css'
import { BiMessageSquareAdd } from 'react-icons/bi'
const JournalAddButton = () => {
	return (
		<>
			<button className={styles.addButton}>
				<BiMessageSquareAdd />
				<span className={styles.text}>Новое воспоминание</span>
			</button>
		</>
	)
}

export default JournalAddButton
