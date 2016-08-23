'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher.js';
import AppConstants from '../constants/AppConstants.js';
import ThingApi from '../utils/ThingApi';

export default {

    changeName(data) {
        AppDispatcher.dispatch({
            actionType: AppConstants.CREATE_THING_CHANGE_NAME,
            data
        })
    },

    changeCategory(index) {
        AppDispatcher.dispatch({
            actionType: AppConstants.CREATE_THING_CHANGE_CATEGORY,
            data: {
                index
            }
        })
    },

    addFeature(data) {
        AppDispatcher.dispatch({
            actionType: AppConstants.CREATE_THING_ADD_FEATURE,
            data
        })
    },

    changeFeature(data) {
        AppDispatcher.dispatch({
            actionType: AppConstants.CREATE_THING_CHANGE_FEATURE,
            data
        })
    },

    deleteFeature(data) {
        AppDispatcher.dispatch({
            actionType: AppConstants.CREATE_THING_DELETE_FEATURE,
            data
        })
    },

    changeFeatureCategory(data) {
        AppDispatcher.dispatch({
            actionType: AppConstants.CREATE_THING_FEATURE_CATEGORY,
            data
        })
    },

    add(data) {
        ThingApi.addThing(data);
    },

    created(data) {
        AppDispatcher.dispatch({
            actionType: AppConstants.CREATED_THING,
            data
        })
    }
}