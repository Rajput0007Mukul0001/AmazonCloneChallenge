import React from 'react'
import './Home.css'
import './Product.css'
import Product from './Product'

function Home() {
  return (
    <div className='home'>
        <div className='home__container'>

<img className='home__image'
src="https://images-eu.ssl-images-amazon.com/images/G/31/IN-Events/PD23/GW/PC_Hero_3000x1200_KV_1x._CB602514753_.jpg" 
alt="Amazon-Banner"/>

    <div className='home__row'>
        {/* product 2*/}
        <Product title={'The lean startup'} 
        id="12321341"
        price={29.99} 
        image={"https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"}
        rating={3}
        />

    {/* with help of API we can make a lot of products here and there lol */}

        <Product
        id="49538094"
        title={'Iphone 12'}
        price={75}
        image={"https://m.media-amazon.com/images/I/810DvHOZ9nL._AC_UL320_.jpg"}
        rating={5}
        />

    </div>


    <div className='home__row'>
        {/* product 3 ayenge*/}
        <Product
        id="4903850"
        title={"Samsung LC49RG90SSUXEN 49' Curved LED GAming Moniter"}
        price={199}
        rating={3}
        image={"https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"}
        />

        <Product
        id="23445930"
        title={"Amazon Echo (3rd generation) | smart speaker with Alexa,Charcoal Fabric"}
        price={98.99}
        rating={5}
        image={"https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobileex2$.jpg"}
        />

        <Product
        id="3254354345"
        title={"New Apple iPad Pro (12.9-inch,wi-fi,128GB) -Silver (4th Generation)"}
        price={598.99}
        rating={4}
        image={"https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"}
        />


    </div>


    <div className='home__row'>
        {/* product 1*/}
        <Product
        id="90829332"
        title={"Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440"}
        price={1540.95}
        rating={4}
        image={"https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg"}
        />
    </div>

    </div>
    </div>

  )
}

export default Home