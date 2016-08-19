'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher.js';
import AppConstants from '../constants/AppConstants.js';
import CategoryApi from '../utils/CategoryApi';
import ThingApi from '../utils/ThingApi';

export default {

    receiveCategory(data) {
        AppDispatcher.dispatch({
            actionType: AppConstants.RECEIVE_CATEGORY,
            data
        })
    },

    handelClick(id, action) {
        if (action == AppConstants.DELETE_CATEGORY) return CategoryApi.remove(id);

        AppDispatcher.dispatch({
            actionType: action,
            data: {id}
        })
    },

    inputCancel() {
        AppDispatcher.dispatch({
            actionType: AppConstants.INPUT_CANCEL,
            data: {}
        })
    },

    create(data) {
        AppDispatcher.dispatch({
            actionType: AppConstants.INPUT_CANCEL,
            data: {}
        });
        CategoryApi.create(data);
    },

    addData(data) {
        AppDispatcher.dispatch({
            actionType: AppConstants.ADD_CATEGORY,
            data
        });
    },

    findFeature(id) {
        CategoryApi.getFeature(id);
    },

    receiveFeature(data) {
        AppDispatcher.dispatch({
            actionType: AppConstants.RECEIVE_FEATURE,
            data
        });
    },

    remove(id) {
        ThingApi.getThings();
        AppDispatcher.dispatch({
            actionType: AppConstants.DELETE_CATEGORY,
            data: {id}
        });
    },

    selectFeature(data) {
        ThingApi.getThingsByFeature(data);
    },

    checkProp(data) {
        AppDispatcher.dispatch({
            actionType: AppConstants.CHECK_PROP,
            data
        });
    }

}