'use strict';

import React, { Component, PropTypes } from 'react';
import AdminPanelActions from '../actions/AdminPanelActions'
import NewThing from './NewThing.jsx';
import DeleteThing from './DeleteThing.jsx';
import Category from './Category.jsx';
import ThingAction from '../actions/ThingActions';

import '../style/main.scss';

export default class Admin extends Component {

    routerWillLeave() {
        AdminPanelActions.leave();
    }

    routerEnter() {
        AdminPanelActions.enter();
    }

    componentWillMount() {
        this.routerEnter();
    }

    componentDidMount() {
        this.context.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
    }

    render() {

        ThingAction.getThings();

        return (
            <div className="wrapper">
                <div className="aside">
                    <Category/>
                </div>

                <article className="new-thing main">
                    <NewThing/>
                    <DeleteThing/>
                </article>
            </div>
        )
    }
}

Admin.contextTypes = {
    router: PropTypes.object.isRequired
};