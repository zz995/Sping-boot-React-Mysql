'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { routes } from './routes.jsx';
import CategoryAPI from './utils/CategoryApi';
import ThingAPI from './utils/ThingApi';

CategoryAPI.getCategoryData();

render(<Router history={browserHistory} routes={routes}/>,
    document.getElementById('root')
);