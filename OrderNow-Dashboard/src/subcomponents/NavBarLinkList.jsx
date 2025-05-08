import React from 'react';
import NavBarLink from './NavBarLink';

const NavBarLinkList = ({ links }) => {
    const list = links.map((link, index) => (
        <li key={index}>
            <NavBarLink url={link.url} text={link.text} />
        </li>
    ));

  return (
    <ul
        className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
        >
        {list}
    </ul>
);
};

export default NavBarLinkList