'use strict';

import {EventEmitter} from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let _thing = {};
let _edit = {};

/*const loadThingsData = data => {
    _things = data.map (item => {
        return item;
    });
};*/

class CreateThingStoreClass extends EventEmitter {

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(cb) {
        this.on(CHANGE_EVENT, cb);
    }

    removeChangeListener(cb) {
        this.removeListener(CHANGE_EVENT, cb);
    }

    getThing() {
        return _thing;
    }
}

const CreateThingStore = new CreateThingStoreClass();

CreateThingStore.dispatcherApp = AppDispatcher.register((payload) => {
    const {data, actionType} = payload;

    console.log(data);

    switch (actionType) {
        case AppConstants.CREATE_THING_CHANGE_NAME:
            _thing.name = data.name;
            break;
        case AppConstants.CREATE_THING_ADD_CATEGORY:
            if (!_thing.categories) {
                _thing.categories = [];
            }
            _thing.categories.push('');
            break;
        case AppConstants.CREATE_THING_CHANGE_CATEGORY:
            _thing.categories[data.index] = data.value;
            break;
        case AppConstants.CREATE_THING_DELETE_CATEGORY:
            _thing.categories.splice(data.index, 1);
            break;
        case AppConstants.CREATE_THING_ADD_FEATURE:
            if (!_thing.features) {
                _thing.features = [];
            }
            _thing.features.push({name: '', value: ''});
            break;
        case AppConstants.CREATE_THING_CHANGE_FEATURE:
            _thing.features[data.index][data.type] = data.value;
            break;
        case AppConstants.CREATE_THING_DELETE_FEATURE:
            _thing.features.splice(data.index, 1);
            break;
        case AppConstants.CREATED_THING:
            _thing = {};
            break;
        case AppConstants.CREATE_THING_FEATURE_CATEGORY:
            _thing.features[data.index].category = !data.value;
            break;
        default:
            return true;
    }

    CreateThingStore.emitChange();

    return true;
});

export default CreateThingStore;