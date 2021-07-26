import React, { Fragment, useState, useEffect } from 'react';

import axios from 'axios';

import Form from './components/Form';
import Header from './components/Header';
import DrinkList from './components/DrinkList';
function App() {

  // State de Recetas de bebidas
  const [ drinks, saveDrinks ] = useState([]);
  // State que permite realizar la consulta
  const [ consult, saveConsult ] = useState(false);
  // State Categorias 
  const [categories, saveCategories] = useState([]);
  // State name
  const [data, saveData] = useState({
    name: '',
    category: ''
  });


  useEffect( () => {
    if(consult) {
      const consultAPI = async () => {
        const { name, category } = data;
        
        const url = `https://thecocktaildb.com/api/json/v1/1/filter.php?i=${name}&c=${category}`;
        const response = await axios.get(url);

        saveDrinks(response.data.drinks);
      }
      consultAPI();
    }
  }, [data, consult]);



  useEffect(() => {
    const consultAPI = async () => {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const response = await axios.get(url);

      saveCategories(response.data.drinks);
    }
    consultAPI();
  }, [saveCategories]);

  return (
    <Fragment>
      <Header />

      <Form
        categories={categories}
        saveData={saveData}
        data={data}
        saveConsult={saveConsult}
      />

      <DrinkList
        drinks={drinks}
      />
    </Fragment>
  );
}

export default App;
