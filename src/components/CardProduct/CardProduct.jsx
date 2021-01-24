import React from 'react';
import {Link} from 'react-router-dom'
import Button from '../Form/Button/Button';

const CardProduct = ({ img, price, name, documentID }) => {
  console.log(documentID)
  return (
    <div className='card-product'>
      <div className="card-thumbnail">
        <Link to={`product/${documentID}`}>
          <img src={img} alt={name}/>
        </Link>
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
