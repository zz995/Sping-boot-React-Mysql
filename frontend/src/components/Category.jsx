'use strict';

import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import CategoryStore from '../store/CategoryStore';
import CategoryAction from '../actions/CategoryActions';
import AppConstants from '../constants/AppConstants';
import '../style/category.scss';

const getAppState = () => {
    return {
        categories: CategoryStore.getCategories(),
        isAdmin: CategoryStore.getAdminState()
    }
};

const create = (e) => {
    const parentId = e.target.getAttribute('data-categoryId');
    const name = e.target.value.trim();
    if(e.keyCode == 13 && name) {
        CategoryAction.create({parentId, name});
    }
};

const buildTree = (props) => {

    let {categories, isAdmin} = props;

    if (!categories.length) return null;

    const node = [];
    const {level} = categories[props.id];

    for (
        let length = categories.length;
        props.id < length;
        props.id++
    ) {
        const category = categories[props.id];

        if (level > category.level) {
            props.id--;
            break;
        }

        const currentLevel = category.level;
        node.push(
            <li key={props.id} className={!category.visible ? 'hidden' :''}>
                {
                    currentLevel > level
                        ? buildTree(props)
                        :
                            category.input ? <input data-categoryid={category.ref} autoFocus onBlur={CategoryAction.inputCancel} onKeyUp={create}/> :
                            <span>
                                    <Link to={`/category/${category.id}`} activeClassName='active' className='name'>{category.name}</Link>
                                    <span data-categoryid={category.id} data-typeaction={AppConstants.TOGGLE_VISIBLE} className="action">{
                                        category.isLeaf
                                            ? ''
                                            : category.isClose ? ` ${String.fromCharCode(9660)}` : ` ${String.fromCharCode(9650)}`
                                    }</span>
                                    { isAdmin
                                        ?
                                            <span data-categoryid={category.id} data-typeaction={AppConstants.NEED_ADD_CATEGORY} className="action">
                                                {` ${String.fromCharCode(10133)}`}
                                            </span>
                                        :   ''
                                    }
                                    { isAdmin
                                        ?
                                        <span data-categoryid={category.id} data-typeaction={AppConstants.DELETE_CATEGORY} className="action">
                                            {` ${String.fromCharCode(10060)}`}
                                        </span>
                                        :   ''
                                    }
                            </span>
                }
            </li>
        );
    }

    return (
        <ul key={props.id + categories.length}>
            {
                node
            }
        </ul>
    )
};

export default class Category extends Component {

    constructor(props) {
        super(props);
        this.state = getAppState();
        this._onChange = ::this._onChange;
        this.handelClick = ::this.handelClick;
        //this.routerWillLeave = ::this.routerWillLeave;
    }

    _onChange() {
        this.setState(getAppState());
    }

    componentDidMount() {
        CategoryStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        CategoryStore.removeChangeListener(this._onChange);
    }

    handelClick(e) {
        const id = e.target.getAttribute('data-categoryId');
        const action = e.target.getAttribute('data-typeaction');

        if (!id || !action) return;

        CategoryAction.handelClick(id, action);
    }

    render() {

        const categories = this.state.categories;
        const isAdmin = this.state.isAdmin;

        return (
            <div onClick={this.handelClick} className="category">
                <div className="title">
                    <span>Категорії</span>
                    {
                        this.state.isAdmin
                            ?
                                <span
                                    data-categoryid={categories.length ? categories[0].id : '0'}
                                    data-typeaction={AppConstants.NEED_ADD_CATEGORY}
                                    className = "action"
                                >
                                    {` ${String.fromCharCode(10133)}`}
                                </span>
                            : ''
                    }

                </div>

                {categories.length > 1 ? buildTree({isAdmin, categories, id: 1}) : ''}
            </div>
        )
    }
}
