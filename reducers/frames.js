import { combineReducers } from 'redux'

import initialState from '../constants/initialState'
import defaultFrame from '../constants/defaultFrame'

export default function (state = initialState.frames, action) {

    switch( action.type ) {

        case 'FRAME_FWD':

            if ( ( state.position + 1 ) < state.all.length ) {
                state.position = ( state.position + 1 )
            }
            break

        case 'FRAME_BWD':
        
            if ( ( state.position - 1 ) >= 0 ) {
                state.position = ( state.position - 1 )
            }
            break

        case 'FRAME_ADD':

            // can insert at end or into position
            if ( typeof action.position === 'undefined' ) {
                state.all = [ ...state.all, defaultFrame ]
            } else {
                state.all = [
                    ...state.all.splice( 0, action.position ),
                    ...state.all, defaultFrame,
                    ...state.all.splice( action.position + 1 )
                ]
            }

            break

        case 'FRAME_REMOVE':

            // can remove at end or into position
            if ( typeof action.position === 'undefined' ) {
                state.all = [
                    ...state.all.splice( 0, state.all.length - 1 )
                ]
            } else {
                state.all = [
                    ...state.all.splice( 0, action.position ),
                    ...state.all.splice( action.position + 1 )
                ]
            }

            break

        case 'FRAME_CURRENT':
            break

        case 'RESET':
            state = initialState.frames
            break;
    }

    return state
}
