import React, { PropTypes } from 'react'

import Lights from './Lights'

import Btn from '../components/Button'

require('../styles/style.scss');

// this.popFrame.bind(this)
// this.pushFrame.bind(this)
// this.insertFrame.bind(this)
// this.deleteFrame.bind(this)
// this.undoDeleteFrame.bind(this)
// this.decreaseLed.bind(this)
// this.increaseLed.bind(this)

const FramePosition = ({ current = 1, total = 1 }) => (<p><span>{ current }</span>/<span>{ total }</span></p>)
const LedPosition = ({ position = 1 }) => (<p><span>{ position }</span></p>)

// UI
const UIAnimation = () => (
    <div id="cycle">

        <div>
            <Btn className="fa fa-step-backward"/>
            <Btn className="fa fa-step-forward"/>
        </div>

        <FramePosition />

        <div>
            <Btn className="fa fa-plus"/>
            <Btn className="fa fa-minus"/>
            <Btn className="fa fa-undo"/>
        </div>

        <div>
            <Btn className="fa fa-arrow-up"/>
            <Btn className="fa fa-arrow-down"/>
        </div>

        <LedPosition />

        <Lights/>

    </div>
);


export default UIAnimation;
