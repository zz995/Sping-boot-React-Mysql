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

    changeCategory(data) {
        AppDispatcher.dispatch({
            actionType: AppConstants.CREATE_THING_CHANGE_CATEGORY,
            data
        })
    },

    addCategory(data) {
        AppDispatcher.dispatch({
            actionType: AppConstants.CREATE_THING_ADD_CATEGORY,
            data
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

    deleteCategory(data) {
        AppDispatcher.dispatch({
            actionType: AppConstants.CREATE_THING_DELETE_CATEGORY,
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