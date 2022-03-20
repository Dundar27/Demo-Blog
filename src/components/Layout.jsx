import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {

    const [input, setInput] = useState("");

  return (
    <div id="layout-component">
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark container-fluid">
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item"> <Link to="/" className="nav-link">Home</Link> </li>
                </ul>
                <form class="d-flex">
                    <input className="form-control me-2" type="text" placeholder="Search" value={input} onChange={()=> setInput(document.querySelector("input").value)}/>
                    <button className="btn btn-primary" type="button"disabled={!input}>Search</button>
                </form>
            </div>
        </nav>

        <Outlet />
    </div>
  )
};

export default Layout;