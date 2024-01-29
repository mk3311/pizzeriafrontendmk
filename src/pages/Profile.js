import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile({ user }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.post(`https://pizzeriabackend-pizzeriabackendmk.azuremicroservices.io/api/users/orders?username=${user.username}`);
                setOrders(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchOrders();
    }, [user]);



    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };




    const handleShowConfirmation = async (orderId) => {
        try {
            const response = await axios.post(`https://pizzeriabackend-pizzeriabackendmk.azuremicroservices.io/api/users/orderConfirmation?orderId=${orderId}`);
            alert(response.data);
        } catch (error) {
            console.error('Błąd podczas pobierania potwierdzenia:', error);
        }
    };



    return (
        <center>
            <div>
                <h2>Witaj, {user.username}!</h2>
                <h2>Twoja Historia Zamówień:</h2>
                {orders.map(order => (
                    <div key={order.id}>
                        <p>Data zamówienia: {formatDate(order.dataZamowienia)}</p>
                        <p>Status zamówienia: {order.stanZamowienia}</p>
                        <p>Cena zamówienia: {order.cenaZamowienia} PLN</p>
                        <p>Zamówione Produkty:</p>
                        <ul>
                            {order.pizzasZamowione.map(pizza => (
                                <li key={pizza.id}>Pizza {pizza.nazwa} {pizza.rozmiar}</li>
                            ))}
                        </ul>
                        <ul>
                            {order.napojeZamowione.map(napoj => (
                                <li key={napoj.id}>{napoj.nazwa} {napoj.typOpakowania}</li>
                            ))}
                        </ul>
                        <button onClick={() => handleShowConfirmation(order.id)}>Pokaż Potwierdzenie</button>
                        <p>---------------------------------------------------------------------------------</p>
                    </div>
                ))}
            </div>
        </center>
    );
};

export default Profile;