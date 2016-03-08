import defaultFrame from './defaultFrame'
import { INACTIVE_COLOUR } from './ledDefinitions'

export default {
    frames: {
        position: 0,
        all: [ defaultFrame.map( strip => strip ) ],
        current: defaultFrame.map( strip => strip )
    },
    lights: {
        current: defaultFrame.map( strip => strip[0] ),
        level: 0,
        rotate: 0
    },
    swatch: INACTIVE_COLOUR
}
