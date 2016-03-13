import defaultFrame from '../constants/defaultFrame'
import initialState from '../constants/initialState'

import { STRIP_COUNT, LED_COUNT, INACTIVE_COLOUR } from '../constants/ledDefinitions'

export default ( state = initialState, action )=> {

    switch( action.type ) {

        case 'FRAME_FWD':

            if ( ( state.frames.position + 1 ) < state.frames.all.length ) {

                return {
                    ...state,
                    frames: {
                        all: state.frames.all.map( frame => frame ),
                        position: ( state.frames.position + 1 ),
                        current: state.frames.all[ state.frames.position ].map( strip => strip )
                    }
                }
            }
            break

        case 'FRAME_BWD':

            if ( ( state.frames.position - 1 ) >= 0 ) {

                return {
                    ...state,
                    frames: {
                        all: state.frames.all.map( frame => frame ),
                        position: ( state.frames.position - 1 ),
                        current: state.frames.all[ state.frames.position ].map( strip => strip )
                    }
                }
            }
            break

        case 'FRAME_ADD':

            // can insert at end or into position
            return {
                ...state,
                frames: {
                    all: [
                        ...state.frames.all.slice( 0, state.frames.position + 1),
                        defaultFrame,
                        ...state.frames.all.slice( state.frames.position + 1 )
                    ],
                    position: ( state.frames.position + 1 ),
                    current: state.frames.all[ state.frames.position ].map( strip => strip )
                }
            }

        case 'FRAME_REMOVE':

            if ( state.frames.all.length > 1 ) {
                // can remove at end or into position
                return {
                    ...state,
                    frames: {
                        all: [
                            ...state.frames.all.slice( 0, state.frames.position ),
                            ...state.frames.all.slice( state.frames.position + 1 )
                        ],
                        position: ( state.frames.position >= ( state.frames.all.length - 2 ) ) ? ( state.frames.all.length - 2 ) : state.frames.position,
                        current: state.frames.all[ state.frames.position ].map( strip => strip )
                    }
                }
            }
            break

        case 'LED_UP':

            if ( ( state.lights.level + 1 ) < LED_COUNT ) {

                return {
                    ...state,
                    lights: {
                        ...state.lights,
                        level: ( state.lights.level + 1 ),
                        current: state.frames.all[ state.frames.position ].map( strip => strip[ state.lights.level + 1 ] )
                    }
                }
            }
            break

        case 'LED_DWN':

            if ( ( state.lights.level - 1 ) >= 0 ) {

                return {
                    ...state,
                    lights: {
                        ...state.lights,
                        level: ( state.lights.level - 1 ),
                        current: state.frames.all[ state.frames.position ].map( strip => strip[ state.lights.level - 1 ] )
                    }
                }
            }
            break

        case 'LED_ACTIVATE':

            // change led lights
            const modifiedActivatedFrame = state.frames.current.map(( strip, sIndex ) => {

                return strip.map(( light, lIndex ) => {

                    // highlight strip
                    if ( action.strip !== false ) {

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
            return {
                ...state,
                frames: {
                    ...state.frames,
                    all: state.frames.all.map(( frames, index ) => {
                        if ( index === state.frames.position ) {
                            return modifiedActivatedFrame
                        } else {
                            return frames
                        }
                    }),
                    current: modifiedActivatedFrame.map( strip => strip )
                },
                lights: {
                    ...state.lights,
                    current: modifiedActivatedFrame.map( strip => strip[ state.lights.level ] ),
                }
            }

        case 'LED_DEACTIVATE':
            // change led lights
            const modifiedDeactivatedFrame = state.frames.current.map(( strip, sIndex ) => {

                return strip.map(( light, lIndex ) => {

                    // highlight strip
                    if ( action.strip ) {

                        if ( action.strip === sIndex ) {

                            if ( action.all ) {
                                // hightlight entire strip
                                light = INACTIVE_COLOUR

                            } else {

                                if ( state.lights.level === lIndex ) {
                                    // highlight specific led in strip
                                    light = INACTIVE_COLOUR
                                }
                            }
                        }

                    } else {

                        if ( lIndex === state.lights.level ) {
                            light = INACTIVE_COLOUR
                        }
                    }

                    return light
                })
            })

            // update currently selected
            return {
                ...state,
                frames: {
                    ...state.frames,
                    all: state.frames.all.map(( frames, index ) => {
                        if ( index === state.frames.position ) {
                            return modifiedDeactivatedFrame
                        } else {
                            return frames
                        }
                    }),
                    current: modifiedDeactivatedFrame.map( strip => strip )
                },
                lights: {
                    ...state.lights,
                    current: modifiedDeactivatedFrame.map( strip => strip[ state.lights.level ] ),
                }
            }

        case 'LED_ARRAY_ROTATE_LEFT':
            return {
                ...state,
                lights: {
                    ...state.lights,
                    rotate: state.lights.rotate - ( 360 / STRIP_COUNT )
                }
            }

        case 'LED_ARRAY_ROTATE_RIGHT':
            return {
                ...state,
                lights: {
                    ...state.lights,
                    rotate: state.lights.rotate + ( 360 / STRIP_COUNT )
                }
            }

        case 'SET_SWATCH':
            return {
                ...state,
                swatch: action.swatch
            }

        case 'RESET':
            return {
                ...initialState
            }
    }

    return state
}
