'use strict';

import {EventEmitter} from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let _things = {};
let _selected = null;


const loadThingsData = data => {
    _things = data.map (item => {
        item.feature_vals.sort((a, b) => {
            if (a.feature_title.name > b.feature_title.name) {
                return 1;
            } else if (a.feature_title.name < b.feature_title.name) {
                return -1;
            } else if (a.value > b.value) {
                return 1;
            } else if (a.value < b.value) {
                return -1;
            } else {
                return 0;
            }
        });
        return item;
    });
};

const clearData = () => {
    _things = {};
};

class ThingStoreClass extends EventEmitter {

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(cb) {
        this.on(CHANGE_EVENT, cb);
    }

    removeChangeListener(cb) {
        this.removeListener(CHANGE_EVENT, cb);
    }

    getThings() {
        return _things;
    }
}

const ThingStore = new ThingStoreClass();

ThingStore.dispatcherApp = AppDispatcher.register((payload) => {
    const {data, actionType} = payload;
    switch (actionType) {
        case AppConstants.RECEIVE_THINGS:
            loadThingsData(data);
            break;
        case AppConstants.DATA_THING_LOAD:
            clearData();
            break;
        default:
            return true;
    }

    ThingStore.emitChange();

    return true;
});

export default ThingStore;