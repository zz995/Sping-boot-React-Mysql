'use strict';

import React, { Component } from 'react';
import Category from './Category.jsx';
import Feature from './Feature.jsx';
import Things from './Things.jsx';
import ThingAction from '../actions/ThingActions';
import CategoryAction from '../actions/CategoryActions';
import '../style/main.scss';


export default class Main extends Component {

    render() {
        const idCategory = this.props.params.category;

        if (idCategory) {
            ThingAction.findByCategory(idCategory);
            CategoryAction.findFeature(idCategory);
        } else {
            ThingAction.getThings();
        }

        return (
            <div className="wrapper">
                <div className="aside">
                    <Category/>
                </div>
                <Feature searchByCategory={idCategory}/>
                <article className="main">
                    <Things/>
                </article>
            </div>
        )
    }
}