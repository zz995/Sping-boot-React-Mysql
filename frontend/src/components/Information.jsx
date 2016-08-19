'use strict';

import React, { Component } from 'react';
import Category from './Category.jsx';
import Thing from './Thing.jsx';
import InstenseThingAction from '../actions/InstenseThingActions';
import ThingApi from '../utils/ThingApi'

export default class Information extends Component {

    render() {
        const idThing = this.props.params.thing;

        ThingApi.getThing(idThing);

        return (
            <div className="wrapper">
                <div className="aside">
                    <Category/>
                </div>

                <article className="main">
                    <Thing/>
                </article>
            </div>
        )
    }
}