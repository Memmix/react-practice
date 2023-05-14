import { NavLink } from "react-router-dom"
import './Menu.css'

const Menu = () => {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/shop">Shop</NavLink>
      <NavLink to="/about">About</NavLink>
    </nav>
  )
}

export default Menu