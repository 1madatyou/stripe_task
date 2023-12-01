import { useEffect, useState } from 'react';

import ItemCard from './components/item-card/ItemCard';
import useOrderService from './services/OrderService';

import './App.css';


function App() {

  const [itemList, setItemList] = useState([]);
  const {getItems} = useOrderService();

  useEffect(() => {
    getItems()
      .then((result) =>{
        console.log(result)
        setItemList(result)
      })
  }, [])

  return (
    <div>
      {itemList.map((item) => <ItemCard key={item.id} item={item}/>)}
    </div>
  );
}

export default App;
