import React, { useEffect, useState } from 'react'
import './Orders.css'
import { db } from './firebase';
import { useStateValue } from './StateProvider';
import Order from './Order';

function Orders() {
  const [{basket,user},dispacth] = useStateValue();
  const [orders,setOrders] = useState([]);
// desc is because we will able to put the latest order there to put 
  useEffect(()=>{
    if(user){
        db.collection('users')
        .doc(user?.uid)
        .collection('orders')
        .orderBy('created','desc')
        .onSnapshot(snapshot=>{
            setOrders(snapshot.docs.map(doc =>({
                // for each documents return the object here
                id: doc.id,
                data: doc.data()
            })))
        })
    }
    else{
        setOrders([]);
    }
  },[user]);

    return (
    <div className='orders'>
        <h1>your orders</h1>

        <div className='orders__order'>
                {orders?.map(order => (
                    <Order order={order} />,
                    <p>yaaar</p>
                ))}
            </div>
            
    </div>
  )
}

export default Orders;