'use strict';

import React, {Component} from 'react';
import {Link} from 'react-router';
import ThingStore from '../store/CreateThingStore';
import CategoryStore from '../store/CategoryStore';
import CreateThingActions from '../actions/CreateThingActions';
import '../style/newThing.scss';

const getAppState = () => {
    return {
        thing: ThingStore.getThing(),
        categories: CategoryStore.getCategories()
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
        CategoryStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        ThingStore.removeChangeListener(this._onChange);
        CategoryStore.removeChangeListener(this._onChange);
    }

    render() {

        const {thing, categories, selectCategories} = this.state;
        const {features = []} = thing;

        return (
            <div className="new-thing">
                <h2>Додання нової речі</h2>
                <hr/>
                <div>
                    <label htmlFor="name">Ім'я: </label>
                    <input name='name' value={thing.name} onChange={this.changeName}/>
                </div>
                <div className="categories">
                    <label htmlFor="categories" className="title-create">Категорії: </label>
                    <select multiple onChange={::this.changeCategory} value={thing.categories} size="10" className="select">
                        {categories && categories.slice(1).filter(item => !item.input).map(category =>
                            <option key={category.id} value={category.id}>
                                {'—'.repeat(category.level).concat(category.name)}
                            </option>
                        )}
                    </select>
                </div>
                <div>
                    <button onClick={CreateThingActions.addFeature}>Додати характеристику</button>
                    {features.length ?
                        <label htmlFor="categories" className="title-create">Характеристики: </label> : ''}
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
                                <input name={`features[][name]`} className="space" value={feature.name}
                                       onChange={changeFeatureName}/>
                                <label htmlFor="features">Значення: </label>
                                <input name={`features[][value]`} className="space" value={feature.value}
                                       onChange={changeFeatureValue}/>
                                <label htmlFor="category">Включити до категорій </label>
                                <input type="checkbox" name="category" className="space" value={feature.category}
                                       checked={feature.category} onChange={changeFeatureCategory}/>
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

    changeCategory({target: {options}}) {
        CreateThingActions.changeCategory(options[options.selectedIndex].value);
    }

    changeFeature(index, type, e) {
        CreateThingActions.changeFeature({index, type, value: e.target.value})
    }
}