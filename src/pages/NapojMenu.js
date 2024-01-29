import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import './style/Menu.css';

function NapojMenu({ user }) {
    const [napoje, setNapoje] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('https://pizzeriabackend-pizzeriabackendmk.azuremicroservices.io/api/napoje')
            .then(response => setNapoje(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleDeleteNapoj = async (napojId) => {
        try {
          await axios.delete(`https://pizzeriabackend-pizzeriabackendmk.azuremicroservices.io/api/napoje/${napojId}`);
          const response = await axios.get('/api/napoje');
          setNapoje(response.data);
        } catch (error) {
          console.error('Błąd', error);
        }
      };

      const handleAddToCart = async (napojId) => {
        try {
            const response = await axios.post(`https://pizzeriabackend-pizzeriabackendmk.azuremicroservices.io/api/users/addNapoj?napojId=${napojId}&username=${user.username}`);
            console.log('Napój added to cart:', response.data);
            alert('Napój dodano do Koszyka');
        } catch (error) {
            console.error('Error adding napoj to cart:', error);
            alert('Nie można dodać Napoju do koszyka');
        }
    };


    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchNapoj = async (event) => {
        event.preventDefault();
        
        try {
            const response = await axios.post(`https://pizzeriabackend-pizzeriabackendmk.azuremicroservices.io/api/napoje/searchNapoj?searchText=${searchTerm}`);
            setNapoje(response.data);
        } catch (error) {
            console.error('Błąd podczas wyszukiwania napoju:', error);
        }
    };




    return (
        <center>
        <div>
        <h2>Menu</h2>
        <h3><Link to="/menu">Pizze</Link> | <Link to="/menuNapoje">Napoje</Link></h3>


        <form onSubmit={handleSearchNapoj}>
        <label>
          Nazwa:
          <input
            type="text"
            name="nazwa"
            value={searchTerm}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Szukaj</button>
        </form>



        <table className="menu-table">
            <thead>
                <tr>
                    <th>Nazwa</th>
                    <th>Cena</th>
                    <th>Typ Opakowania</th>
                    <th>Czy Dostępna</th>
                </tr>
            </thead>
            <tbody>
                {napoje.map(napoj => (
                    <tr key={napoj.id}>
                        <td>{napoj.nazwa}</td>
                        <td>{napoj.cena} PLN</td>
                        <td>{napoj.typOpakowania}</td>
                        <td>{napoj.czyDostepna ? 'Tak' : 'Nie'}</td>
                        {user && napoj.czyDostepna && (
                            <td>
                                <button className="ButtonPizza" onClick={() => handleAddToCart(napoj.id)}>Dodaj do Koszyka</button>
                            </td>
                        )}
                        {user && user.username === 'admin' && (<td>
                        <button className="ButtonPizza" onClick={() => handleDeleteNapoj(napoj.id)}>Usuń</button>
                        </td>)}
                        {user && user.username === 'admin' && (<td>
                            <Link to={`/editnapoj/${napoj.id}`} className="ButtonPizza">Edytuj</Link>
                        </td>)}
                    </tr>
                ))}
            </tbody>
        </table>
        {user && user.username === 'admin' && <Link to="/addnapoj" class="ButtonPizza">Dodaj Napój</Link>}
    </div>
    
    </center>
);
};
    
    export default NapojMenu;