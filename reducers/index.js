import { combineReducers } from 'redux'

import defaultFrame from '../constants/defaultFrame'
import { STRIP_COUNT, LED_COUNT, INACTIVE_COLOUR } from '../constants/ledDefinitions'

export default function ( state, action ) {

    switch( action.type ) {

        case 'FRAME_FWD':

            if ( ( state.frames.position + 1 ) < state.frames.all.length ) {

                state.frames.position = ( state.frames.position + 1 )
                state.frames.current = state.frames.all[ state.frames.position ].map( strip => strip )

            }
            break

        case 'FRAME_BWD':

            if ( ( state.frames.position - 1 ) >= 0 ) {

                state.frames.position = ( state.frames.position - 1 )
                state.frames.current = state.frames.all[ state.frames.position ].map( strip => strip )

            }
            break

        case 'FRAME_ADD':

            // can insert at end or into position
            if ( action.position === null ) {

                state.frames.all = [ ...state.frames.all, defaultFrame.map( strip => strip ) ]

            } else {

                state.frames.all = [
                    ...state.frames.all.splice( 0, action.position ),
                    ...state.frames.all, defaultFrame.map( strip => strip ),
                    ...state.frames.all.splice( action.position + 1 )
                ]
            }

            state.frames.current = state.frames.all[ state.frames.position ].map( strip => strip )

            break

        case 'FRAME_REMOVE':

            // can remove at end or into position
            if ( action.position === null ) {

                state.frames.all = [
                    ...state.frames.all.splice( 0, state.frames.all.length - 1 )
                ]

            } else {

                state.frames.all = [
                    ...state.frames.all.splice( 0, action.position ),
                    ...state.frames.all.splice( action.position + 1 )
                ]
            }

            if ( state.frames.position >= state.frames.all.length ) {
                state.frames.position = ( state.frames.all.length - 1 )
            }

            state.frames.current = state.frames.all[ state.frames.position ].map( strip => strip )

            break

        case 'FRAME_CURRENT':
            break

        case 'LED_FWD':

            if ( ( state.lights.level + 1 ) < LED_COUNT ) {
                state.lights.level = ( state.lights.level + 1 )
            }
            break

        case 'LED_BWD':

            if ( ( state.lights.level - 1 ) >= 0 ) {
                state.lights.level = ( state.lights.level - 1 )
            }
            break

        case 'LED_ACTIVATE':

            // change led lights
            const modifiedActivatedFrame = state.frames.current.map(( strip, sIndex ) => {

                return strip.map(( light, lIndex ) => {

                    // highlight strip
                    if ( action.strip ) {

                        if ( action.strip === sIndex ) {

                            if ( action.all ) {
                                // hightlight entire strip
                                light = action.colour

                            } else {

                                if ( state.lights.level === lIndex ) {
                                    // highlight specific led in strip
                                    light = action.colour
                                }
                            }
                        }

                    } else {

                        if ( lIndex === state.lights.level ) {
                            light = action.colour
                        }
                    }

                    return light
                })
            })

            // update currently selected
            state.frames.all[ state.frames.position ] = modifiedActivatedFrame.map( strip => strip )
            state.frames.current = modifiedActivatedFrame.map( strip => strip )
            state.lights.current = modifiedActivatedFrame.map(( strip ) => strip[ state.lights.level ] )
            break

        case 'LED_DEACTIVATE':
            break

        case 'RESET':
        default:
            state = {
                frames: {
                    position: 0,
                    all: [ defaultFrame.map( strip => strip ) ],
                    current: defaultFrame.map( strip => strip )
                },
                lights: {
                    current: defaultFrame.map( strip => strip[0] ),
                    level: 0
                }
            }
            break
    }

    return state
}
