import React from 'react';
import * as AiIcons from 'react-icons/ai';


//Here there be navbar items
export const NavigationData = [
    {
        title: 'Home',
         path: '/dashboard',
         icon: <AiIcons.AiOutlineHome />,
        cName: 'nav-text'
    },
    {
        title: 'Calendar',
         path: '/calendar',
         icon: <AiIcons.AiOutlineCalendar />,
        cName: 'nav-text'
    },
    {
        title: 'Search',
         path: '/expert-search',
         icon: <AiIcons.AiOutlineSearch />,
        cName: 'nav-text'
    },
    {
        title: 'About Us',
         path: '/about-page',
         icon: <AiIcons.AiOutlineInfoCircle />,
        cName: 'nav-text'
    },
    {
        title: 'Contact Us',
        path: '/contact-page',
        icon: <AiIcons.AiOutlineContacts />,
       cName: 'nav-text'
    }
]