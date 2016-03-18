import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ColorPicker from 'react-color'

import Light from '../components/Light'
import Btn from '../components/Button'
import DisplayNumber from '../components/DisplayNumber'

import { ledActivate, ledDeactivate, setSwatch } from '../actions'

import { STRIP_COUNT, INACTIVE_COLOUR } from '../constants/ledDefinitions'

class Lights extends Component {

    constructor( props ) {
        super( props )

        this.state = {
            animateClass: ''
        }
    }

    colourChange( colour ) {
        this.props.setSwatch( colour.hex )
    }

    ledActivateComponent( strip = false, all = false ) {
        this.props.ledActivate( this.props.swatch, strip, all )
    }

    ledDeactivateComponent() {
        this.props.ledDeactivate()
    }

    componentWillReceiveProps( newProps ) {
        if ( newProps.level > this.props.level ) {
            // console.log('animate up')
        } else if ( newProps.level < this.props.level ) {
            // console.log('animate down')
        }
    }

    render() {

        let style = {
            transform: `rotateZ(${ this.props.rotate }deg)`
        }

        return (
            <div id="ui-lights">

                <div className="lights" style={ style } >
                    {
                        this.props.current.map(( a, i ) => {
                            return (<Light key={ `lights-${ i }` } colour={ a } index={ i } onClick={ this.ledActivateComponent.bind( this, i ) } />)
                        })
                    }
                </div>

                <div className="lights-controls">
                    <Btn onClick={ this.ledActivateComponent.bind(this, this.props.rotateIndex) } className="fa fa-dot-circle-o"/>
                    <Btn onClick={ this.ledActivateComponent.bind(this) }   className="fa fa-sun-o"/>
                    <Btn onClick={ this.ledActivateComponent.bind(this, this.props.rotateIndex, true) } disabled={ true } className="fa fa-ellipsis-v"/>
                    <Btn onClick={ this.ledDeactivateComponent.bind(this) } className="fa fa-circle-thin"/>
                </div>
                
                <p><DisplayNumber value={ this.props.level } /></p>

                <div className="set-colour">
                    <ColorPicker color={ this.props.swatch } onChangeComplete={ this.colourChange.bind(this) } type="compact"/>
                </div>

            </div>
        )
    }
}

Lights.propTypes = {}

const mapStateToProps = ( state, ownProps ) => ({
    level:   state.lights.level,
    current: state.lights.current,
    rotate:  state.lights.rotate,
    swatch:  state.swatch,
    rotateIndex: state.lights.rotateIndex
})

const mapDispatchToProps = ( dispatch ) => ({
    ledActivate:   ( colour, strip, all ) => dispatch( ledActivate( colour, strip, all ) ),
    ledDeactivate: () => dispatch( ledDeactivate() ),
    setSwatch:     colour => dispatch( setSwatch( colour ) ),
})

export default connect( mapStateToProps, mapDispatchToProps )( Lights )
