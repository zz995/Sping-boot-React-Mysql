'use strict';

import {EventEmitter} from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let _categories = {};
let _selected = {};
let _posInput = null;
let _isAdmin = false;
let _feature = {};

const checkProp = data => {
    let {name, value, check} = data;

    _selected[name][value] = check;

/*    _selected.name = data.name;
    _selected.value = data.value;*/
};

const loadFeatureData = data => {
    _feature = {};
    _selected = {};
    data.forEach(item => {
        if (_feature[item[0]]) {
            _feature[item[0]].push(item[1]);
        } else {
            _feature[item[0]] = [item[1]];
        }

        if (!_selected[item[0]]) _selected[item[0]] = {};

        _selected[item[0]][item[1]] = false;
    });
};

const loadCategoryData = data => {
    _categories = data.map((item, i, array) => Object.assign(item, {
        visible: item.level == 1,
        isLeaf: !(array[i + 1] && array[i + 1].level > item.level),
        isClose: true
    }));
};

const toggleVisible = (id, turn)  => {
    let start = false;
    let level = -1;

    for (let i = 0, l = _categories.length; i < l; i++) {
        const category = _categories[i];

        if (start && category.level == level + 1) {
            category.visible = turn || !category.visible;
        }

        if (start && category.level < level + 1) break;

        if (id == category.id) {
            start = true;
            level = category.level;
            category.isClose = turn ? !turn : !category.isClose;
        }
    }
};

const needAddCategory = id => {
    toggleVisible(id, true);

    for(var l = _categories.length; l--;){
        if(_categories[l].id == id) break;
    }

    _posInput = l + 1;
    _categories.splice(l + 1, 0, {
        id: ~0>>>1,
        level: _categories[l] ? _categories[l].level + 1 : 1,
        input: true,
        visible: true,
        ref: id
    });
};

const inputDelete = () => {
    _categories.splice(_posInput, 1);
};

const create = (data) => {
    let parentFind = false;
    let parentClose = false;
    let findEnd = false;
    let lastPos = 0;

    for(var i = 0, l = _categories.length; i < l; i++){
        if (parentFind && data.level > _categories[i].level)  {
            lastPos = i;
            findEnd = true;
            break;
        }
        if (!parentFind && data.parentId == _categories[i].id) {
            lastPos = i;
            parentFind = true;
            parentClose = _categories[i].isClose;
            _categories[i].isLeaf = false;
        }
    }

    _categories.splice(findEnd ? lastPos : i, 0, {
        id: data.id,
        level: data.level,
        name: data.name,
        visible: !parentClose,
        isClose: true,
        isLeaf: true
    });

    console.log(_categories);
};

const remove = (data) => {
    const {id} = data;
    let pos = -1;
    let level = 0;
    let count = 0;
    let countDelete = 0;

    for(let i = 0, l = _categories.length; i < l; i++) {
        if (pos != -1 && _categories[i].level <= level) {
            break;
        }
        if (_categories[i].id == id) {
            pos = i;
            level = _categories[i].level;
        }
        count += pos == -1 ? 0 : 1;
    }

    console.log(count);

    if ((_categories[pos - 1] && _categories[pos - 1].level < level) && (!_categories[pos + 1] || level < _categories[pos + 1].level)) {
        _categories[pos - 1].isClose = true;
        _categories[pos - 1].isLeaf = true;
    }

    if (pos != -1) _categories.splice(pos, count);
};

class CategoryStoreClass extends EventEmitter {

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(cb) {
        this.on(CHANGE_EVENT, cb);
    }

    removeChangeListener(cb) {
        this.removeListener(CHANGE_EVENT, cb);
    }

    getCategories() {
        return _categories;
    }

    getAdminState() {
        return _isAdmin;
    }

    getSelected() {
        return _selected;
    }

    getFeature() {
        return _feature;
    }
}

const CategoryStore = new CategoryStoreClass();

CategoryStore.dispatcherApp = AppDispatcher.register((payload) => {
    const {data, actionType} = payload;

    switch (actionType) {
        case AppConstants.RECEIVE_CATEGORY:
            loadCategoryData(data);
            break;
        case AppConstants.TOGGLE_VISIBLE:
            toggleVisible(data.id);
            break;
        case AppConstants.NEED_ADD_CATEGORY:
            needAddCategory(data.id);
            break;
        case AppConstants.INPUT_CANCEL:
            inputDelete();
            break;
        case AppConstants.ADD_CATEGORY:
            create(data);
            break;
        case AppConstants.DELETE_CATEGORY:
            remove(data);
            break;
        case AppConstants.LEAVE_ADMIN_PANEL:
            _isAdmin = false;
            break;
        case AppConstants.ENTER_ADMIN_PANEL:
            _isAdmin = true;
            break;
        case AppConstants.RECEIVE_FEATURE:
            loadFeatureData(data);
            break;
        case AppConstants.CHECK_PROP:
            checkProp(data);
            break;
        default:
            return true;
    }

    CategoryStore.emitChange();

    return true;
});

export default CategoryStore;