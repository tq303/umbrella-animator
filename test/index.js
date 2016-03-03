import expect from 'expect'

import reducers from '../reducers'
import * as actions from '../actions'

import initialState from '../constants/initialState'
import { STRIP_COUNT, LED_COUNT, INACTIVE_COLOUR } from '../constants/ledDefinitions'

describe('Redux Reducers', () => {

    describe('Set initial state', () => {

        it('is the same as initialState', () => {
            expect( reducers( undefined, {} ) ).toEqual( initialState )
        })
    })

    describe('Frames', () => {

        describe('#all', () => {

            before(() => {
                reducers( {}, actions.reset() )
            })

            it('adds one frames', () => {
                expect( reducers( {}, actions.frameAdd() ).frames.all.length ).toEqual( 2 )
            })

            it('removes one frame', () => {
                expect( reducers( {}, actions.frameRemove() ).frames.all.length ).toEqual( 1 )
            })
        })

        describe('#position', () => {

            before(() => {
                reducers( {}, actions.reset() )
                reducers( {}, actions.frameAdd() )
            })

            it('moves position forward', () => {
                expect( reducers( {}, actions.frameFwd() ).frames.position ).toEqual( 1 )
            })

            it('moves position backward', () => {
                expect( reducers( {}, actions.frameBwd() ).frames.position ).toEqual( 0 )
            })
        })
    })

    describe('LEDS', () => {

        describe('#position', () => {

            before(() => {
                reducers( {}, actions.reset() )
            })

            it('moves forward', () => {
                reducers( {}, actions.ledFwd() )
                reducers( {}, actions.ledFwd() )
                reducers( {}, actions.ledFwd() )
                reducers( {}, actions.ledFwd() )
                expect( reducers( {}, actions.ledFwd() ).lights.level ).toEqual( 5 )
            })

            it('moves backward', () => {
                reducers( {}, actions.ledBwd() )
                reducers( {}, actions.ledBwd() )
                reducers( {}, actions.ledBwd() )
                reducers( {}, actions.ledBwd() )
                expect( reducers( {}, actions.ledBwd() ).lights.level ).toEqual( 0 )
            })
        })

        describe('#activate', () => {

            beforeEach(() => {
                reducers( {}, actions.reset() )
            })

            // it('activate all at level', () => {
            //     const expectCurrent = ['ffffff', 'ffffff', 'ffffff', 'ffffff', 'ffffff', 'ffffff']
            //     reducers( {}, actions.ledActivate( 'ffffff' )
            //     expect( reducers( {}, actions.ledActivate() ) ).toEqual( expectCurrent )
            // })

            // it('activate one at level', () => {
            //
            //     const expectCurrent = [INACTIVE_COLOUR, INACTIVE_COLOUR, 'ffffff', INACTIVE_COLOUR, INACTIVE_COLOUR, INACTIVE_COLOUR]
            // })
        })
    })
})
