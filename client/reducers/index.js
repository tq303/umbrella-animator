import defaultFrame from '../constants/defaultFrame'
import initialState from '../constants/initialState'

import { STRIP_COUNT, LED_COUNT, INACTIVE_COLOUR } from '../constants/ledDefinitions'

export default ( state, action )=> {

    switch( action.type ) {

        case 'FRAME_FWD':

            if ( state.playing ) return state

            if ( ( state.frames.position + 1 ) < state.frames.all.length ) {

                return {
                    ...state,
                    frames: {
                        ...state.frames,
                        all: state.frames.all.map( frame => frame ),
                        position: ( state.frames.position + 1 ),
                        current: state.frames.all[ state.frames.position ].map( strip => strip )
                    }
                }
            }
            break

        case 'FRAME_BWD':

            if ( state.playing ) return state

            if ( ( state.frames.position - 1 ) >= 0 ) {

                return {
                    ...state,
                    frames: {
                        ...state.frames,
                        all: state.frames.all.map( frame => frame ),
                        position: ( state.frames.position - 1 ),
                        current: state.frames.all[ state.frames.position ].map( strip => strip )
                    }
                }
            }
            break

        case 'FRAME_ADD':

            if ( state.playing ) return state

            // can insert at end or into position
            return {
                ...state,
                frames: {
                    ...state.frames,
                    all: [
                        ...state.frames.all.slice( 0, state.frames.position + 1),
                        state.frames.all[ state.frames.position ].map( strip => strip ),
                        ...state.frames.all.slice( state.frames.position + 1 )
                    ],
                    position: ( state.frames.position + 1 ),
                    current: state.frames.all[ state.frames.position ].map( strip => strip )
                }
            }

        case 'FRAME_REMOVE':

            if ( state.playing ) return state

            if ( state.frames.all.length > 1 ) {
                // can remove at end or into position
                return {
                    ...state,
                    frames: {
                        ...state.frames,
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

        case 'SET_FRAMERATE':

            if ( state.playing ) return state

            return {
                ...state,
                frames: {
                    ...state.frames,
                    rate: action.fps
                }
            }

        case 'LED_UP':

            if ( state.playing ) return state

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

            if ( state.playing ) return state

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

            if ( state.playing ) return state

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

            if ( state.playing ) return state

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

            if ( state.playing ) return state

            const calcRotateIndexLeft = Math.floor(Math.abs(state.lights.rotate - ( 360 / STRIP_COUNT ) + 360) % 360) / ( 360 / STRIP_COUNT )

            return {
                ...state,
                lights: {
                    ...state.lights,
                    rotate: state.lights.rotate - ( 360 / STRIP_COUNT ),
                    rotateIndex: calcRotateIndexLeft
                }
            }

        case 'LED_ARRAY_ROTATE_RIGHT':

            if ( state.playing ) return state

            const calcRotateIndexRight = Math.floor(Math.abs(state.lights.rotate + ( 360 / STRIP_COUNT ) + 360) % 360) / ( 360 / STRIP_COUNT )

            return {
                ...state,
                lights: {
                    ...state.lights,
                    rotate: state.lights.rotate + ( 360 / STRIP_COUNT ),
                    rotateIndex: calcRotateIndexRight
                }
            }

        case 'SET_SWATCH':

            if ( state.playing ) return state

            return {
                ...state,
                swatch: action.swatch
            }


        case 'SHOW_UPLOAD_MODAL':

            if ( state.playing ) return state

            return {
                ...state,
                upload: {
                    ...state.upload,
                    showModal: true
                }
            }

        case 'HIDE_UPLOAD_MODAL':

            if ( state.playing ) return state

            return {
                ...state,
                upload: {
                    ...state.upload,
                    showModal: false
                }
            }

        case 'SET_UPLOAD_NAME':
            
            console.log( 'setting name', action )

            if ( state.playing ) return state

            return {
                ...state,
                upload: {
                    ...state.upload,
                    name: action.name
                }
            }

        case 'SET_UPLOADING':

            return {
                ...state,
                upload: {
                    ...state.upload,
                    inProgress: true
                }
            }

        case 'SET_UPLOADED':
                
            return {
                ...state,
                upload: {
                    ...state.upload,
                    inProgress: false
                }
            }

        case 'SET_UPLOAD_ERROR':
                
            return {
                ...state,
                upload: {
                    ...state.upload,
                    error: action.error
                }
            }

        case 'SET_PLAYING':
            return {
                ...state,
                playing: action.playing
            }

        case 'ALLOW_KEYBOARD_CONTROLS':
            return {
                ...state,
                lights: {
                    ...state.lights,
                    allowKeyboardControls: true
                }
            }

        case 'DISABLE_KEYBOARD_CONTROLS':
            return {
                ...state,
                lights: {
                    ...state.lights,
                    allowKeyboardControls: false
                }
            }


        case 'RESET':
            return {
                ...initialState
            }
    }

    return state
}
