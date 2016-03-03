import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

// containers
import Lights from './Lights'

// components
import Btn from '../components/Button'
import DisplayNumber from '../components/DisplayNumber'

// actions
import { fwdFrame, bwdFrame, addFrame, removeFrame, fwdLedPosition, bwdLedPosition } from '../actions'

require('../styles/style.scss');

// UI
const UIAnimation = ({ dispatch }) => (
    <div id="cycle">

        <div>
            <Btn className="fa fa-step-backward"/>
            <Btn className="fa fa-step-forward"/>
        </div>

        <p><DisplayNumber/>/<DisplayNumber/></p>

        <div>
            <Btn className="fa fa-plus"/>
            <Btn className="fa fa-minus"/>
            <Btn className="fa fa-undo"/>
        </div>

        <div>
            <Btn className="fa fa-arrow-up"/>
            <Btn className="fa fa-arrow-down"/>
        </div>

        <p><DisplayNumber/></p>

        <Lights/>

    </div>
);

UIAnimation.propTypes = {}

const mapStateToProps    = ( state ) => { return {} }
const mapDispatchToProps = ( state ) => { return {} }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UIAnimation);
