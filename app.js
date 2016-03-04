import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import Canvas   from './canvas'
import Umbrella from './umbrella'
import Animator from './animator'
import UIAnimation from './containers/UIAnimation'

import reducers from './reducers'

const store = createStore( reducers )

let canvas = new Canvas( 1024, 576, 25 ),
    umbrellas = []

// add single umbrella
umbrellas[0] = new Umbrella({ x: 0, y: 0 })
// canvas.scene.add( umbrellas[0] )

let animator = new Animator( umbrellas )

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
