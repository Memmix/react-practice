import './List-item.css'

const ListItem = ({ name, age, comments }) => {
  return (
    comments > 0 && typeof (comments) == 'number'
      ? <li>Пользователь: {name}, возраст: {age}, коменты: {comments}</li>
      : <li>Пользователь: {name}, возраст: {age}, коментов нет</li>
  )
}

export default ListItem