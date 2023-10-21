import { IoIosJournal } from 'react-icons/io'
import styles from './Header.module.css'
import SelectTheme from '../SelectTheme/SelectTheme'

const Header = () => {
	return (
		<div className={styles.header}>
			<IoIosJournal className={styles.logo} />
			<h2>My Journal</h2>
			<SelectTheme />
		</div>
	)
}

export default Header
