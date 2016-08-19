'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher.js';
import AppConstants from '../constants/AppConstants.js';
import ThingApi from '../utils/ThingApi';

export default {

    receiveThings(data) {
        AppDispatcher.dispatch({
            actionType: AppConstants.RECEIVE_THINGS,
            data
        })
    },

    findByCategory(id) {
        ThingApi.getByCategory(id);
    },

    getThings() {
        ThingApi.getThings();
    },

    delete(value) {
        if (value) {
            ThingApi.deleteThing(value);
        }
    }
}