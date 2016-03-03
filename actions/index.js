// global
export const reset = ( position ) => {
    return {
        type: 'RESET'
    }
}

// FRAME's
export const fwdFrame = () => {
    return {
        type: 'FRAME_FWD'
    }
}

export const bwdFrame = () => {
    return {
        type: 'FRAME_BWD'
    }
}

export const addFrame = ( position ) => {
    return {
        type: 'FRAME_ADD',
        position
    }
}

export const removeFrame = ( position ) => {
    return {
        type: 'FRAME_REMOVE',
        position
    }
}

// LED's
export const fwdLedPosition = () => {
    return {
        type: 'LED_FWD_POSITION'
    }
}

export const bwdLedPosition = () => {
    return {
        type: 'LED_BWD_POSITION'
    }
}

export const activateAllLeds = () => {
    return {
        type: 'LED_ACTIVATE_ALL'
    }
}
export const deActivateAllLeds = () => {
    return {
        type: 'LED_DEACTIVATE_ALL'
    }
}
