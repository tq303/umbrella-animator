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

export const setUploadName = ( name = '' ) => ({
    type: 'SET_UPLOAD_NAME',
    name
})

export const saveAnimation = () => {
    return ( dispatch, store ) => {

        dispatch( setUploading() )

        fetch( config.api.url, {
            ...config.request.headers,
            body: JSON.stringify({
                name:   store().upload.name,
                frames: store().frames.all
            })
        })
        .then( response => {
            console.log( response )
            if (response.status >= 200 && response.status < 300) {
                return response;
            } else {
                throw response.statusText;
            }
        })
        .then( json => dispatch( setUploaded() ) )
        .catch( error => dispatch( setUploadError( error ) ) )
    }
}

const setUploading = () => ({
    type: 'SET_UPLOADING'
})

const setUploaded = () => {
    return ( dispatch, store ) => {
        dispatch( hideUploadModal() )
        dispatch( setUploadName() )
        dispatch( { type: 'SET_UPLOADED' } )
    }
}

const setUploadError = ( error = '' ) => ({
    type: 'SET_UPLOAD_ERROR',
    error
})

export const showUploadModal = () => ({
    type: 'SHOW_UPLOAD_MODAL'
})

export const hideUploadModal = () => {
    return ( dispatch, store ) => {
        dispatch( allowKeyboardControls() )
        dispatch( setUploadName() )
        dispatch( { type: 'HIDE_UPLOAD_MODAL' } )
    }
}

export const showDownloadModal = () => {
    return dispatch => {
        dispatch( loadAnimation() )
        dispatch( { type: 'SHOW_DOWNLOAD_MODAL' } )
    }
}

export const hideDownloadModal = () => {
    return ( dispatch, store ) => {
        dispatch( allowKeyboardControls() )
        dispatch( { type: 'HIDE_DOWNLOAD_MODAL' } )
    }
}

export const loadAnimation = ( id = null ) => {
    return ( dispatch, store ) => {

        let query = ''

        if ( id !== null ) {
            query = '?' + Object.keys(id)
                          .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(query[key]))
                          .join("&")
                          .replace(/%20/g, "+");
        }

        dispatch( setDownloadInProgress() )

        fetch(`${ config.api.url }${ query }`, {
            ...config.request.headers,
            method: 'get'
        })
        .then( response => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            } else {
                throw response.statusText;
            }
        })
        .then( json => dispatch( setAnimationList( json ) ) )
        .catch( error => dispatch( setAnimationList( [ error ] ) ) )

    }
}

const setDownloadInProgress = ( progress = true ) => ({
    type: 'SET_DOWNLOAD_IN_PROGRESS',
    progress
})

const setAnimationList = ( list = [] ) => ({
    type: 'SET_ANIMATION_LIST',
    list
})

export const allowKeyboardControls = () => ({
    type: 'ALLOW_KEYBOARD_CONTROLS'
})

export const disableKeyboardControls = () => ({
    type: 'DISABLE_KEYBOARD_CONTROLS'
})
