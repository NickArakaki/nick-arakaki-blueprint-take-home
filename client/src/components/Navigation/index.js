import { NavLink } from "react-router-dom";

import "./Navigation.css";

export default function Navigation() {
  return (
    <nav>
      <div>
        <NavLink to="/">Blueprint Take Home Challenge</NavLink>
      </div>
      <div>
        <NavLink to="/diagnostic-screener">Diagnostic Screener</NavLink>
      </div>
    </nav>
  );
}
