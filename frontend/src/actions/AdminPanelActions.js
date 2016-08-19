'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher.js';
import AppConstants from '../constants/AppConstants.js';

export default {

    leave(data) {
        AppDispatcher.dispatch({
            actionType: AppConstants.LEAVE_ADMIN_PANEL,
            data
        })
    },

    enter(data) {
        AppDispatcher.dispatch({
            actionType: AppConstants.ENTER_ADMIN_PANEL,
            data
        })
    }
}