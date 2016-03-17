import fetch from 'isomorphic-fetch'

const config = require('../../config');

import { STRIP_COUNT, LED_COUNT, INACTIVE_COLOUR } from '../constants/ledDefinitions'

// global
export const reset = () => ({
    type: 'RESET'
})

// FRAME's
export const frameFwd = () => ({
    type: 'FRAME_FWD'
})

export const frameBwd = () => ({
    type: 'FRAME_BWD'
})

export const frameAdd = () => ({
    type: 'FRAME_ADD'
})

export const frameRmv = () => ({
    type: 'FRAME_REMOVE'
})

// LED's
export const ledUp = () => ({
    type: 'LED_UP'
})

export const ledDwn = () => ({
    type: 'LED_DWN'
})

export const ledActivate = ( colour = INACTIVE_COLOUR, strip = false, all = false ) => ({
    type: 'LED_ACTIVATE',
    colour,
    strip,
    all
})

export const ledDeactivate = ( strip = false, all = false ) => ({
    type: 'LED_DEACTIVATE',
    strip,
    all
})

export const setSwatch = ( swatch = INACTIVE_COLOUR ) => ({
    type: 'SET_SWATCH',
    swatch
})

export const ledArrayRotateLeft = () => ({
    type: 'LED_ARRAY_ROTATE_LEFT'
})

export const ledArrayRotateRight = () => ({
    type: 'LED_ARRAY_ROTATE_RIGHT'
})

export const setPlaying = ( playing = true ) => ({
    type: 'SET_PLAYING',
    playing
})

export const setFrameRate = ( fps ) => ({
    type: 'SET_FRAMERATE',
    fps: fps.value
})

export const saveAnimation = () => {
    return ( dispatch, store ) => {

        dispatch( setUploading() )

        fetch( config.api.url, {
            ...config.request.headers,
            body: JSON.stringify( store().frames.all )
        })
        .then( response => response.json() )
        .then( json => { console.log(json); dispatch( setUploaded() )} )
    }
}

const setUploading = () => ({
    type: 'SET_UPLOADING'
})

const setUploaded = () => ({
    type: 'SET_UPLOADED'
})