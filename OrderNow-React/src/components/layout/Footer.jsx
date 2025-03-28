import React from 'react';

function Footer() {
  return (
    <footer className="bg-white rounded-lg shadow-sm m-4 dark:bg-gray-800 fixed bottom-0 left-0 right-0">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024 <a href="/" className="hover:underline">OrderNow</a>. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;