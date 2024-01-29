import React, { useState } from 'react';
import { useNavigate,Link  } from 'react-router-dom';
import axios from 'axios';

const AddPizza = () => {
  const [pizzaData, setPizzaData] = useState({
    nazwa: '',
    rozmiar: 'Mała',
    cena: '',
    czyWegetarianska: false,
    czyDostepna: true,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    const inputValue = type === 'checkbox' ? checked : value;

    setPizzaData((prevData) => ({ ...prevData, [name]: inputValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://pizzeriabackend-pizzeriabackendmk.azuremicroservices.io/api/pizzas', pizzaData);

      console.log('Pizza została dodana!');
      navigate('/menu');
    } catch (error) {
      console.error('Błąd podczas dodawania pizzy:', error);
      alert('Nie można dodać Pizzy');
    }
  };

  return (
    <center>
    <div>
      <h2>Dodaj nową pizzę</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nazwa:
          <input
            type="text"
            name="nazwa"
            value={pizzaData.nazwa}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Rozmiar:
          <select
            name="rozmiar"
            value={pizzaData.rozmiar}
            onChange={handleInputChange}
          >
            <option value="Mała 33cm">Mała 33cm</option>
            <option value="Średnia 40cm">Średnia 40cm</option>
            <option value="Duża 50cm">Duża 50cm</option>
          </select>
        </label>
        <br />
        <label>
          Cena:
          <input
            type="text"
            name="cena"
            value={pizzaData.cena}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Wegetariańska:
          <select
            name="czyWegetarianska"
            value={pizzaData.czyWegetarianska}
            onChange={handleInputChange}
          >
            <option value={false}>Nie</option>
            <option value={true}>Tak</option>
          </select>
        </label>
        <br />
        <label>
          Dostępna:
          <select
            name="czyDostepna"
            value={pizzaData.czyDostepna}
            onChange={handleInputChange}
          >
            <option value={true}>Tak</option>
            <option value={false}>Nie</option>
          </select>
        </label>
        <br />
        <button type="submit">Dodaj pizzę</button>
      </form>
    </div>
    <Link to="/menu" class="ButtonPizza">Anuluj</Link>
    </center>
  );
};

export default AddPizza;