import React from 'react';
import Button from '../Form/Button/Button';

const CardProduct = ({ img, price, name }) => {
  return (
    <div className='card-product'>
      <div className="card-thumbnail">
        <img src={img} alt={name}/>
      </div>
      <h4 className="card-title">{name}</h4>
      <p className="card-price">{price}<span>$</span></p>
      <Button>
        ADD TO CART
      </Button>
    </div>
  );
}

export default CardProduct;
