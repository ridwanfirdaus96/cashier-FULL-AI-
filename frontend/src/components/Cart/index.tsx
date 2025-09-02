import React from 'react';
import { useCartStore } from '../../stores/cartStore';
import { useAuthStore } from '../../stores/authStore';
import { transactionAPI } from '../../services/api';
import { TrashIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

const Cart: React.FC = () => {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    getTotal, 
    clearCart, 
    setLoading, 
    isLoading 
  } = useCartStore();
  const { user } = useAuthStore();

  const handleCheckout = async () => {
    if (items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    if (!user) {
      alert('Please login to continue');
      return;
    }

    try {
      setLoading(true);
      const transactionData = {
        totalAmount: getTotal(),
        items: items.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.price
        }))
      };

      await transactionAPI.create(transactionData);
      clearCart();
      alert('Transaction completed successfully!');
    } catch (error: any) {
      console.error('Error during checkout:', error);
      alert(error.response?.data?.message || 'Failed to complete transaction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-6">
        <ShoppingCartIcon className="h-6 w-6 text-blue-500 mr-2" />
        <h2 className="text-2xl font-semibold text-gray-800">Your Cart</h2>
        {items.length > 0 && (
          <span className="ml-2 bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
            {items.length}
          </span>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-8">
          <ShoppingCartIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Your cart is empty</p>
          <p className="text-gray-400 text-sm">Add some products to get started</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                {item.product.imageUrl && (
                  <img 
                    src={item.product.imageUrl} 
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                )}
                <div>
                  <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
                  <p className="text-gray-600 text-sm">{item.product.description}</p>
                  <p className="text-blue-600 font-semibold">Rp {Number(item.price).toLocaleString('id-ID')}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    +
                  </button>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold text-gray-800">
                    Rp {(Number(item.price) * item.quantity).toLocaleString('id-ID')}
                  </p>
                </div>
                
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
          
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-800">Total:</span>
              <span className="text-2xl font-bold text-blue-600">
                Rp {getTotal().toLocaleString('id-ID')}
              </span>
            </div>
            
            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Processing...' : 'Checkout'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;