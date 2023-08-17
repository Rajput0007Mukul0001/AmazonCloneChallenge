import React from 'react'
import "./Checkout.css"
import Subtotal from './Subtotal';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';

function Checkout() {
 
  const [{basket,user},dispatch] = useStateValue();
 
  return (


    <div className='checkout'>
        {/* <h1>Hey check out this page</h1> */}
        <div className='checkout__left'>
            <img className='checkout__ad'
            src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg'
            alt=''/> 
                <div>
                  {/* ? bina iske kaam chal rha per na ho toh ? optional chaning use kro bs isme  */}
                  <h3>{user?.email}</h3>
                    <h2 className='checkout__title'>
                        Your  shopping  Basket
                    </h2>
                    {/* BasketItem */}

                    {basket.map(item=>(
                      <CheckoutProduct
                      // key={item.id}
                      id={item.id}
                      title={item.title}
                      image={item.image}
                      price={item.price}
                      rating={item.rating}
                      />
                    ))}

                </div>
        </div>

{/* rigth hand side of the checkout page  */}

{/* kaal se coding bhi suru har jagah streak too and revision back to back here daily 1hr to 2hr for the project here*/}

<div className='checkout__right'>
     <Subtotal/>
     {/* <h2>The SubTotal Will Go Here</h2> */}
</div>

    </div>    
  );
}

export default Checkout