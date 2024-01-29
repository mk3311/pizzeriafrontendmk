import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditPizza = () => {
  const { id } = useParams();
  const [pizzaData, setPizzaData] = useState({
    nazwa: '',
    cena: '',
    rozmiar: 'Mała',
    czyWegetarianska: false,
    czyDostepna: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const response = await axios.get(`https://pizzeriabackend-pizzeriabackendmk.azuremicroservices.io/api/pizzas/${id}`);
        setPizzaData(response.data);
      } catch (error) {
        console.error('Error fetching pizza:', error);
      }
    };

    fetchPizza();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setPizzaData((prevData) => ({ ...prevData, [name]: inputValue }));
  };

  const handleUpdatePizza = async () => {
    try {
      await axios.put(`https://pizzeriabackend-pizzeriabackendmk.azuremicroservices.io/api/pizzas/${id}`, pizzaData);
      console.log('Pizza updated successfully');
      navigate('/menu');
    } catch (error) {
      console.error('Error updating pizza:', error);
      alert('Nie można zaktualizwoać Pizzy');
    }
  };

  return (
    <center>
    <div>
      <h2>Edytuj Pizzę</h2>
      <label>Nazwa: <input type="text" name="nazwa" value={pizzaData.nazwa} onChange={handleInputChange} /></label>
      <label>Cena: <input type="text" name="cena" value={pizzaData.cena} onChange={handleInputChange} /></label>
      <label>Rozmiar: 
        <select name="rozmiar" value={pizzaData.rozmiar} onChange={handleInputChange}>
          <option value="Mała 33cm">Mała 33cm</option>
          <option value="Średnia 40cm">Średnia 40cm</option>
          <option value="Duża 50cm">Duża 50cm</option>
        </select>
      </label>
      <label>Wegetariańska: <input type="checkbox" name="czyWegetarianska" checked={pizzaData.czyWegetarianska} onChange={handleInputChange} /></label>
      <label>Dostępna: <input type="checkbox" name="czyDostepna" checked={pizzaData.czyDostepna} onChange={handleInputChange} /></label>
      <button onClick={handleUpdatePizza}>Zapisz zmiany</button>
    </div>
    <Link to="/menu" class="ButtonPizza">Anuluj</Link>
    </center>
  );
};

export default EditPizza;
