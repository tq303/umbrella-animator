// FRAME's
export const fwdFrame = () => {
    return {
        type: 'FWD_FRAME'
    }
}

export const bwdFrame = () => {
    return {
        type: 'BWD_FRAME'
    }
}

export const addFrame = ( position ) => {
    return {
        type: 'ADD_FRAME',
        position
    }
}

export const removeFrame = ( position ) => {
    return {
        type: 'REMOVE_FRAME',
        position
    }
}

// LED's
export const fwdLedPosition = () => {
    return {
        type: 'FWD_LED_POSITION'
    }
}

export const bwdLedPosition = () => {
    return {
        type: 'BWD_LED_POSITION'
    }
}

export const activateAllLeds = () => {
    return {
        type: 'ACTIVE_ALL_LEDS'
    }
}
export const deActivateAllLeds = () => {
    return {
        type: 'DEACTIVE_ALL_LEDS'
    }
}
