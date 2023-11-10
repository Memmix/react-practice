import cn from 'classnames'
import { useContext } from 'react'
import { BiMessageSquareDetail } from 'react-icons/bi'
import { ThemeContext } from '../../context/theme.context'

import styles from './JournalItem.module.css'

const JournalItem = ({ item, onClick }) => {
	const { themeId } = useContext(ThemeContext)

	return (
		<div
			className={cn(
				styles.journalItem,
				{ [styles['white']]: themeId === '1' },
				{ [styles['dark']]: themeId === '2' }
			)}
			onClick={onClick}
		>
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
