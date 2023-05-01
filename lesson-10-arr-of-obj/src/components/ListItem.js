import './ListItem.css'

const ListItem = ({ name, img }) => {

  const myStyle = {
    backgroundImage: `url(${img})`
  }

  return (
    <li>
      <div className="img" style={myStyle}></div>
      <p>{name}</p>
    </li>
  )
}
export default ListItem