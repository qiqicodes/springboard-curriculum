import React from 'react';

const Card = ({name, image}) => {
    return (
        <img className="card" alt={name} src={image}/>
    )
}

export default Card;