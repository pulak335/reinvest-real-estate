'use client';
import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = ({ items = [] }) => {
  // Default home item
  const defaultItems = [
    {
      label: 'Home',
      href: '/',
      icon: Home
    },
    ...items
  ];

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      {defaultItems.map((item, index) => {
        const isLast = index === defaultItems.length - 1;
        const IconComponent = item.icon;

        return (
          <div key={index} className="flex items-center">
            {/* Breadcrumb Item */}
            {isLast ? (
              <span className="flex items-center text-gray-900 font-medium">
                {IconComponent && <IconComponent className="w-4 h-4 mr-1" />}
                {item.label}
              </span>
            ) : (
              <Link 
                href={item.href} 
                className="flex items-center text-gray-600 hover:text-purple-600 transition-colors"
              >
                {IconComponent && <IconComponent className="w-4 h-4 mr-1" />}
                {item.label}
              </Link>
            )}
            
            {/* Separator */}
            {!isLast && (
              <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;