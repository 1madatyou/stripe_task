import { useState } from "react"


const ItemCard = ({item, setTotalCost, totalCost, shoppingCart, setShoppingCart}) => {



  const {name, description, price} = item

  let buttonClassList = shoppingCart.includes(item) ? 'btn btn-danger' : 'btn btn-primary'

  const onClick = () => {
    if (shoppingCart.includes(item)) {
      setShoppingCart(shoppingCart.filter((e) => e.id != item.id))
    } else {
      setShoppingCart([...shoppingCart, item])
    }
  }

  return (
    <div class="card" style={{width: "18rem", display: "inline-block"}}>
      <div class="card-body">
        <h5 class="card-title">{name}</h5>
        <p class="card-text">{description}</p>
        <p class="card-text">{price}$</p>

        <button className={buttonClassList} onClick={onClick}>Add to shopping cart</button>

      </div>
    </div>
  )
}

export default ItemCard;