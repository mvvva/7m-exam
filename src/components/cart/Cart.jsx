import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, changeQuantity, clearCart } from '../../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus, faMinus, faTimes } from '@fortawesome/free-solid-svg-icons';
import {  FaArrowLeft } from 'react-icons/fa';
import './Cart.css';
import ConfirmationModal from '../confirmationModal/ConfirmationModal';

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((store) => store.cart);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [isClearCart, setIsClearCart] = useState(false);

  const handleRemoveClick = (id) => {
    setItemToRemove(id);
    setIsModalOpen(true);
    setIsClearCart(false);
  };

  const handleClearCartClick = () => {
    setIsModalOpen(true);
    setIsClearCart(true);
  };

  const handleConfirmRemove = () => {
    if (isClearCart) {
      dispatch(clearCart());
    } else {
      dispatch(removeItem({ id: itemToRemove }));
    }
    setIsModalOpen(false);
    setItemToRemove(null);
  };

  const handleCancelRemove = () => {
    setIsModalOpen(false);
    setItemToRemove(null);
  };

  const handleQuantityChange = (id, quantity) => {
    dispatch(changeQuantity({ id, quantity }));
  };

  const handleCloseCart = () => {
    navigate('/sales');
  };

  return (
    <div className='flex text-black relative container mb-48 h-screen'>
      <div className="going-back top-36 absolute">
        <button 
        className="flex items-center"
        onClick={() => navigate(-1)}
        >
          <FaArrowLeft size={18} />
          <span className='font-bold'>Back to shopping</span>
        </button>
      </div>
      <div className="w-full flex absolute top-44">
      <div className="cart-container">
        <div className="cart-header">
          <h1 className='font-bold'>Shopping Cart</h1>
          <div className="cart-actions">
            <button onClick={handleClearCartClick} className="cart-action-btn">
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
            <button onClick={handleCloseCart} className="cart-action-btn">
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        </div>
        <div className="cart-header-title p-3  border-gray-500 font-bold">
          <p>Product</p>
          <p>Quantity</p>
          <p>Price</p>
        </div>
        <ul className="cart-items">
          {items.length === 0 ? <h1 style={{fontSize: '30px', padding: '10px', color:'red'}}>NO ADDED ITEMS </h1> : items.map((item) => (
            <li key={item.id} className="cart-item">
              <button 
                    onClick={() => handleRemoveClick(item.id)}
                    className="remove-item-btn"
                  >
                    <FontAwesomeIcon icon={faTimes} />
              </button>
              <img src={item.image_url} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <div className="titles">
                  <h3 className="cart-item-name">{item.brand_name}</h3>
                  <p className="cart-item-name text-base font-normal">{item.name}</p>
                  {item.color_options.map((color, index) => (
                  <span
                    key={index}
                    className="w-5 h-5 rounded-full inline-block border-[1px] border-solid border-black mr-2"
                    style={{ background: color }}
                  ></span>
                ))}
                </div>
                <div className="cart-item-controls bg-[#F4F4F4] rounded-xl">
                  <button 
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)} 
                    disabled={item.quantity <= 1}
                    className="quantity-btn "
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                  
                </div>
                <p className="cart-item-price">{item.price * item.quantity}$</p>
              </div>
            </li>
          ))}
        </ul>
      
      <ConfirmationModal 
        isOpen={isModalOpen} 
        onConfirm={handleConfirmRemove} 
        onCancel={handleCancelRemove} 
        message={isClearCart ? "Are you sure to clear the cart ?" : "Are you sure to delete the item?"}
      />
    </div>
    <div className="total-wrap w-[35%]   p-[16px]">
 
        <div className="cart-right-title ">
              <h1 className='font-bold uppercase'>Cart totals</h1>

        </div>      
        <div className="total-p-wrapper mt-5 pt-4">
          <div className="total-p flex items-center justify-between mt-3">
            <p>Shipping (3-5 Business Days)</p>
            <span className='font-bold'>Free</span>
          </div>
          <div className="total-p flex items-center justify-between mt-3">
            <p>TAX (estimated for the United States (US))</p>
            <span className='font-bold'>$0</span>
          </div>
          <div className="total-p flex items-center justify-between mt-3">
            <p>Subtotal</p>
            <span className='font-bold'>$399.00</span>
          </div>
        </div>
        <div className="total flex items-center justify-between">
          <p className='font-bold'>Total</p>
          <span className='font-bold'>$399.00</span>
        </div>
      <button className=' w-full mt-4 py-2 bg-green-500 rounded-lg font-bold uppercase text-white'>Proceed to Checkout</button>
      <div className=" mt-4 ">
        <button 
        className="flex items-center justify-center  w-full py-2"
        onClick={() => navigate(-1)}
        >
          <FaArrowLeft size={18} />
          <span className='font-bold'> Back to shopping</span>
        </button>
      </div>
      </div>
      </div>
    </div>
  );
}

export default Cart;
