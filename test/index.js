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
                store.dispatch( actions.frameRemove() )
                expect( store.getState().frames.all.length ).toEqual( 1 )
            })
        })

        describe('#position', () => {

            before(() => {
                store.dispatch( actions.reset() )
                store.dispatch( actions.frameAdd() )
            })

            it('moves position forward', () => {
                store.dispatch( actions.frameFwd() )
                expect( store.getState().frames.position ).toEqual( 1 )
            })

            it('moves position backward', () => {
                store.dispatch( actions.frameBwd() )
                expect( store.getState().frames.position ).toEqual( 0 )
            })
        })
    })

    describe('LEDS', () => {

        describe('#position', () => {

            before(() => {
                store.dispatch( actions.reset() )
            })

            it('moves forward', () => {
                store.dispatch( actions.ledFwd() )
                store.dispatch( actions.ledFwd() )
                store.dispatch( actions.ledFwd() )
                store.dispatch( actions.ledFwd() )
                store.dispatch( actions.ledFwd() )
                expect( store.getState().lights.level ).toEqual( 5 )
            })

            it('moves backward', () => {
                store.dispatch( actions.ledBwd() )
                store.dispatch( actions.ledBwd() )
                store.dispatch( actions.ledBwd() )
                store.dispatch( actions.ledBwd() )
                store.dispatch( actions.ledBwd() )
                expect( store.getState().lights.level ).toEqual( 0 )
            })
        })

        describe('#activate', () => {

            beforeEach(() => {
                store.dispatch( actions.reset() )
            })

            it('activate loop at level 0', () => {
                store.dispatch( actions.ledActivate( 'ffffff' ))
                const expectCurrent = ['ffffff', 'ffffff', 'ffffff', 'ffffff', 'ffffff', 'ffffff', 'ffffff', 'ffffff']
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
    })
})
