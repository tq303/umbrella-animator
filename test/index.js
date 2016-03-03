import expect from 'expect'

import reducers from '../reducers'
import * as actions from '../actions'

import initialState from '../constants/initialState'

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
                reducers( {}, actions.addFrame() )
            })

            it('adds two frames', () => {
                expect( reducers( {}, actions.addFrame() ).frames.all.length ).toEqual( 2 )
            })

            it('removes a frame', () => {
                expect( reducers( {}, actions.removeFrame() ).frames.all.length ).toEqual( 1 )
            })
        })

        describe('#position', () => {

            before(() => {
                reducers( {}, actions.reset() )
            })

            it('moves position forward', () => {
                expect( reducers( {}, actions.fwdFrame() ).frames.position ).toEqual( 1 )
            })

            // it('moves position backward', () => {
            //     return true
            // })
        })
    })
})
