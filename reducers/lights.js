import { combineReducers } from 'redux'

import initialState from '../constants/initialState'

export default function (state = initialState.lights, action) {

    switch ( action.type ) {
        case 'LED_FWD_POSITION':
            break
        case 'LED_BWD_POSITION':
            break
        case 'LED_ACTIVATE_ALL':
            break
        case 'LED_DEACTIVATE_ALL':
            break
        case 'RESET':
            state = initialState.lights
            break;
    }
    return state
}
