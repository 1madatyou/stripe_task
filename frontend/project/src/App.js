import { useEffect, useState } from 'react';

import ItemCard from './components/item-card/ItemCard';
import CheckoutForm from './components/checkout-form/CheckoutForm';
import useOrderService from './services/OrderService';

import './App.css';

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51OHkvpEKNtuk6xCITYIbYPNLSRuBPa8z9GknVu9TLezyTMQB1iH5hpQsgakeQh0ZE9dPBbmfrKKmuMvmpb9MCtCb00tH5D1y0V");


function App() {

  const [clientSecret, setClientSecret] = useState('');

  const [itemList, setItemList] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);
  const {getItems, createOrder} = useOrderService();

  const totalCost = shoppingCart.map((e) => Number(e.price)).reduce((first, second) => first + second, 0)


  useEffect(() => {
    getItems()
      .then((result) =>{
        setItemList(result)
      })
  }, [])

  const onPurchase = () => {
    createOrder(shoppingCart)
      .then((clientSecret) => {
        setClientSecret(clientSecret)
      })
  }

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };  

  return (
    <div className='wrapper'>
      <div className='card-list'>
        {itemList.map(
          (item) => <ItemCard key={item.id} 
                              item={item}
                              shoppingCart={shoppingCart}
                              setShoppingCart={setShoppingCart}/>)}
      </div>
    <div className="shopping-cart">
      <h1>
        Total cost: {totalCost} $
      </h1>
      <button className='btn btn-warning' onClick={onPurchase}>Purchase</button>
    </div>
      <div>
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </div>

    
  );
}

export default App;
