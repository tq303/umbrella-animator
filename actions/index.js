import { STRIP_COUNT, LED_COUNT, INACTIVE_COLOUR } from '../constants/ledDefinitions'

// global
export const reset = () => {
    return {
        type: 'RESET'
    }
}

// FRAME's
export const frameFwd = () => {
    return {
        type: 'FRAME_FWD'
    }
}

export const frameBwd = () => {
    return {
        type: 'FRAME_BWD'
    }
}

export const frameAdd = () => {
    return {
        type: 'FRAME_ADD'
    }
}

export const frameRmv = () => {
    return {
        type: 'FRAME_REMOVE'
    }
}

// LED's
export const ledUp = () => {
    return {
        type: 'LED_UP'
    }
}

export const ledDwn = () => {
    return {
        type: 'LED_DWN'
    }
}

export const ledActivate = ( colour = INACTIVE_COLOUR, strip = false, all = false ) => {
    return {
        type: 'LED_ACTIVATE',
        colour,
        strip,
        all
    }
}

export const ledDeactivate = ( strip = false, all = false ) => {
    return {
        type: 'LED_DEACTIVATE',
        strip,
        all
    }
}
