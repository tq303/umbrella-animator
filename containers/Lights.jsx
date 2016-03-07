import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import ColorPicker from 'react-color';

import Light from '../components/Light';

import Btn from '../components/Button'

import { activateAllLeds, deActivateAllLeds } from '../actions'

const Lights = () => (
    <div id="ui-lights">

        <div className="lights">
            {
                Array.from(new Array(8), ( a, i ) => <Light index={ i }/>)
            }
        </div>

        <div className="controls">
            <Btn className="fa fa-sun-o"/>
            <Btn className="fa fa-circle-thin"/>
        </div>

        <div className="set-colour">
            <ColorPicker type="slider"/>
        </div>

    </div>
);

Lights.propTypes = {}

const mapStateToProps    = ( state ) => { return {} }
const mapDispatchToProps = ( state ) => { return {} }

export default connect( mapStateToProps, mapDispatchToProps )( Lights );
