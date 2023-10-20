import { IoIosJournal } from 'react-icons/io'
import styles from './Header.module.css'

const Header = () => {
	return (
		<div className={styles.header}>
			<IoIosJournal className={styles.logo} />
			<h2>My Journal</h2>
		</div>
	)
}

export default Header
