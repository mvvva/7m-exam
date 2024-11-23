import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, changeQuantity, clearCart } from '../../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, X, ArrowLeft, Truck, CreditCard } from 'lucide-react';
import './Cart.css';
import ConfirmationModal from '../ConfirmationModal';

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((store) => store.cart);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [isClearCart, setIsClearCart] = useState(false);

  // Calculate totals
  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const TAX_RATE = 0.08; // 8% tax rate
  const SHIPPING_THRESHOLD = 100; // Free shipping above $100

  const subtotal = calculateSubtotal();
  const tax = subtotal * TAX_RATE;
  const shipping = subtotal > SHIPPING_THRESHOLD ? 0 : 10;
  const total = subtotal + tax + shipping;

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

  const handleQuantityChange = (id, quantity) => {
    if (quantity >= 1) {
      dispatch(changeQuantity({ id, quantity }));
    }
  };

  return (
    <div className='flex text-black relative container mx-auto px-4 mb-48 min-h-screen'>
      <div className="absolute top-36 left-4">
        <button 
          className="flex items-center gap-2 hover:text-gray-600 transition-colors"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} />
          <span className='font-semibold'>Continue Shopping</span>
        </button>
      </div>
      
      <div className="w-full flex flex-col lg:flex-row gap-8 absolute top-44">
        <div className="cart-container flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className='text-2xl font-bold'>Shopping Cart ({items.length} items)</h1>
            {items.length > 0 && (
              <button 
                onClick={handleClearCartClick}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h2 className="text-xl text-gray-500">Your cart is empty</h2>
              <button 
                onClick={() => navigate('/sales')}
                className="mt-4 text-blue-600 hover:text-blue-800 font-semibold"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 bg-white p-4 rounded-lg shadow-sm">
                  <img src={item.image_url} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-bold">{item.brand_name}</h3>
                        <p className="text-gray-600">{item.name}</p>
                      </div>
                      <button 
                        onClick={() => handleRemoveClick(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {item.color_options.map((color, index) => (
                        <span
                          key={index}
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ background: color }}
                        />
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-200 rounded"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="lg:w-[380px] bg-white p-6 rounded-lg shadow-sm h-fit">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>
          
          <div className="space-y-4 border-b border-gray-200 pb-4">
            <div className="flex justify-between items-center text-gray-600">
              <div className="flex items-center gap-2">
                <Truck size={18} />
                <span>Shipping</span>
              </div>
              <span className="font-medium">
                {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            
            <div className="flex justify-between items-center text-gray-600">
              <span>Tax</span>
              <span className="font-medium">${tax.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span>Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center py-4 text-lg font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors">
            <CreditCard size={20} />
            Proceed to Checkout
          </button>
          
          <button 
            className="w-full mt-3 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={20} />
            Continue Shopping
          </button>
        </div>
      </div>

      <ConfirmationModal 
        isOpen={isModalOpen} 
        onConfirm={handleConfirmRemove} 
        onCancel={() => setIsModalOpen(false)} 
        message={isClearCart ? "Are you sure you want to clear your cart?" : "Remove this item from your cart?"}
      />
    </div>
  );
}

export default Cart;