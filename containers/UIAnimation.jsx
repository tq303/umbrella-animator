import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// containers
import Lights from './Lights'

// components
import Btn from '../components/Button'
import DisplayNumber from '../components/DisplayNumber'

// actions
import { frameFwd, frameBwd, frameAdd, frameRmv, ledUp, ledDwn, ledArrayRotateLeft, ledArrayRotateRight } from '../actions'

require('../styles/style.scss');

// UI
class UIAnimation extends Component {

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyEvent.bind(this), true)
    }

    handleKeyEvent( e ) {
        switch ( e.code ) {
            case 'ArrowLeft':
                    this.props.ledArrayRotateLeft()
                break;

            case 'ArrowRight':
                    this.props.ledArrayRotateRight()
                break;
        }
    }

    render() {
        return (
            <div id="cycle">

                <div>
                    <Btn onClick={ this.props.frameBwd } className="fa fa-step-backward"/>
                    <Btn onClick={ this.props.frameFwd } className="fa fa-step-forward"/>
                </div>

                <p><DisplayNumber value={ this.props.framePosition } />/<DisplayNumber value={ this.props.framesTotal }/></p>

                <div>
                    <Btn onClick={ this.props.frameAdd } className="fa fa-plus"/>
                    <Btn onClick={ this.props.frameRmv } className="fa fa-minus"/>
                </div>

                <div>
                    <Btn onClick={ this.props.ledUp } className="fa fa-arrow-up"/>
                    <Btn onClick={ this.props.ledDwn } className="fa fa-arrow-down"/>
                </div>

                <p><DisplayNumber value={ this.props.ledLevel } /></p>

                <Lights />

            </div>
        )
    }

}

UIAnimation.propTypes = {}

const mapStateToProps = ( state, ownProps ) => ({
    framesTotal:   state.frames.all.length,
    framePosition: ( state.frames.position + 1 ),
    ledLevel:      ( state.lights.level + 1 )
})

const mapDispatchToProps = ( dispatch, ownProps ) => ({
    frameFwd: () => dispatch( frameFwd() ),
    frameBwd: () => dispatch( frameBwd() ),
    frameAdd: () => dispatch( frameAdd() ),
    frameRmv: () => dispatch( frameRmv() ),
    ledUp:    () => dispatch( ledUp() ),
    ledDwn:   () => dispatch( ledDwn() ),
    ledArrayRotateLeft: ()=> dispatch( ledArrayRotateLeft() ),
    ledArrayRotateRight: ()=> dispatch( ledArrayRotateRight() )
})

export default connect( mapStateToProps, mapDispatchToProps )( UIAnimation )
