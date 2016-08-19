'use strict';

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App  from './components/App.jsx';
import Main from './components/Main.jsx';
import Information from './components/Information.jsx';
import About from './components/About.jsx';
import Admin from './components/Admin.jsx';
import NotFound from './components/NotFound.jsx';

import './style/link.scss'

export const routes = (
    <div>
        <Route path='/' component={App}>
            <IndexRoute component={Main} />
            <Route path='/admin' component={Admin} activeClassName='active'/>
            <Route path='/about' component={About} activeClassName='active'/>
            <Route path='/category/:category' component={Main} activeClassName='active'/>
            <Route path='/thing/:thing' component={Information}/>
        </Route>
        <Route path='*' component={NotFound} />
    </div>
);