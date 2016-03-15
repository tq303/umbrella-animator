import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'

import Btn from '../components/Button'
import DisplayNumber from '../components/DisplayNumber'

import { frameFwd, frameBwd, frameAdd, frameRmv, setFrameRate } from '../actions'

const frameRateOptions = [
    { value: 1,  label: 1  },
    { value: 2,  label: 2  },
    { value: 4,  label: 4  },
    { value: 8,  label: 8  },
    { value: 12, label: 12 },
    { value: 24, label: 24 },
    { value: 48, label: 48 }
]

const Frames = ({
    frameRate,
    setFrameRate,
    framePosition,
    framesTotal,
    frameFwd,
    frameBwd,
    frameAdd,
    frameRmv,
}) => (
    <div>
        <div className="frame-controls">
            <div>
                <p>Frames</p>
                <DisplayNumber value={ framePosition } /> : <DisplayNumber value={ framesTotal }/>
            </div>
            <div>
                <p>FPS</p>
                <Select
                    value={ frameRate }
                    options={ frameRateOptions }
                    onChange={ setFrameRate }
                    clearable={ false }
                    searchable={ false }
                />
            </div>
        </div>
        <div className="controls grouped">
            <div>
                <Btn onClick={ frameBwd } className="fa fa-step-backward"/>
                <Btn onClick={ frameFwd } className="fa fa-step-forward"/>
            </div>
            <div>
                <Btn onClick={ frameAdd } className="fa fa-plus"/>
                <Btn onClick={ frameRmv } className="fa fa-minus"/>
            </div>
        </div>
    </div>
)

Frames.propTypes = {}

const mapStateToProps = ( state, ownProps ) => ({
    framesTotal:   state.frames.all.length,
    framePosition: ( state.frames.position + 1 ),
    frameRate:     state.frames.rate
})

const mapDispatchToProps = ( dispatch ) => ({
    frameFwd:     () => dispatch( frameFwd() ),
    frameBwd:     () => dispatch( frameBwd() ),
    frameAdd:     () => dispatch( frameAdd() ),
    frameRmv:     () => dispatch( frameRmv() ),
    setFrameRate: ( fps ) => dispatch( setFrameRate( fps ) ),
})

export default connect( mapStateToProps, mapDispatchToProps )( Frames )