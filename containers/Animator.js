import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from '../reducers'

import Lights from './Lights'

const store = createStore( reducers )

class Animator {

    constructor( umbrellas ) {

        this.frames    = []
        this.umbrellas = umbrellas
    }

    update( frames ) {

    }

}


// this.popFrame.bind(this)
// this.pushFrame.bind(this)
// this.insertFrame.bind(this)
// this.deleteFrame.bind(this)
// this.undoDeleteFrame.bind(this)
// this.decreaseLed.bind(this)
// this.increaseLed.bind(this)

// UI
export default render (
    <Provider store={ store }>
        <div id="cycle">

            <div>
                <button>
                    <i className="fa fa-step-backward"></i>
                </button>
                <button>
                    <i className="fa fa-step-forward"></i>
                </button>

                <span>1</span>/<span>1</span>
            </div>

            <div>
                <button>
                    <i className="fa fa-plus"></i>
                </button>
                <button disabled={ false }>
                    <i className="fa fa-minus"></i>
                </button>
                <button disabled={ false }>
                    <i className="fa fa-undo"></i>
                </button>
            </div>

            <div className="led-position">
                <input value={ 1 } type="text" />
                <span><i className="fa fa-arrow-up"></i></span>
                <span><i className="fa fa-arrow-down"></i></span>
            </div>

            <Lights/>

        </div>
    </Provider>,
    document.getElementById('ui-animation')
);
