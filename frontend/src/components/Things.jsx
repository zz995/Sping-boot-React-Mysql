'use strict';

import React, {Component} from 'react';
import {Link} from 'react-router';
import ThingStore from '../store/ThingsStore';
import '../style/things.scss';

const getAppState = () => {
    return {
        things: ThingStore.getThings()
    }
};

export default class Category extends Component {

    constructor(props) {
        super(props);
        this.state = getAppState();
        this._onChange = ::this._onChange;
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

    render() {

        const things = this.state.things;

        return (
            <div className="things">
                {   !things.length ? 'Данні відсутні' :
                    things.map((item) => {
                        return (
                            <div className="thing" key={item.id}>
                                <Link to={`/thing/${item.id}`} className='title'>{item.name}</Link>
                                <div>
                                    <span>
                                        Категорії:{' '}
                                        { item.categories.map(category =>
                                                <Link key={category.id} to={`/category/${category.id}`} className='referents'>{' ' + category.name}</Link>
                                        ) }
                                    </span>
                                </div>
                                <h4>Загальні характеристики:</h4>
                                {
                                    item.feature_vals.map(feature =>
                                        <div key={feature.id} className="feature">
                                            {
                                                feature.feature_title
                                                    ?
                                                        <span>
                                                            {`${feature.feature_title.name}: ${feature.value}`}
                                                        </span>
                                                    : ''
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        )
                    })
                }
                <div className={things.length && things.length & 1 ? "thing" : "cap"}></div>
            </div>
        )
    }
}