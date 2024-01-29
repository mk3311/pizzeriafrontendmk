import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Koszyk({ user }) {
    const [koszyk, setKoszyk] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchKoszyk = async () => {
            try {
                const response = await axios.post(`https://pizzeriabackend-pizzeriabackendmk.azuremicroservices.io/api/users/koszyk?username=${user.username}`);
                setKoszyk(response.data);
            } catch (error) {
                console.error('Bład Koszyka:', error);
            }
        };

        fetchKoszyk();
    }, [user]);

    useEffect(() => {
        if (koszyk) {
            let sum = 0;
            koszyk.pizzas.forEach(pizza => {
                sum += pizza.cena;
            });
            koszyk.napoje.forEach(napoj => {
                sum += napoj.cena;
            });
            setTotalPrice(sum);
        }
    }, [koszyk]);

    const handleDeletePizza = async (pizzaId) => {
        try {
          const response = await axios.post(`https://pizzeriabackend-pizzeriabackendmk.azuremicroservices.io/api/users/removePizza?pizzaId=${pizzaId}&username=${user.username}`);
          setKoszyk(response.data);
        } catch (error) {
          console.error('Błąd', error);
        }
      };

    
      const handleDeleteNapoj = async (napojId) => {
        try {
          const response = await axios.post(`https://pizzeriabackend-pizzeriabackendmk.azuremicroservices.io/api/users/removeNapoj?napojId=${napojId}&username=${user.username}`);
          setKoszyk(response.data);
        } catch (error) {
          console.error('Błąd', error);
        }
      };  


      const handleDeleteKoszyk = async () => {
        try {
          const response = await axios.post(`https://pizzeriabackend-pizzeriabackendmk.azuremicroservices.io/api/users/clearkoszyk?username=${user.username}`);
          setKoszyk(response.data);
        } catch (error) {
          console.error('Błąd', error);
        }
      };
      
      const handleCompleteOrder = async () => {
        try {
          const response = await axios.post(`https://pizzeriabackend-pizzeriabackendmk.azuremicroservices.io/api/users/placeorder?username=${user.username}`);
          setKoszyk(response.data);
          alert('Zamówienie zostało złożone. Dziękujemy!');
        } catch (error) {
          console.error('Błąd', error);
        }
      };  
      

    if (!koszyk) {
        return <center><div>Loading...</div></center>
    }

    return (
        <center>
        <div>
            <h2>Koszyk</h2>
            <ul>
                {koszyk.pizzas.map(pizza => (
                    <li key={pizza.id}>{pizza.nazwa} - Cena: {pizza.cena} PLN | <button onClick={() => handleDeletePizza(pizza.id)}>Usuń</button></li>
                ))}
            </ul>
            <ul>
                {koszyk.napoje.map(napoj => (
                    <li key={napoj.id}>{napoj.nazwa} - Cena: {napoj.cena} PLN | <button onClick={() => handleDeleteNapoj(napoj.id)}>Usuń</button></li>
                ))}
            </ul>
            --------------------------------------------------------------
            <h3>Suma: {totalPrice.toFixed(2)} PLN</h3>
            {(koszyk.pizzas.length > 0 || koszyk.napoje.length > 0) && (
                <button onClick={handleCompleteOrder}>Złóż Zamówienie</button>
            )}
            <button onClick={() => handleDeleteKoszyk()}>Wyczyść Koszyk</button>
        </div>
        </center>
    );
}

export default Koszyk;
