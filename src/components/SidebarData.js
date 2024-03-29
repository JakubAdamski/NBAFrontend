import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
    {
        title: 'Home',
        path: '/home',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Grupy',
        path: '/group',
        icon: <IoIcons.IoIosPeople />,
        cName: 'nav-text'
    },
    {
        title: 'Konto',
        path: '/account',
        icon: <IoIcons.IoIosPerson/>,
        cName: 'nav-text'
    },
    {
        title: 'Użytkownicy',
        path: '/users',
        icon: <IoIcons.IoMdPeople/>,
        cName: 'nav-text'
    },
    {
        title: 'Mecze',
        path: '/games',
        icon: <IoIcons.IoIosBasketball/>,
        cName: 'nav-text'
    },
    {
        title: 'Dodawanie wiadomości',
        path: '/addnews',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
    },
    {
        title: 'Wyloguj',
        path: '/logout',
        icon: <IoIcons.IoMdLogOut />,
        cName: 'nav-text'
    },
];