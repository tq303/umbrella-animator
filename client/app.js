import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'

import Canvas   from './canvas'
import Umbrella from './umbrella'
import Animator from './animator'
import UIAnimation from './containers/UIAnimation'

import reducers from './reducers'

import initialState from './constants/initialState'

const store = createStore(
    reducers,
    initialState,
    applyMiddleware( thunkMiddleware ),
    window.devToolsExtension ? window.devToolsExtension() : undefined
)

let canvas   = new Canvas( 1024, 576, 25 ),
    umbrella = new Umbrella({ x: 0, y: 0 });

// add single umbrella
canvas.scene.add( umbrella )

let animator = new Animator( umbrella )

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
    umbrella.updateColour( store.getState().frames.current )
    umbrella.updateLedPosition( store.getState().lights.level )
})

window.dispatchEvent(new Event('resize'))
