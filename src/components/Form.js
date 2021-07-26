import React, { useState } from 'react';
import Error from './Error';
import PropTypes from 'prop-types'
// Estilos
import '../styles/Form.css';

const Form = ({categories, saveData, data, saveConsult}) => {
    
    
    const setData = e => {
        saveConsult(false);
        saveData({ ...data, [e.target.name]: e.target.value });
    }

        // State Error
    const [ error, saveError ] = useState(false);

    const saveForm = e => {
        e.preventDefault();
        const {name, category} = data;
        if (name === '' || category === '') {
            saveError(true); return
        }
        saveError(false);
        saveConsult(true);
    }

    return (
        <div className="container">
            <fieldset>
                <legend>Busca tu bebida
                    <span>Selecciona Ingrediente y Categoría</span>
                </legend>
                <form 
                    className="content-form"
                    onSubmit={ saveForm }    
                >
                    <div>
                        <input 
                            type="text"
                            name="name"
                            placeholder="Buscar por ingrediente"
                            onChange={ setData }
                        />
                    </div>
                    <div>
                        <select
                            name="category"
                            onChange={ setData }
                        >
                            <option >-- Buscar por categoría --</option>
                            {categories.map( category => (
                                <option 
                                    key={category.strCategory} 
                                    value={category.strCategory}
                                >{category.strCategory}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <input 
                            type="submit"
                            value="Buscar"
                        />
                    </div>
                </form>
                { error ? <Error message="Todos los campos son obligatorios" /> : null}
            </fieldset>
        </div>
    );
}

Form.propTypes = {
    categories: PropTypes.array.isRequired,
    saveData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    saveConsult: PropTypes.func.isRequired
}

export default Form;