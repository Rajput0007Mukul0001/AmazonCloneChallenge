import React from 'react'
import './Product.css'
import { useStateValue } from './StateProvider';
import Payment from './Payment';

// as our product components needs to have different names image info so we are using props here this is important concept 

function Product({id,title,image,price,rating}) {
  

  const [{basket},dispatch]=useStateValue();

// console.log("this is the basket >>>>>",basket);

  const addToBasket = () =>{
  //   //dispacth the data into the data layer
  
    dispatch({
      type:'ADD_TO_BASKET',
      item:{
        id:id,
        title:title,
        image:image,
        price:price,
        rating:rating,
      }

    });

  }
  
  return (
    <div className="product">
        <div className="product__info">
        <p>{title}</p>
            <p className='product__price'>  
                <small>$</small>
                <strong>{price}</strong>
            </p>
{/* windowkey . */}
{/* // ⭐ */}
    <div className='product__rating'>
      {Array(rating)
      .fill()
      .map((_,i)=>(

        <p>⭐</p>

      ))}
    
    </div>
    
    {/* only upto rating the product info exist */}

    </div>

    {/* outside the product info we paste the image here */}

    <img 
    src={image}
    alt=''/>

    <button onClick={addToBasket}>Add to Cart</button>

    {/* button and image is in the product option  */}

    </div>
  );
}

export default Product;
