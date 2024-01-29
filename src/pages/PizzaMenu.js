import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import './style/Menu.css';

function PizzaMenu({ user }) {
    const [pizzas, setPizzas] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('https://pizzeriabackend-pizzeriabackendmk.azuremicroservices.io/api/pizzas')
            .then(response => setPizzas(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleDeletePizza = async (pizzaId) => {
        try {
          await axios.delete(`https://pizzeriabackend-pizzeriabackendmk.azuremicroservices.io/api/pizzas/${pizzaId}`);
          const response = await axios.get('/api/pizzas');
          setPizzas(response.data);
        } catch (error) {
          console.error('Błąd', error);
        }
      };
    

      const handleAddToCart = async (pizzaId) => {
        try {
            const response = await axios.post(`https://pizzeriabackend-pizzeriabackendmk.azuremicroservices.io/api/users/addPizza?pizzaId=${pizzaId}&username=${user.username}`);
            console.log('Pizza added to cart:', response.data);
            alert('Pizza dodana do Koszyka');
        } catch (error) {
            console.error('Erroradding pizza to cart:', error);
            alert('Nie można dodać Pizzy do koszyka');
        }
    };


    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchPizza = async (event) => {
        event.preventDefault();
        
        try {
            const response = await axios.post(`https://pizzeriabackend-pizzeriabackendmk.azuremicroservices.io/api/pizzas/searchPizza?searchText=${searchTerm}`);
            setPizzas(response.data);
        } catch (error) {
            console.error('Błąd podczas wyszukiwania pizzy:', error);
        }
    };



    const handleDownloadImage = (imageName) => {
        axios({
            url: `https://pizzeriabackend-pizzeriabackendmk.azuremicroservices.io/api/pizzas/downloadImage?imageName=${imageName}.jpg`,
            method: 'GET',
            responseType: 'blob', // Important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'image/jpeg' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', imageName);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        }).catch((error) => {
            console.error('Błąd podczas pobierania obrazu:', error);
        });
    };






    return (
        <center>
        <div>
        <h2>Menu</h2>
        <h3><Link to="/menu">Pizze</Link> | <Link to="/menuNapoje">Napoje</Link></h3>

        <form onSubmit={handleSearchPizza}>
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
                    <th>Rozmiar</th>
                    <th>Wegetariańska</th>
                    <th>Czy Dostępna</th>
                </tr>
            </thead>
            <tbody>
                {pizzas.map(pizza => (
                    <tr key={pizza.id}>
                        <td>{pizza.nazwa}</td>
                        <td>{pizza.cena} PLN</td>
                        <td>{pizza.rozmiar}</td>
                        <td>{pizza.czyWegetarianska ? 'Tak' : 'Nie'}</td>
                        <td>{pizza.czyDostepna ? 'Tak' : 'Nie'}</td>
                        <td>
                                <button className="ButtonPizza" onClick={() => handleDownloadImage(pizza.nazwa)}>Pobierz</button>
                        </td>
                        {user && pizza.czyDostepna && (
                            <td>
                                <button className="ButtonPizza" onClick={() => handleAddToCart(pizza.id)}>Dodaj do Koszyka</button>
                            </td>
                        )}
                        {user && user.username === 'admin' && (<td>
                        <button className="ButtonPizza" onClick={() => handleDeletePizza(pizza.id)}>Usuń</button>
                        </td>)}
                        {user && user.username === 'admin' && (<td>
                            <Link to={`/editpizza/${pizza.id}`} className="ButtonPizza">Edytuj</Link>
                        </td>)}
                    </tr>
                ))}
            </tbody>
        </table>
        {user && user.username === 'admin' && <Link to="/addpizza" class="ButtonPizza">Dodaj Pizze</Link>}
    </div>
    
    </center>
);
};
    
    export default PizzaMenu;