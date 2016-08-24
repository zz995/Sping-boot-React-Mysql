'use strict';

import React, {Component} from 'react';
import {Link} from 'react-router';
import ThingActions from '../actions/ThingActions';
import ThingStore from '../store/ThingsStore';
import '../style/deleteThing.scss';

const getAppState = () => {
    return {
        things: ThingStore.getThings()
    }
};

export default class DeleteThing extends Component {

    constructor(props) {
        super(props);
        this.state = getAppState();
        this._onChange = ::this._onChange;
        this.delete = ::this.delete;
    }

    _onChange() {
        this.setState(getAppState());
    }

    componentDidMount() {
        ThingStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        ThingStore.removeChangeListener(this._onChange);
    }

    delete() {
        const value = this.refs.selectForDelete.value;
        ThingActions.delete(value);
    }

    render() {

        const {things} = this.state;

        console.log(things);

        return (
            <div className="delete-thing">
                <h2>Видалення речі</h2>
                <hr/>

                {
                    things.length
                        ?   <div>
                                <select size="5" ref="selectForDelete">
                                    {
                                        things.map(item => <option key={item.id} value={item.id}>{item.name}</option>)
                                    }
                                </select>
                                <button className="delete" onClick={this.delete}>Видалити</button>
                            </div>
                        : ''
                }

            </div>
        )
    }
}