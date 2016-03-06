import defaultFrame from './defaultFrame'

export default {
    frames: {
        position: 0,
        all: [ defaultFrame.map( strip => strip ) ],
        current: defaultFrame.map( strip => strip )
    },
    lights: {
        current: defaultFrame.map( strip => strip[0] ),
        level: 0
    }
}
