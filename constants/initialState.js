import defaultFrame from '../constants/defaultFrame'

const initialState = {
    frames: {
        position: 0,
        all: [ defaultFrame ]
    },
    lights: {
        current: defaultFrame.map( strip => strip[0] ),
        level: 0
    }
}

export default initialState
