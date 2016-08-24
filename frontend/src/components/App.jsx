'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router';

export default class App extends Component {

    render() {
        return (
            <div>
                <ul className="navigation">
                    <li><Link onlyActiveOnIndex={true} activeClassName='active' to='/'>Головна</Link></li>
                    <li><Link to='/admin' activeClassName='active'>Адміністративна панель</Link></li>
                    <li><Link to='/about' activeClassName='active'>Про сайт</Link></li>
                </ul>
                {this.props.children}
            </div>
        )
    }
}