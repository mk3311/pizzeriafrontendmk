import React, { useState } from 'react';
import { useNavigate,Link  } from 'react-router-dom';
import axios from 'axios';

const AddNapoj = () => {
  const [napojData, setNapojData] = useState({
    nazwa: '',
    cena: '',
    typOpakowania: 'Butelka 500ml',
    czyDostepna: true,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    const inputValue = type === 'checkbox' ? checked : value;

    setNapojData((prevData) => ({ ...prevData, [name]: inputValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://pizzeriabackend-pizzeriabackendmk.azuremicroservices.io/api/napoje', napojData);

      console.log('Napój został dodany!');
      navigate('/menuNapoje');
    } catch (error) {
      console.error('Błąd podczas dodawania napoju:', error);
      alert('Nie można dodać Napoju');
    }
  };

  return (
    <center>
    <div>
      <h2>Dodaj nowy napój</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nazwa:
          <input
            type="text"
            name="nazwa"
            value={napojData.nazwa}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Cena:
          <input
            type="text"
            name="cena"
            value={napojData.cena}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Typ Opakowania:
          <select
            name="typOpakowania"
            value={napojData.typOpakowania}
            onChange={handleInputChange}
          >
            <option value="Butelka 500ml">Butelka 500ml</option>
            <option value="Puszka 500ml">Puszka 500ml</option>
          </select>
        </label>
        <br />
        <label>
          Dostępna:
          <select
            name="czyDostepna"
            value={napojData.czyDostepna}
            onChange={handleInputChange}
          >
            <option value={true}>Tak</option>
            <option value={false}>Nie</option>
          </select>
        </label>
        <br />
        <button type="submit">Dodaj Napoj</button>
      </form>
    </div>
    <Link to="/menuNapoje" class="ButtonPizza">Anuluj</Link>
    </center>
  );
};

export default AddNapoj;