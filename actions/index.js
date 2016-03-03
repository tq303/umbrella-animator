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

export const ledActivate = ( colour = INACTIVE_COLOUR, level = 0, led = null) => {
    return {
        type: 'LED_ACTIVATE',
        colour,
        level,
        led
    }
}

export const ledDeactivate = ( colour = INACTIVE_COLOUR, level = 0, led = null) => {
    return {
        type: 'LED_DEACTIVATE',
        colour,
        level,
        led
    }
}

export const ledCurrentlySelected = () => {
    return {
        type: 'LED_CURRENTLY_SELECTED'
    }
}
