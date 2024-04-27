import cn from 'classnames'
import { useState } from 'react'
import styles from './App.module.css'
import Button from './components/Button/Button'
import List from './components/List/List'
import getData from './utils/getData'

function App() {
	const [l1, setL1] = useState([
		'элемент списка',
		'элемент списка',
		'элемент списка',
		'элемент списка',
		'элемент списка',
		'элемент списка',
		'элемент списка',
		'элемент списка',
		'элемент списка'
	])
	const [l2, setL2] = useState([
		'элемент списка1',
		'элемент списка2',
		'элемент списка3',
		'элемент списка4',
		'элемент списка5',
		'элемент списка6',
		'элемент списка7',
		'элемент списка8',
		'элемент списка9',
		'элемент списка10',
		'элемент списка11',
		'элемент списка12',
		'элемент списка13',
		'элемент списка14'
	])
	const [l3, setL3] = useState([])
	const [l4, setL4] = useState(['fff', 'asds'])

	const resetLists = () => {
		setL1([])
		setL2([])
	}

	const getDataFromDB = async () => {
		try {
			const data = await getData('https://jsonplaceholder.typicode.com/posts')
			setL3(data.map(el => el.title))
		} catch (err) {
			console.error(err)
		}
	}

	const addNewItem = () => {
		let item = prompt('Введите название')
		setL4([...l4, item])
	}

	return (
		<div className={styles['container']}>
			<h1>Hello World</h1>
			<div className={styles['list-container']}>
				<List title='Список #1' bgColor='red' listItems={l1} />
				<List
					title='Список #2'
					bgColor='orange'
					listItems={l2}
					l2={l2}
					setL2={setL2}
				/>
				<List title='Список #3' bgColor='aqua' listItems={l3} />
				<List title='Список #4' bgColor='lime' listItems={l4} />
			</div>
			<div className={cn(styles['button-container'])}>
				<Button onClick={resetLists} title='Очистить #1 и #2' />
				<Button onClick={getDataFromDB} title='Получить данные для #3' />
				<Button onClick={addNewItem} title='Добавить новый элемент в #4' />
			</div>
		</div>
	)
}

export default App
