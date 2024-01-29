import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditNapoj = () => {
  const { id } = useParams();
  const [napojData, setNapojData] = useState({
    nazwa: '',
    cena: '',
    typOpakowania: 'Butelka 500ml',
    czyDostepna: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNapoj = async () => {
      try {
        const response = await axios.get(`https://pizzeriabackend-pizzeriabackendmk.azuremicroservices.io/api/napoje/${id}`);
        setNapojData(response.data);
      } catch (error) {
        console.error('Error fetching napoj:', error);
      }
    };

    fetchNapoj();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setNapojData((prevData) => ({ ...prevData, [name]: inputValue }));
  };

  const handleUpdateNapoj = async () => {
    try {
      await axios.put(`https://pizzeriabackend-pizzeriabackendmk.azuremicroservices.io/api/napoje/${id}`, napojData);
      console.log('Napoj updated successfully');
      navigate('/menuNapoje');
    } catch (error) {
      console.error('Error updating napoj:', error);
      alert('Nie można zaktualizwoać Pizzy');
    }
  };

  return (
    <center>
    <div>
      <h2>Edytuj Napój</h2>
      <label>Nazwa: <input type="text" name="nazwa" value={napojData.nazwa} onChange={handleInputChange} /></label>
      <label>Cena: <input type="text" name="cena" value={napojData.cena} onChange={handleInputChange} /></label>
      <label>Typ Opakowania: 
        <select name="typOpakowania" value={napojData.typOpakowania} onChange={handleInputChange}>
          <option value="Butelka 500ml">Butelka 500ml</option>
          <option value="Puszka 500ml">Puszka 500ml</option>
        </select>
      </label>
      <label>Dostępny: <input type="checkbox" name="czyDostepna" checked={napojData.czyDostepna} onChange={handleInputChange} /></label>
      <button onClick={handleUpdateNapoj}>Zapisz zmiany</button>
    </div>
    <Link to="/menuNapoje" class="ButtonPizza">Anuluj</Link>
    </center>
  );
};

export default EditNapoj;
