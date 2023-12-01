import { useEffect, useState } from 'react';

import ItemCard from './components/item-card/ItemCard';
import useOrderService from './services/OrderService';

import './App.css';


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
    </div>
  );
}

export default App;
