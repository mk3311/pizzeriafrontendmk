import React, { useState,useEffect  } from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './index.css';
import Home from "./pages/Home";
import Menu from "./pages/PizzaMenu";
import MenuNapoje from "./pages/NapojMenu";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Koszyk from "./pages/Koszyk";
import AddPizza from "./pages/AddPizza";
import AddNapoj from "./pages/AddNapoj";
import EditPizza from "./pages/EditPizza";
import EditNapoj from "./pages/EditNapoj";
function App() {

  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (user) => {
      setLoggedInUser(user);
      localStorage.setItem('loggedInUser', JSON.stringify(user));
  };

  const handleLogout = () => {
      setLoggedInUser(null);
      localStorage.removeItem('loggedInUser');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);


return (
<Router>

<div>
        <header>
          <center><h1>Pizzernia</h1></center>
          <div class="header-buttons">
          {!loggedInUser && <Link to="/login" class="menuButton">Logowanie</Link>}
          {!loggedInUser && <Link to="/register" class="menuButton">Rejestracja</Link>}
          {loggedInUser && <button class="menuButton" onClick={handleLogout}>Wyloguj</button>}
          {loggedInUser && <Link to="/profile" className="menuButton">Mój Profil</Link>}
          {loggedInUser && <Link to="/koszyk" class="menuButton">Koszyk</Link>}
          </div>
          
        </header>
        <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/menu">Menu</Link></li>
            </ul>
          </nav>  

        <article>
            
            <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/menu" element={<Menu user={loggedInUser} />}/>
            <Route path="/menuNapoje" element={<MenuNapoje user={loggedInUser} />}/>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/profile" element={<Profile user={loggedInUser} />} />
            <Route path="/koszyk" element={<Koszyk user={loggedInUser} />} />
            <Route path="/addpizza" element={<AddPizza />} />
            <Route path="/editpizza/:id" element={<EditPizza />} />
            <Route path="/addnapoj" element={<AddNapoj />} />
            <Route path="/editnapoj/:id" element={<EditNapoj />} />

            </Routes>
             

 </article>
 </div>
 </Router>
 ); }
ReactDOM.render(<App />, document.getElementById("root")); 