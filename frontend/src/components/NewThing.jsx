'use strict';

import React, {Component} from 'react';
import {Link} from 'react-router';
import ThingStore from '../store/CreateThingStore';
import CreateThingActions from '../actions/CreateThingActions';
import '../style/newThing.scss';

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
        const {categories = [], features = []} = thing;

        return (
            <div className="new-thing">
                <h2>Додання нової речі</h2>
                <hr/>
                <div>
                    <label htmlFor="name">Ім'я: </label>
                    <input name='name' value={thing.name} onChange={this.changeName}/>
                </div>
                <div className="categories">
                    <button onClick={CreateThingActions.addCategory}>Додати категорію</button>

                    {categories.length ? <label htmlFor="categories" className="title-create">Категорії: </label> : ''}
                    {categories.map((category, i) => {
                        const changeCategory = this.changeCategory.bind(this, i);
                        const deleteCategory = CreateThingActions.deleteCategory.bind(this, {index: i});
                        return (
                            <div className="category">
                                <input name={`categories[]`} value={category} onChange={changeCategory} placeholder="Id категорії"/>
                                <button className="delete" onClick={deleteCategory}>Видалити категорію</button>
                            </div>
                        );
                    })}
                </div>
                <div>
                    <button onClick={CreateThingActions.addFeature}>Додати характеристику</button>
                    {features.length ? <label htmlFor="categories" className="title-create">Характеристики: </label> : ''}
                    {features.map((feature, i) => {
                        const changeFeatureName = this.changeFeature.bind(this, i, "name");
                        const changeFeatureValue = this.changeFeature.bind(this, i, "value");
                        const deleteFeature = CreateThingActions.deleteFeature.bind(this, {index: i});
                        const changeFeatureCategory = CreateThingActions.changeFeatureCategory.bind(null, {
                            index: i,
                            value: feature.category
                        });
                        return (
                            <div className="feature">
                                <label htmlFor="features">Ім'я: </label>
                                <input name={`features[][name]`} className="space" value={feature.name} onChange={changeFeatureName}/>
                                <label htmlFor="features">Значення: </label>
                                <input name={`features[][value]`} className="space" value={feature.value} onChange={changeFeatureValue}/>
                                <label htmlFor="category">Включити до категорій </label>
                                <input type="checkbox" name="category" className="space" value={feature.category} checked={feature.category} onChange={changeFeatureCategory}/>
                                <button className="delete" onClick={deleteFeature}>Видалити характеристику</button>
                            </div>
                        );
                    })}
                </div>
                <button className="send" onClick={CreateThingActions.add.bind(null, thing)}>Відправити дані</button>
            </div>
        )
    }

    changeName(e) {
        CreateThingActions.changeName({name: e.target.value});
    }

    changeCategory(index, e) {
        CreateThingActions.changeCategory({index, value: e.target.value});
    }

    changeFeature(index, type, e) {
        CreateThingActions.changeFeature({index, type, value: e.target.value})
    }
}




//створення нової речі