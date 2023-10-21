import { useContext } from 'react'
import { ThemeContext } from '../../context/theme.context'

function SelectTheme(){
	const {themeId, setThemeId} = useContext(ThemeContext)
	
	const changeTheme = (e) => {
		setThemeId(Number(e.target.value))
	}

	return (
		<select name="user" id="user" value={themeId} onChange={changeTheme}>
			<option value="1">dark</option>
			<option value="2">white</option>
		</select>
	)
}

export default SelectTheme