import { NavLink } from "react-router-dom";
import logo from "../../assets/images/blueprint-logo.png";
import "./Navigation.css";

export default function Navigation() {
  return (
    <nav>
      <NavLink to="/">
        <img className="blueprint-logo" src={logo} alt="logo" />
      </NavLink>
    </nav>
  );
}
