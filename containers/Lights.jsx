import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import ColorPicker from 'react-color';

import Light from '../components/Light';

import Btn from '../components/Button'

import { ledActivate, ledDeactivate } from '../actions'

const Lights = (
    current,
    ledActivate
) => (
    <div id="ui-lights">

        <div className="lights">
            {
                Array.from(new Array(8), ( a, i ) => <Light swatchColour={ 'ff0000' } colour={ current[ i ] } index={ i }/>)
            }
        </div>

        <div className="controls">
            <Btn onClick={ ledActivate } className="fa fa-sun-o"/>
            <Btn className="fa fa-circle-thin"/>
        </div>

        <div className="set-colour">
            <ColorPicker type="slider"/>
        </div>

    </div>
);

Lights.propTypes = {}

const mapStateToProps    = ( state ) => ({
    current: state.lights.current
})

const mapDispatchToProps = ( dispatch ) => ({
    ledActivate: () => dispatch( ledActivate() )
})

export default connect( mapStateToProps, mapDispatchToProps )( Lights );
