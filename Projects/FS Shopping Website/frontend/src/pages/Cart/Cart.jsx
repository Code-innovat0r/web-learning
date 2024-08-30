import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import {useNavigate} from 'react-router-dom'

const Cart = () => {

  const { cartItem, setCartItem, removeFromCart, addToCart, getTotalAmount, food_list, url } = useContext(StoreContext)

  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className='cart-items'>
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {food_list.map((item, index) => {
          if (cartItem[item._id] > 0) {
            console.log("paras");
            return (
              <div>
                <div className='cart-items-title cart-items-item'>
                  <img src={url+'/images/'+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItem[item._id]}</p>
                  <p>${item.price * cartItem[item._id]}</p>
                  <p onClick={() => { removeFromCart(item._id) }} className='cross'>X</p>
                </div>
                <hr />
              </div>
            )
          }
        })}
        <div className='cart-bottom'>
          <div className='cart-total'>
            <h2>Cart Totals</h2>
            <div>
              <div className='cart-total-details'>
                <p>Subtotal</p>
                <p>${getTotalAmount()}</p>
              </div>
              <div className='cart-total-details'>
                <p>Delivery fee</p>
                <p>${getTotalAmount()==="0.00"?0:2.23}</p>
              </div>
              <div className='cart-total-details'>
                <strong>Total</strong>
                <p>${getTotalAmount()==="0.00"?0:parseFloat(getTotalAmount())+2.23}</p>
              </div>
            </div>
            {/* we have add /order because in app.jsx we have define the /order to navigate to placeorder page*/}
            <button onClick={()=>{navigate("/placeorder")}} className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">PROCEED TO CHECKOUT</button>
          </div>
          <div className="cart-promocode">
            <div>
              <p>If you have a promo code, Enter it here</p>
              <div className='cart-promocode-input'>
                <input type="text" placeholder='promocode' />
                <button className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Apply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart