import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import ColorPicker from 'react-color';

import Light from '../components/Light';
import Btn from '../components/Button'

import { ledActivate, ledDeactivate, setSwatch } from '../actions'

import { INACTIVE_COLOUR } from '../constants/ledDefinitions'

class Lights extends Component {

    constructor( props ) {
        super( props )

        this.state = {
            swatch: INACTIVE_COLOUR
        }
    }

    colourChange( colour ) {
        this.props.setSwatch( colour.hex )
    }

    ledActivate() {
        this.props.ledActivate( this.props.swatch )
    }

    ledDeactivate() {
        this.props.ledDeactivate()
    }

    render() {
        return (
            <div id="ui-lights">

                <div className="lights">
                    { this.props.current.map(( a, i ) => <Light colour={ a } index={ i }/>) }
                </div>

                <div className="controls">
                    <Btn onClick={ this.ledActivate.bind(this) } className="fa fa-sun-o"/>
                    <Btn onClick={ this.ledDeactivate.bind(this) } className="fa fa-circle-thin"/>
                </div>

                <div className="set-colour">
                    <ColorPicker onChangeComplete={ this.colourChange.bind(this) } type="slider"/>
                </div>

            </div>
        )
    }
}

Lights.propTypes = {}

const mapStateToProps = ( state, ownProps ) => ({
    current: state.lights.current,
    swatch:  state.swatch
})

const mapDispatchToProps = ( dispatch ) => ({
    ledActivate:   ( colour ) => dispatch( ledActivate( colour ) ),
    ledDeactivate: () => dispatch( ledDeactivate() ),
    setSwatch:     ( colour ) => dispatch( setSwatch( colour ) ),
})

export default connect( mapStateToProps, mapDispatchToProps )( Lights );
