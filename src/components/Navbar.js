'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, isAuthenticated, logout, checkAuth } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
  };

  // Check authentication status on component mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <nav className="bg-white/50 sticky top-0 z-100 backdrop-blur-sm shadow-sm border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="text-xl font-bold text-gray-900 font-heading">Revest</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">

              <Link href="/" className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium font-body">
                Home
              </Link>

              <Link href="/properties" className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium font-body">
                Properties
              </Link>

              <Link href="/loans" className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium font-body">
                Loan
              </Link>
      
              
              <Link href="/list-property" className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium font-body">  
                List your property
              </Link>
              
              
              <Link href="/contact" className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium font-body">
                Contact
              </Link>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 px-4 py-2 text-sm font-medium"
                >
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                  </div>
                  <span>{user.firstName} {user.lastName}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-purple-600 capitalize">{user.type} Account</p>
                    </div>
                    <div className="py-1">
                      <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Profile
                      </Link>
                      <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Dashboard
                      </Link>
                      <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link 
                  href="/login"
                  className="text-gray-700 hover:text-purple-600 px-4 py-2 text-sm font-medium">
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg text-sm font-medium flex items-center">
                  Join Now
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-purple-600 p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/90 backdrop-blur-sm border-t border-white/20">
            <Link href="/" className="text-gray-700 hover:text-purple-600 block px-3 py-2 text-base font-medium">
              Home
            </Link>
            <Link href="/properties" className="text-gray-700 hover:text-purple-600 block px-3 py-2 text-base font-medium">
              Properties
            </Link>
            <Link href="/loans" className="text-gray-700 hover:text-purple-600 block px-3 py-2 text-base font-medium">
              Loan
            </Link>
            <Link href="/list-property" className="text-gray-700 hover:text-purple-600 block px-3 py-2 text-base font-medium">
              List your property
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-purple-600 block px-3 py-2 text-base font-medium">
              Contact
            </Link>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-3 space-y-2 flex-col">
                {isAuthenticated && user ? (
                  <>
                    <div className="flex items-center space-x-3 w-full py-2">
                      <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-purple-600 capitalize">{user.type} Account</p>
                      </div>
                    </div>
                    <Link href="/profile" className="text-gray-700 hover:text-purple-600 w-full text-left py-2 text-base font-medium">
                      Profile
                    </Link>
                    <Link href="/dashboard" className="text-gray-700 hover:text-purple-600 w-full text-left py-2 text-base font-medium">
                      Dashboard
                    </Link>
                    <Link href="/settings" className="text-gray-700 hover:text-purple-600 w-full text-left py-2 text-base font-medium">
                      Settings
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="text-red-600 hover:text-red-700 w-full text-left py-2 text-base font-medium"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="text-gray-700 hover:text-purple-600 w-full text-left py-2 text-base font-medium">
                      Log In
                    </Link>
                    <Link href="/register" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg text-base font-medium w-full text-center">
                      Join Now
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;