import React from 'react';
import Cart from '../components/Cart';
import Products from '../components/Products';

const Home = () => {
    return (
        <div className="space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to the Cashier System</h1>
                <p className="text-gray-600">Manage your products and transactions efficiently</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="order-2 lg:order-1">
                    <Cart />
                </div>
                <div className="order-1 lg:order-2">
                    <Products />
                </div>
            </div>
        </div>
    );
};

export default Home;