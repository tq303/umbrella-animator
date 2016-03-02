import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from '../reducers'

import UIAnimation from './UIAnimation'

const store = createStore( reducers );

class Animator {

    constructor( umbrellas ) {

        this.frames    = [];
        this.umbrellas = umbrellas;

        render(
            <Provider store={ store }>
                <UIAnimation frames={ this.frames } updateParent={ this.update.bind(this) } />
            </Provider>,
            document.getElementById('ui-animation')
        )
    }

    update( frames ) {

    }

}

export default Animator;
