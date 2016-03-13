import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// containers
import Lights from './Lights'

// components
import Btn from '../components/Button'
import DisplayNumber from '../components/DisplayNumber'

// actions
import { 
    frameFwd,
    frameBwd,
    frameAdd,
    frameRmv,
    ledUp,
    ledDwn,
    ledArrayRotateLeft,
    ledArrayRotateRight,
    ledActivate
} from '../actions'

// constants
import { STRIP_COUNT } from '../constants/ledDefinitions'

require('../styles/style.scss');

// UI
class UIAnimation extends Component {

    componentDidMount() {
        window.addEventListener("keydown", this.handleKeyEvent.bind(this), false)
    }

    componentWillUnmount() {
        window.removeEventListener("keydown")
    }

    handleKeyEvent( e ) {
        switch ( e.keyCode ) {

            case 37:
                this.props.ledArrayRotateLeft()
                break;

            case 39:
                this.props.ledArrayRotateRight()
                break;

            case 38:
                this.props.ledUp()
                break;

            case 40:
                this.props.ledDwn()
                break;

            case 81:
                this.props.ledActivate( this.props.swatch, this.props.rotateIndex, false )
                break;

            case 87:
                this.props.ledActivate( this.props.swatch )
                break;

            case 69:
                this.props.ledActivate( this.props.swatch, this.props.rotateIndex, true )
                break;

            case 82:
                this.props.ledDeactivate()
                break;

        }
    }

    render() {
        return (
            <div id="cycle">

                <div className="controls grouped">
                    <div>
                        <Btn onClick={ this.props.frameBwd } className="fa fa-step-backward"/>
                        <Btn onClick={ this.props.frameFwd } className="fa fa-step-forward"/>
                    </div>
                    <div>
                        <Btn onClick={ this.props.frameAdd } className="fa fa-plus"/>
                        <Btn onClick={ this.props.frameRmv } className="fa fa-minus"/>
                    </div>
                </div>

                <p><DisplayNumber value={ this.props.framePosition } /> : <DisplayNumber value={ this.props.framesTotal }/></p>

                <div className="controls grouped">
                    <div>
                        <Btn onClick={ this.props.ledUp } className="fa fa-arrow-up"/>
                        <Btn onClick={ this.props.ledDwn } className="fa fa-arrow-down"/>
                    </div>
                    <div>
                        <Btn onClick={ this.props.ledUp } className="fa fa-play"/>
                        <Btn onClick={ this.props.ledDwn } className="fa fa-stop"/>
                    </div>
                </div>
                
                <Lights />

            </div>
        )
    }

}

UIAnimation.propTypes = {}

const mapStateToProps = ( state, ownProps ) => ({
    framesTotal:   state.frames.all.length,
    framePosition: ( state.frames.position + 1 ),
    swatch:  state.swatch,
    level:   state.lights.level,
    rotateIndex: state.lights.rotate / ( 360 / STRIP_COUNT )
})

const mapDispatchToProps = ( dispatch, ownProps ) => ({
    frameFwd: () => dispatch( frameFwd() ),
    frameBwd: () => dispatch( frameBwd() ),
    frameAdd: () => dispatch( frameAdd() ),
    frameRmv: () => dispatch( frameRmv() ),
    ledUp:    () => dispatch( ledUp() ),
    ledDwn:   () => dispatch( ledDwn() ),
    ledArrayRotateLeft: ()=> dispatch( ledArrayRotateLeft() ),
    ledArrayRotateRight: ()=> dispatch( ledArrayRotateRight() ),
    ledActivate:   ( colour, strip, all ) => dispatch( ledActivate( colour, strip, all ) ),
    ledDeactivate: () => dispatch( ledDeactivate() ),
})

export default connect( mapStateToProps, mapDispatchToProps )( UIAnimation )
