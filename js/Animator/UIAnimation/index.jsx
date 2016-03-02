import React, { Component } from 'react';

import Lights from './Lights';

class UIAnimation extends Component {

    constructor( props ) {

        super( props );

        this.props.frames[0] = this.animateArray();

        this.state = {
            frames: this.props.frames,
            cyclePosition: 1,
            undoFrame: this.defaultUndoFrame(),
            ledPosition: 0,
            currentLights: []
        };

        this.state.currentLights = this.getSelectedLights();
    }

    animateArray() {
        let array  = [];

        for (let i = 0; i < window.STRIP_COUNT; i++) {
            array[i] = [];
            for (let j = 0; j < window.LED_COUNT; j++) {
                array[i][j] = window.INACTIVE_COLOUR;
            }
        }

        return array;
    }

    defaultUndoFrame() {
        return {
            position: null,
            cycle: null
        }
    }

    pushFrame() {
        if (this.state.frames.length === this.state.cyclePosition) {
            this.setState((state) => {
                return {
                    frames: state.frames.push( this.getLastFrame() )
                }
            });

            this.setState({
                currentLights: this.getSelectedLights()
            });
        }

        this.setState((state) => {
            cyclePosition: state.cyclePosition++
        });

        this.props.updateParent( this.frames );
    }

    popFrame() {
        if (this.state.cyclePosition > 1) {
            this.setState((state) => {
                return {
                    cyclePosition: state.cyclePosition--
                }
            });

            this.setState({
                currentLights: this.getSelectedLights()
            });
        }


        this.props.updateParent( this.frames );
    }

    insertFrame() {
        this.setState((state) => {
            return {
                frames: state.frames.splice( (state.cyclePosition - 1), 0, this.getCurrentFrame() )
            }
        });

        this.setState({
            currentLights: this.getSelectedLights()
        });

        this.props.updateParent( this.frames );
    }

    deleteFrame() {
        if (this.state.frames.length > 1) {

            this.state.frames.splice( this.state.frames.indexOf( this.getCurrentFrameRef() ), 1 );
            let newFrames = this.state.frames;

            this.setState((state) => {
                return {
                    undoFrame: {
                        position: (state.cyclePosition - 1),
                        cycle: this.getCurrentFrame()
                    },
                    frames: newFrames,
                    currentLights: this.getSelectedLights()
                }
            });

            this.setState({
                currentLights: this.getSelectedLights()
            });

            if (this.state.cyclePosition > this.state.frames.length) {
                this.setState((state) => {
                    cyclePosition: state.cyclePosition--
                });
            }

        }

        this.props.updateParent( this.frames );
    }

    undoDeleteFrame() {
        if (this.state.undoFrame.position !== null && this.state.undoFrame.cycle !== null) {

            this.state.frames.splice( this.state.undoFrame.position, 0, this.state.undoFrame.cycle );
            let newFrames = this.state.frames;

            this.setState((state) => {
                return {
                    frames: newFrames,
                    undoFrame: this.defaultUndoFrame()
                }
            });

            this.setState({
                currentLights: this.getSelectedLights()
            });

        }

        this.props.updateParent( this.frames );
    }

    getLastFrame() {
        return this.state.frames.slice()[0];
    }

    getCurrentFrame() {
        return this.state.frames.slice(( this.state.cyclePosition - 1 ), 1)[0];
    }

    getCurrentFrameRef() {
        return this.state.frames[( this.state.cyclePosition - 1 )];
    }

    decreaseLed() {
        if (this.state.ledPosition >= 1) {
            this.setState({
                ledPosition: (this.state.ledPosition - 1)
            });

            setTimeout(()=>{
                this.setState({
                    currentLights: this.getSelectedLights()
                });
            },0);
        }
    }



    increaseLed() {
        if (this.state.ledPosition < window.LED_COUNT) {
            this.setState({
                ledPosition: (this.state.ledPosition + 1)
            });

            setTimeout(()=>{
                this.setState({
                    currentLights: this.getSelectedLights()
                });
            },0);
        }
    }



    getSelectedLights() {
        let selected = [],
            current  = this.getCurrentFrame();

        for (let i = 0; i < window.STRIP_COUNT; i++) {
            selected[i] = current[i][this.state.ledPosition];
        }

        return selected;
    }

    update( index,  hexColour ) {

        this.setState((state)=> {

            // get current frame
            let currentFrame = this.state.frames[ this.state.frames.indexOf( this.getCurrentFrameRef() ) ];

            // remap strips
            currentFrame = currentFrame.map(( strip, sIndex )=> {

                // check strip index
                if ( sIndex === index ) {

                    // remap colours of strip
                    return strip.map(( ledColour, lIndex )=> {

                        if ( lIndex === this.state.ledPosition ) {

                            return hexColour;

                        } else {

                            return ledColour;

                        }

                    });

                } else {

                    return strip;

                }
            });

            // update current frame
            this.state.frames[ this.state.frames.indexOf( this.getCurrentFrameRef() ) ] = currentFrame;

            return {
                "frames": state.frames
            };
        });

        this.props.updateParent( this.state.frames );
    }

    render() {
        return (
            <div id="cycle">

                <div>
                    <button onClick={ this.popFrame.bind(this) }>
                        <i className="fa fa-step-backward"></i>
                    </button>
                    <button onClick={ this.pushFrame.bind(this) }>
                        <i className="fa fa-step-forward"></i>
                    </button>

                    <span>{ this.state.cyclePosition }</span>/<span>{ this.state.frames.length }</span>
                </div>

                <div>
                    <button onClick={ this.insertFrame.bind(this) }>
                        <i className="fa fa-plus"></i>
                    </button>
                    <button disabled={ this.state.frames.length === 1 } onClick={ this.deleteFrame.bind(this) }>
                        <i className="fa fa-minus"></i>
                    </button>
                    <button disabled={ !this.state.undoFrame.position } onClick={ this.undoDeleteFrame.bind(this) }>
                        <i className="fa fa-undo"></i>
                    </button>
                </div>

                <div className="led-position">
                    <input value={ this.state.ledPosition } type="text" />
                    <span onClick={ this.decreaseLed.bind(this) }><i className="fa fa-arrow-up"></i></span>
                    <span onClick={ this.increaseLed.bind(this) }><i className="fa fa-arrow-down"></i></span>
                </div>

                <Lights updateParent={ this.update.bind(this) } lights={ this.state.currentLights }/>

            </div>
        )
    }
}

export default UIAnimation;
