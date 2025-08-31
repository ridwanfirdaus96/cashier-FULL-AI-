import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { useCartStore } from "../../stores/cartStore";
import { 
  ShoppingCartIcon, 
  HomeIcon, 
  ClockIcon, 
  UserIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { getItemCount } = useCartStore();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  if (!isAuthenticated) {
    return null; // Don't show header if not authenticated
  }

  return (
    <header className="bg-white shadow-md">
      <nav className="w-full max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <span className="text-xl font-bold text-gray-800">Cashier System</span>

          {/* Menu */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
              <HomeIcon className="h-6 w-6 mr-1" />
              Home
            </Link>
            <Link to="/transactions" className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
              <ClockIcon className="h-6 w-6 mr-1" />
              History
            </Link>
            <Link to="/cart" className="relative text-gray-600 hover:text-gray-800 transition-colors">
              <ShoppingCartIcon className="h-6 w-6" />
              {getItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full px-2 text-xs font-medium">
                  {getItemCount()}
                </span>
              )}
            </Link>
            
            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <UserIcon className="h-6 w-6" />
                <span className="font-medium">{user?.username}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  user?.role === 'admin' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {user?.role}
                </span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                    <p className="font-medium">{user?.username}</p>
                    <p className="text-gray-500">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;