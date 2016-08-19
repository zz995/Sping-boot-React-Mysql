'use strict';

import {EventEmitter} from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let _thing = {};

const loadThingData = data => {

    console.log('getByCategory');
    console.log(data);

    _thing = data;
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

    getThing() {
        return _thing;
    }
}

const ThingStore = new ThingStoreClass();

ThingStore.dispatcherApp = AppDispatcher.register((payload) => {
    const {data, actionType} = payload;
    switch (actionType) {
        case AppConstants.RECEIVE_THING:
            loadThingData(data);
            break;
        default:
            return true;
    }

    ThingStore.emitChange();

    return true;
});

export default ThingStore;