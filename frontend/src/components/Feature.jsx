'use strict';

import React, {Component} from 'react';
import {Link} from 'react-router';
import CategoryStore from '../store/CategoryStore';
import CategoryAction from '../actions/CategoryActions';
import AppConstants from '../constants/AppConstants';
import '../style/feature.scss';

const getAppState = () => {
    return {
        feature: CategoryStore.getFeature(),
        selected: CategoryStore.getSelected()
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
        CategoryStore.addChangeListener(this._onChange);
        console.log('lfjglakdfjglkadjfglkajdflgkjadflgjdlf');
        //React.findDOMNode(this.refs.categoryInput).focus();
    }

    componentWillUnmount() {
        CategoryStore.removeChangeListener(this._onChange);
    }

    render() {
        const {feature, selected} = this.state;

        let featureHtml = [];

        for(let key in feature) {
            featureHtml.push(
                <div key={key} className="name">
                    <span>{key}</span>
                    <div>
                        {feature[key].map(item => {

                            let value = selected[key][item];

                            let check = this.selected.bind(this, key, item, !value);

                            return (
                                <div key={item} className="value">
                                    <input type="checkbox" onChange={check} checked={value}/>
                                    {item}
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        }

        return (
            <div className={`aside2 ${this.props.searchByCategory ? '' : 'display-none'}`}>
                <div className="feature">
                    <div className="title">
                        <span>Характеристики</span>
                    </div>
                    { featureHtml }
                </div>
            </div>
        )
    }

    selected(name, value, check) {
        const select = this.state.selected;
        const feature = this.state.feature;

        CategoryAction.selectFeature({category: this.props.searchByCategory, name, value, check, select, feature});

        return false;
    }
}