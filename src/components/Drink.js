import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'
import '../styles/Drink.css';

/* Clases y Estilos Modal */
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
    const top = 50 ;
    const left = 50;
    
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 300,
      backgroundColor: '#000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

const Drink = ({ drink }) => {

    // Configuracion del model de mateiral-ui
    const [ modalStyle ] = useState(getModalStyle);
    const classes = useStyles();

    const [idDetails, saveIdDetails] = useState(null);
    const [open, setOpen] = useState(false);
    const [details, saveDetails] = useState({});

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        const getDetails = async () => {
            if (!idDetails) return;
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDetails}`;
            const response = await axios.get(url);
            saveDetails(response.data.drinks[0]);
        }
        getDetails();
    }, [idDetails]);

    // Muestra y formatea los ingredientes
    const viewIngredients = details => {
        let ingredients = [];
        for(let i = 1; i < 16; i++) {
            if( details[`strIngredient${i}`]) {
                ingredients.push(
                    <li>
                        {details[`strIngredient${i}`]}
                        {details[`strMeasure${i}`]}
                    </li>
                )
            }
        }

        return ingredients;
    }


    const { idDrink, strDrinkThumb, strDrink } = drink;
    return (
        <article className="drink">
            <div className="drink-title">
                <h2>{strDrink}</h2>
            </div>
            <div className="drink-img">
                <img
                    src={strDrinkThumb}
                    alt={`Imagen de ${strDrink}`}
                />
            </div>
            <button
                className="drink-btn"
                data-id-drink={idDrink}
                onClick={() => {
                    saveIdDetails(idDrink);
                    handleOpen();
                }}
            >Ver Detalles</button>
            <Modal
                open={open}
                onClose={() => {
                    saveIdDetails(null)
                    saveDetails({})
                    handleClose();
                }}
            >
                <div style={modalStyle} className={`${classes.paper} drink-details`}>
                    <h2 className="detail-title">{details.strDrink}</h2>
                    <h3 className="detail-instruction">Instrucciones</h3>
                    <p className="detail-instruction-text">{details.strInstructions}</p>
                    <img
                        className="detail-img"
                        src={details.strDrinkThumb}
                        alt={`Imagen de ${details.strDrinkThumb}`}
                    />
                    <h3 className="detail-ingredients">Ingredientes y Cantidades</h3>
                    <ul className="detail-ingredients-list">
                        {viewIngredients(details)}
                    </ul>
                </div>
            </Modal>
        </article>

    );
}

Drink.propTypes = {
    drink: PropTypes.object.isRequired
}

export default Drink;