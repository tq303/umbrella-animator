import { combineReducers } from 'redux'

import initialState from '../constants/initialState'
import { STRIP_COUNT, LED_COUNT, INACTIVE_COLOUR } from '../constants/ledDefinitions'

export default function (state = initialState.lights, action) {

    switch ( action.type ) {
        case 'LED_FWD':

            if ( ( state.level + 1 ) < LED_COUNT ) {
                state.level = ( state.level + 1 )
            }
            break

        case 'LED_BWD':

            if ( ( state.level - 1 ) >= 0 ) {
                state.level = ( state.level - 1 )
            }
            break

        case 'LED_ACTIVATE':


            break

        case 'LED_DEACTIVATE':
            break

        case 'LED_CURRENTLY_SELECTED':
            break;

        case 'RESET':
            state = initialState.lights
            break
    }
    return state
}
