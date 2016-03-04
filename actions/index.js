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

export const frameAdd = ( position = null ) => {
    return {
        type: 'FRAME_ADD',
        position
    }
}

export const frameRemove = ( position = null ) => {
    return {
        type: 'FRAME_REMOVE',
        position
    }
}

// LED's
export const ledFwd = () => {
    return {
        type: 'LED_FWD'
    }
}

export const ledBwd = () => {
    return {
        type: 'LED_BWD'
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
