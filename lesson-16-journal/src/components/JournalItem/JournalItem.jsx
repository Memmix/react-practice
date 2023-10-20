import { BiMessageSquareDetail } from 'react-icons/bi'
import styles from './JournalItem.module.css'

const JournalItem = ({ item }) => {
	console.log(item)
	return (
		<div className={styles.journalItem}>
			<div className={styles.header}>
				<BiMessageSquareDetail className={styles.logo} />
				<h3>{item.title}</h3>
			</div>
			<div className={styles.content}>
				<span className={styles.date}>{item.date}</span>
				<span className={styles.text}>{item.description}</span>
			</div>
		</div>
	)
}

export default JournalItem
