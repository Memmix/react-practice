import './List-item.css'

const ListItem = ({ name, age, comments }) => {
  return comments
    ? <li>{`пользователь: ${name}, возраст: ${age}, количество коментов: ${comments}`}</li>
    : <li>{`пользователь: ${name}, возраст: ${age}, коментов нет!`}</li>
}

export default ListItem