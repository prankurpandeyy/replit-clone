// components/Layout.js
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <aside className="w-64 bg-gray-800 p-4">
        <h1 className="text-2xl font-bold mb-4">Replit Clone</h1>
        <nav>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:text-gray-400">Files</a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-gray-400">Projects</a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-gray-400">Settings</a>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <header className="mb-4">
          <h2 className="text-3xl font-semibold">Workspace</h2>
        </header>
        <div className="bg-gray-800 shadow-md rounded-lg p-4 h-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;