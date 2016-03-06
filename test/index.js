import expect from 'expect'
import { createStore, applyMiddleware } from 'redux'

import reducers from '../reducers'
import * as actions from '../actions'

import { STRIP_COUNT, LED_COUNT, INACTIVE_COLOUR } from '../constants/ledDefinitions'

let store = createStore( reducers )

describe('Redux Reducers', () => {

    describe('Frames', () => {

        describe('#all', () => {

            before(() => {
                store.dispatch( actions.reset() )
            })

            it('adds one frames', () => {
                store.dispatch( actions.frameAdd() )
                expect( store.getState().frames.all.length ).toEqual( 2 )
            })

            it('removes one frame', () => {
                store.dispatch( actions.frameRmv() )
                expect( store.getState().frames.all.length ).toEqual( 1 )
            })
        })

        describe('#position', () => {

            before(() => {
                store.dispatch( actions.reset() )
                store.dispatch( actions.frameAdd() )
                store.dispatch( actions.frameAdd() )
            })

            it('moves position forward', () => {
                expect( store.getState().frames.position ).toEqual( 2 )
            })

            it('moves position backward', () => {
                store.dispatch( actions.frameBwd() )
                expect( store.getState().frames.position ).toEqual( 1 )
            })

            it('moves position back if frame is removed', () => {
                store.dispatch( actions.frameRmv() )
                expect( store.getState().frames.position ).toEqual( 1 )
            })
        })
    })

    describe('LEDS', () => {

        describe('#position', () => {

            before(() => {
                store.dispatch( actions.reset() )
            })

            it('moves forward', () => {
                store.dispatch( actions.ledUp() )
                store.dispatch( actions.ledUp() )
                store.dispatch( actions.ledUp() )
                store.dispatch( actions.ledUp() )
                store.dispatch( actions.ledUp() )
                expect( store.getState().lights.level ).toEqual( 5 )
            })

            it('moves backward', () => {
                store.dispatch( actions.ledDwn() )
                store.dispatch( actions.ledDwn() )
                store.dispatch( actions.ledDwn() )
                store.dispatch( actions.ledDwn() )
                store.dispatch( actions.ledDwn() )
                expect( store.getState().lights.level ).toEqual( 0 )
            })
        })

        describe('#activate', () => {

            beforeEach(() => {
                store.dispatch( actions.reset() )
            })

            it('activate loop at level 0', () => {
                store.dispatch( actions.ledActivate( 'ffffff' ))
                const expectCurrent = Array.from(new Array(8), () => 'ffffff')
                expect( store.getState().lights.current ).toEqual( expectCurrent )
            })

            it('activate one at level 0', () => {
                store.dispatch( actions.ledActivate( 'ffffff', 2 ))
                const expectCurrent = [INACTIVE_COLOUR, INACTIVE_COLOUR, 'ffffff', INACTIVE_COLOUR, INACTIVE_COLOUR, INACTIVE_COLOUR, INACTIVE_COLOUR, INACTIVE_COLOUR]
                expect( store.getState().lights.current ).toEqual( expectCurrent )
            })

            it('activate strip', () => {
                store.dispatch( actions.ledActivate( 'ffffff', 2, true ))
                const expectCurrent = Array.from(new Array(30), () => 'ffffff')
                expect( store.getState().frames.current[2] ).toEqual( expectCurrent )
            })
        })

        describe('#deactivate', () => {

            beforeEach(() => {
                store.dispatch( actions.reset() )
            })

            it('deactivate loop at level 0', () => {
                store.dispatch( actions.ledActivate( 'ffffff' ))
                store.dispatch( actions.ledDeactivate())
                const expectCurrent = Array.from(new Array(8), () => INACTIVE_COLOUR)
                expect( store.getState().lights.current ).toEqual( expectCurrent )
            })

            it('activate one at level 0', () => {
                store.dispatch( actions.ledActivate( 'ffffff' ))
                store.dispatch( actions.ledDeactivate( 2 ))
                const expectCurrent = ['ffffff', 'ffffff', INACTIVE_COLOUR, 'ffffff', 'ffffff', 'ffffff', 'ffffff', 'ffffff']
                expect( store.getState().lights.current ).toEqual( expectCurrent )
            })

            it('deactivate strip', () => {
                store.dispatch( actions.ledActivate( 'ffffff', 2, true ))
                store.dispatch( actions.ledDeactivate( 2, true ))
                const expectCurrent = Array.from(new Array(30), () => INACTIVE_COLOUR)
                expect( store.getState().frames.current[2] ).toEqual( expectCurrent )
            })
        })
    })
})
