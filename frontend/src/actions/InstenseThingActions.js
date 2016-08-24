'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher.js';
import AppConstants from '../constants/AppConstants.js';

export default {

    receiveThing(data) {
        console.log('action');
        console.log(data);
        AppDispatcher.dispatch({
            actionType: AppConstants.RECEIVE_THING,
            data
        })
    }
}