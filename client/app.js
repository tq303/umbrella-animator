import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'

import Canvas   from './canvas'
import Umbrella from './umbrella'
import UIAnimation from './containers/UIAnimation'

import storage from './storage'

import reducers from './reducers'

import initialState from './constants/initialState'

const REDUX_STATE = 'redux-state'

// load from local storage
const loadState = storage.get( REDUX_STATE ) || initialState

const store = createStore(
    reducers,
    loadState,
    applyMiddleware( thunkMiddleware ),
    window.devToolsExtension ? window.devToolsExtension() : undefined
)

let canvas   = new Canvas( 1024, 576, 25 ),
    umbrella = new Umbrella({ x: 0, y: 0 });

// add single umbrella
canvas.scene.add( umbrella )


if ( storage.get( REDUX_STATE ) !== null ) {
    updateUmbrella( storage.get( REDUX_STATE ) )
}

// resize logic
window.addEventListener("resize", ()=> {

    canvas.resize( window.innerWidth, window.innerHeight )

}, false)

render (
    <Provider store={ store }>
        <UIAnimation />
    </Provider>,
    document.getElementById('ui-animation')
)

store.subscribe(()=> {

    if ( store.getState().playing ) {

        if ( !umbrella.isAnimating() ) {

            umbrella.startAnimate( store.getState().frames )

        }

    } else if ( umbrella.isAnimating() ) {


        umbrella.stopAnimate()

    } else {
            
        updateUmbrella( store.getState() )
        
        storage.set( REDUX_STATE , store.getState())
    }
})

function updateUmbrella( store ) {
    umbrella.updateColour( store.frames.current )
    umbrella.updateLedPosition( store.lights.level )
}

window.dispatchEvent(new Event('resize'))
