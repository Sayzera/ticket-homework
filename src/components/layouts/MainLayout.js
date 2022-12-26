import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-4">
        <Outlet />
      </div>

      <div className="dark:bg-gray-800">
        <footer className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-4 p-4 rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 ">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2022 All Rights Reserved.
          </span>
        </footer>
      </div>
    </div>
  );
}
