import React, { useEffect } from 'react';
import './Payment.css'
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct'
import { Link, useNavigate } from 'react-router-dom';
import { CardElement,useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import { useState } from 'react';
import axios from './axios';
// import './Payments_create.js'
import { db } from './firebase';


function Payment() {
    const [{basket,user},dispacth] = useStateValue();
    // using two powerful hooks here now 
    const history = useNavigate();
    const stripe = useStripe();
    const elements = useElements(); 
    const [processing,setProcessing] = useState("");
    const [succeeded,setSucceeded] = useState(false);
    const [error,setError] = useState(null);
    const [disabled,setDisabled] = useState(true);
    const [clientSecret,setClientSecret] = useState(true);

    // client secret ke liye useEffect bhi use krenge hum isme 
// jaise hi kuch load ho ya change ho toh use effect calega phle isme 
// jaise hi basket change hogi hum bta denge na client ko ki ab bs itna hi krna hai bs 

// const stripeApiBaseUrl = 'https://api.stripe.com/v1';

useEffect(() => {

    const getClientSecret = async () => {
        // // axios se get or post request ke liye 
        const response = await axios({
            method: 'post',
            // stripe expect the total in a currencies subunits
            //    100 bs sirf subunit hai jo stripe dekhta hai 
            // url: 'https://reqres.in/api/users',
            url:`/payments/create?total=${getBasketTotal(basket)*100}`,
          
        })
        // .then(()=>{
        //     console.log("Working ");
        // }).catch((error)=>{
        //     console.log("messgase >> "+error);
        // })
        setClientSecret(response.data.clientSecret);
    }

    getClientSecret()
      .then((res)=>{
            console.log("Working "+res);
        }).catch((error)=>{
            console.log("messgase >> "+error);
        });

    },[basket])


//************************* */
// https://js.stripe.com/v3/
/*
const stripeApiBaseUrl = 'https://api.stripe.com/v1';
const    stripeSecretKey   ="sk_test_51NXg5tSDysHtItdlTuFLcEbXvJ8Q790tARVr2XratYOyz5hbDGUVS3FDUI6KGCx8QYI4h14ptUnDIPOydns2iMAc00yWCJJ5zn";
// ...

useEffect(() => {
  const getClientSecret = async () => {
    try {
      const response = await axios({
        method: 'POST',
        url: `${stripeApiBaseUrl}/payment_intents`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${stripeSecretKey}`,
        },
        data: {
          amount: getBasketTotal(basket) * 100,
          currency: 'usd', // Replace 'usd' with your desired currency
          description: 'Payment for items', // Replace with a description if needed
        },
      });
      setClientSecret(response.data.clientSecret);
    } catch (error) {
      // Handle errors here
      console.error('Error fetching client secret:', error.message);
    }
  };

  getClientSecret();
}, [basket]);

*/
//************************* */

    const handleSubmit = async (ev) => {
        //do all the fancy stripe stuff here of the functions and so on ....
        
        ev.preventDefault();
        setProcessing(true);
        // then it will block the button also here

        // const payload = await stripe isse phle ham client secret use krenge phle isme 
        const payload = await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent})=>{
            // uid ogi user id ki firebase me jo hogi isme 
            db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            })

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispacth({
                type : 'EMPTY_BASKET'
            });
             history("/orders",{replace : true});
        });
    }

    const handleChange = ev =>{
// listen for the changes in the CardElement
//and display any errors as the customer types thier card details 
    // event is depracited so we need to do
    setDisabled(ev.empty);
    setError(ev.error ? ev.error.message : "");   

    }

    return (
        <div className='payment'>
            <div className='payment__container'>

        <h1>Checkout{<Link to="/checkout" >{basket?.length} items</Link>}</h1>

                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{user?.email}</p>
                        <p>123 React lang</p>
                         <p>Los Anegles</p>   
                    </div>
                </div>

        <div className='payment__section'>

        <div className='payment__title'>
                        <h3>Review items and delivery</h3>
        </div>

        <div className='payment__items'>
{/* item=>( ye wala paranthesis ana chaiye warna ni chalega ) */}
    {basket.map(item => (
        <CheckoutProduct
        // react me har ek item ko key se define krte hai hum isme 
        
        // key={item.id}
        id={item.id}
        image={item.image}
        title={item.title}
        price={item.price}
        rating={item.rating}    
       />
     ))}    
      </div> 
               
    </div>


                <div className='payment__section'>
                <div className='payment__title'>
                        <h3>Payment Method</h3>
                     </div>

                <div className='payment__details'>
                    {/* stripe will work here */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
            
                    <div className='payment__priceContainer'>
                    <CurrencyFormat
        renderText={(value)=>(
            <>
            <h3>Order Total : {value}</h3>
            </>
        )}

        decimalScale={2}    
        value={getBasketTotal(basket)}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}

      /> 

            <button disabled={processing || disabled || succeeded}>
            <span>{processing ? <p>processing</p> : "Buy Now" }</span>

            </button>
                
            </div>
            
            {/* error cases here */}
            {/* to usko display krde direct isme  */}
             {error && <div>{error}</div>}   

            </form>

                </div>

                </div>

            </div>
        </div>
    );
}

export default Payment;