import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-600">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">Page not found</h2>
        <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn't find the page you're looking for.</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="flex items-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <Home size={18} className="mr-2" />
            Go back home
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="flex items-center text-sm font-semibold text-gray-900 hover:text-blue-600"
          >
            <ArrowLeft size={18} className="mr-2" />
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;