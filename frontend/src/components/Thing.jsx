'use strict';

import React, {Component} from 'react';
import {Link} from 'react-router';
import ThingStore from '../store/ThingStore';
import '../style/thing.scss';

const getAppState = () => {
    return {
        thing: ThingStore.getThing()
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

        const thing = this.state.thing;

        return (
            <div className="thing">
                <h2>{thing.name}</h2>
                <div>
                    <span>
                        Категорії:{' '}
                        { thing.categories && thing.categories.map(category =>
                            <Link key={category.id} to={`/category/${category.id}`} className='referents'>{category.name}</Link>
                        ) }
                    </span>
                </div>
                <h4>Загальні характеристики:</h4>
                {
                    thing.feature_vals && thing.feature_vals.map(feature =>
                        <div key={feature.id} className="feature">
                            <span>
                                {`${feature.feature_title.name}: ${feature.value}`}
                            </span>
                        </div>
                    )
                }
                <h4>Спецефічні характеристики:</h4>
                {
                    thing.counts && thing.counts.map(item => {
                        return <div>
                            {
                                item.feature_vals.map(feature =>
                                    <div key={feature.id} className="feature">
                                        <span>
                                            {`${feature.feature_title.name}: ${feature.value}`}
                                        </span>
                                    </div>
                                )
                            }
                            <div><span className="count">Кількість: </span> {item.number}</div>
                            <hr/>
                        </div>
                    })
                }
            </div>
        )
    }
}