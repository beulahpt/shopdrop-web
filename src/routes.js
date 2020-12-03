import React from 'react';
import {Redirect} from 'react-router';

import ErrorLayout from './layouts/ErrorLayout';

import NotFound from './components/NotFound';

import IndexContainer from './containers/Index';
import SalesContainer from './containers/Sales';

import ParentLayout from './layouts/Parent';
import SalesLayout from './layouts/Sales';

import Placeholder from './components/Placeholder';
import Placeholder2 from './components/Placeholder2';
import Sales from './components/Sales/SalesIndex';
import SaleDetails from './components/Sales/SaleDetails';
import NewSale from './components/Sales/NewSale';

const notFoundRoute = {
  component: NotFound
};


/**
 * The Menu/Breadcrumb Component dynamically parses the following fields:
 *
 * menu - on/off flag for menu item
 * label - the menu text
 * icon - font awesome icon and sizing
 * index - use defined compponent as index route
 *  - Requires exact: true to do the matching
 *
 */
export default [
   {
    path: '/',
    exact: true,
    component: IndexContainer,
    icon: 'fal fa-home',
    label: 'Home',
    menu: false
  },
  {
    path: '/sales',
    component: SalesContainer,
    menu: false,
    routes: [
          {
            path: '/sales',
            component: Sales,
            exact: true
          },
          {
		    path: '/sales/new',
            component: NewSale,
            index: true,
            exact: true
          },
          {
		    path: '/sales/:id',
            component: SaleDetails,
            index: true,
            exact: true
          },
     ],
     notFoundRoute
  },
  {
    path: '/parent',
    component: ParentLayout,
    label: 'Parent',
    icon: 'fal fa-user',
    routes: [
      {
        path: '/parent',
        component: Placeholder,
        index: true,
        exact: true
      },
      notFoundRoute
    ]
  },
  {
    path: '/error/:statusCode',
    component: ErrorLayout,
    label: 'Error',
    menu: false
  },
  notFoundRoute
];
