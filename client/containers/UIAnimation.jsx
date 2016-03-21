import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// containers
import Lights from './Lights'
import Frames from './Frames'
import ControlPanel from './ControlPanel'

// components
import Btn from '../components/Button'

// actions
import {
    frameRmv,
    frameAdd,
    frameBwd,
    frameFwd,
    ledUp,
    ledDwn,
    ledArrayRotateLeft,
    ledArrayRotateRight,
    ledActivate,
    ledDeactivate,
    setPlaying
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

        if ( !this.props.allowKeyboard ) {
            return;
        }

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

            case 189:
                this.props.frameRmv()
                break;

            case 187:
                this.props.frameAdd()
                break;

            case 219:
                this.props.frameBwd()
                break;

            case 221:
                this.props.frameFwd()
                break;

        }
    }

    render() {
        return (
            <div id="cycle">
                                
                {
                    ( this.props.showUploadModal || this.props.showDownloadModal )
                    ?
                    <div className="disabled"></div>
                    :
                    null
                }

                {
                    this.props.playing
                    ?
                    <div className="warn-playing">
                        <p>Playing...</p>
                    </div>
                    :
                    <div>
                        <ControlPanel/>
                        <Frames/>
                    </div>
                }

                <div className="controls grouped">
                    {
                        this.props.playing
                        ?
                        null
                        :
                        <div>
                            <Btn onClick={ this.props.ledUp } className="fa fa-arrow-up"/>
                            <Btn onClick={ this.props.ledDwn } className="fa fa-arrow-down"/>
                        </div>
                    }
                    <div>
                        <Btn onClick={ this.props.setPlaying.bind( this ) } className="fa fa-play"/>
                        <Btn onClick={ this.props.setPlaying.bind( this, false ) } className="fa fa-stop"/>
                    </div>
                </div>
                
                {
                    this.props.playing
                    ?
                    null
                    :
                    <Lights />
                }

            </div>
        )
    }

}

UIAnimation.propTypes = {}

const mapStateToProps = ( state, ownProps ) => ({
    swatch:            state.swatch,
    level:             state.lights.level,
    rotateIndex:       state.lights.rotateIndex,
    playing:           state.playing,
    frameRate:         state.frames.rate,
    allowKeyboard:     state.lights.allowKeyboardControls,
    showUploadModal:   state.upload.showUploadModal,
    showDownloadModal: state.download.showDownloadModal,
})

const mapDispatchToProps = ( dispatch, ownProps ) => ({
    frameFwd:            () => dispatch( frameFwd() ),
    frameBwd:            () => dispatch( frameBwd() ),
    frameAdd:            () => dispatch( frameAdd() ),
    frameRmv:            () => dispatch( frameRmv() ),
    ledUp:               () => dispatch( ledUp() ),
    ledDwn:              () => dispatch( ledDwn() ),
    ledArrayRotateLeft:  ()=> dispatch( ledArrayRotateLeft() ),
    ledArrayRotateRight: ()=> dispatch( ledArrayRotateRight() ),
    ledActivate:         ( colour, strip, all ) => dispatch( ledActivate( colour, strip, all ) ),
    ledDeactivate:       () => dispatch( ledDeactivate() ),
    setPlaying:          playing => dispatch( setPlaying( playing )),
    setFrameRate:        fps => dispatch( setFrameRate( fps )),
})

export default connect( mapStateToProps, mapDispatchToProps )( UIAnimation )
