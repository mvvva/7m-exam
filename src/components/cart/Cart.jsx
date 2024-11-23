import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, changeQuantity, clearCart } from '../../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import { 
  Trash2, Plus, Minus, X, ArrowLeft, 
  Truck, CreditCard, ShieldCheck, Clock, ShoppingBag 
} from 'lucide-react';

// Custom Dialog Component
const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/50"
      onClick={() => onOpenChange(false)}
    >
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

const Cart = () => {
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

  const TAX_RATE = 0.08;
  const SHIPPING_THRESHOLD = 100;
  const FREE_SHIPPING_MESSAGE = `Free shipping on orders over $${SHIPPING_THRESHOLD}`;

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

  const ConfirmationModal = ({ isOpen, onClose }) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <h3 className="text-lg font-semibold mb-4">
          {isClearCart ? "Clear Cart" : "Remove Item"}
        </h3>
        <p className="text-gray-600 mb-6">
          {isClearCart 
            ? "Are you sure you want to clear your cart?" 
            : "Are you sure you want to remove this item?"}
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmRemove}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </Dialog>
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-32">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base font-medium">Continue Shopping</span>
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Shopping Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
                </h1>
                {items.length > 0 && (
                  <button 
                    onClick={handleClearCartClick}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                )}
              </div>

              {items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mb-4">
                    <ShoppingBag className="w-12 h-12 mx-auto text-gray-400" />
                  </div>
                  <h2 className="text-lg sm:text-xl text-gray-900 font-medium mb-2">
                    Your cart is empty
                  </h2>
                  <p className="text-gray-500 mb-6">
                    Looks like you haven't added anything to your cart yet.
                  </p>
                  <button 
                    onClick={() => navigate('/sales')}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <li key={item.id} className="py-6 first:pt-0 last:pb-0">
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Product Image */}
                        <div className="w-full sm:w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                          <img 
                            src={item.image_url} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-sm sm:text-base font-medium text-gray-900">
                                {item.name}
                              </h3>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.brand_name}
                              </p>
                            </div>
                            <button 
                              onClick={() => handleRemoveClick(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <X className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                          </div>

                          {/* Color Options */}
                          {item.color_options && (
                            <div className="flex gap-2 mt-2">
                              {item.color_options.map((color, index) => (
                                <div
                                  key={index}
                                  className="w-4 h-4 rounded-full border border-gray-200"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                          )}

                          {/* Quantity and Price */}
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center space-x-2">
                              <div className="flex border rounded-lg">
                                <button 
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  className="p-1 hover:bg-gray-100 rounded-l-lg disabled:opacity-50"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-8 flex items-center justify-center">
                                  {item.quantity}
                                </span>
                                <button 
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                  className="p-1 hover:bg-gray-100 rounded-r-lg"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                            <p className="font-medium text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Order Summary */}
          {items.length > 0 && (
            <div className="lg:w-[380px]">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  Order Summary
                </h2>

                {/* Summary Details */}
                <div className="space-y-4">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 flex justify-between">
                    <span className="text-base sm:text-lg font-semibold">Total</span>
                    <span className="text-base sm:text-lg font-semibold">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Shipping Message */}
                <div className="mt-6 flex items-center text-sm text-gray-500">
                  <Truck className="w-4 h-4 mr-2 flex-shrink-0" />
                  <p>{FREE_SHIPPING_MESSAGE}</p>
                </div>

                {/* Checkout Button */}
                <button className="w-full mt-6 bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2">
                  <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Proceed to Checkout</span>
                </button>

                {/* Benefits */}
                <div className="mt-6 space-y-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <ShieldCheck className="w-4 h-4 mr-2 flex-shrink-0 text-green-500" />
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2 flex-shrink-0 text-green-500" />
                    <span>30-day returns</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Cart;