import React from 'react';

function Footer() {
  return (
    <footer className="bg-white rounded-lg shadow-sm dark:bg-gray-800 mt-auto">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2025 <a href="/" className="hover:underline">OrderNow</a>. Todos los derechos reservados.
        </span>
      </div>
    </footer>
  );
}

export default Footer;