import React from 'react';
import { useSelector } from 'react-redux';
import CardProduct from '../../components/CardProduct/CardProduct';

const mapSate = ({cartData}) => ({
  products: cartData.cartItems
})

const Cart = () => {

  const { products } = useSelector(mapSate)

  return (
    <div>
      <div>
        {products && products.map((data, i) => {
          const { img, price, name, documentID } = data

          const configProduct = {
            img,
            price,
            name, 
            documentID
          }

          return (
            <CardProduct key={i} {...configProduct} />
          )
        })}
      </div>
    </div>
  );
}

export default Cart;
