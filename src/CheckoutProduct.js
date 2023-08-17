import React from 'react';
import './CheckoutProduct.css'
import { useStateValue } from './StateProvider';


function CheckoutProduct({id,image,title,price,rating,hideButton}) {
   
   const [{basket},dispatch] = useStateValue();

   const removeFromBasket = () =>{
    // remove the item from the basket
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id:id,
        })
   }
   
    return (
        <div className='checkoutProduct'>
            <img className = 'checkoutProduct__image' src={image}/>

        <div className='checkoutProduct__info'>
            <p className='checkoutProduct__title'>{title}
            </p>

            <p className='checkoutProduct__price'>{title}
                <small>$</small>
                <strong>{price}</strong>
            </p>
            {/* _,i iska need nahi we just directly giving size of array and mapped it  */}
                <div className='checkoutProduct__rating'>
                {Array(rating).fill().map((_,i)=>(
                    <p>⭐</p>
                ))}
                </div>

            {!hideButton &&(
                <button onClick={removeFromBasket}>Remove Item</button>
            )}    
            

            </div>    
        
        </div>
    )
}

export default CheckoutProduct;