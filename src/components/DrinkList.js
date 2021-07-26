import React from 'react';
import PropTypes from 'prop-types'

import '../styles/DrinkList.css';

import Drink from './Drink';

const DrinkList = ({drinks}) => {

    return(
        <div className="container">
            <div className="content-drink-list">
                {drinks.map(drink => (
                    <Drink 
                        key={drink.idDrink}
                        drink={drink}
                    />
                ))}
            </div>
        </div>
    );
}

DrinkList.propType = {
    drinks: PropTypes.array.isRequired
}

export default DrinkList;