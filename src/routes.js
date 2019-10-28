import React from 'react';
import Loadable from 'react-loadable'
import { SearchUser } from './views/Users/SearchUser';
import { User } from './views/Users/User';
import { Owners } from './views/Owners/Owners';
import { Owner } from './views/Owners/Owner';
import { Domains } from './views/Domains/Domains'
import {TokenVerification} from './views/Token/TokenVerification'
function Loading() {
  return <div>Loading...</div>;
}

const Dashboard = Loadable({
  loader: () => import('./views/Dashboard/Dashboard'),
  loading: Loading,
});

const routes = [
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/users/search', exact: true,  name: 'Users', component: SearchUser },
  { path: '/users/:id', exact: true,  name: 'User', component: User },
  { path: '/owners/owners', exact: true, name: 'Owners', component: Owners },
  { path: '/owners/:id', exact: true, name: 'Owner', component: Owner },
  { path: '/domains', exact: true, name: 'Domains', component: Domains },
  { path: '/token', exact: true, name: 'Parse a Token', component: TokenVerification }
];

export default routes;