import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

// containers
import Lights from './Lights'

// components
import Btn from '../components/Button'
import DisplayNumber from '../components/DisplayNumber'

// actions
import { frameFwd, frameBwd, frameAdd, frameRmv, ledUp, ledDwn } from '../actions'

require('../styles/style.scss');

// UI
const UIAnimation = ({
    framesTotal,
    framePosition,
    ledLevel,
    frameFwd,
    frameBwd,
    frameAdd,
    frameRmv,
    ledUp,
    ledDwn
}) => (
    <div id="cycle">

        <div>
            <Btn onClick={ frameBwd } className="fa fa-step-backward"/>
            <Btn onClick={ frameFwd } className="fa fa-step-forward"/>
        </div>

        <p><DisplayNumber value={ framePosition } />/<DisplayNumber value={ framesTotal }/></p>

        <div>
            <Btn onClick={ frameAdd } className="fa fa-plus"/>
            <Btn onClick={ frameRmv } className="fa fa-minus"/>
        </div>

        <div>
            <Btn onClick={ ledUp } className="fa fa-arrow-up"/>
            <Btn onClick={ ledDwn } className="fa fa-arrow-down"/>
        </div>

        <p><DisplayNumber value={ ledLevel } /></p>

        <Lights/>

    </div>
);

UIAnimation.propTypes = {}

const mapStateToProps = ( state, oProps ) => {
    return {
        framesTotal: state.frames.all.length,
        framePosition: ( state.frames.position + 1 ),
        ledLevel: ( state.lights.level + 1 )
    }
}

const mapDispatchToProps = ( dispatch, oProps ) => {
    return {
        frameFwd: () => dispatch( frameFwd() ),
        frameBwd: () => dispatch( frameBwd() ),
        frameAdd: () => dispatch( frameAdd() ),
        frameRmv: () => dispatch( frameRmv() ),
        ledUp:    () => dispatch( ledUp() ),
        ledDwn:   () => dispatch( ledDwn() ),
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( UIAnimation )
