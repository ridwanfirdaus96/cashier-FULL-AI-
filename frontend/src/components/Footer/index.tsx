import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white mt-auto">
            <div className="container mx-auto px-6 py-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <p className="text-sm">© 2025 Cashier System. All rights reserved.</p>
                    </div>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-gray-300 text-sm">Terms</a>
                        <a href="#" className="hover:text-gray-300 text-sm">Privacy</a>
                        <a href="#" className="hover:text-gray-300 text-sm">Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;