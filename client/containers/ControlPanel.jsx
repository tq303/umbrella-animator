import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'

import Btn from '../components/Button'

import { setFrameRate, saveAnimation } from '../actions'

import { STRIP_COUNT, INACTIVE_COLOUR } from '../constants/ledDefinitions'

const frameRateOptions = [
	{ value: 1,  label: 1  },
	{ value: 2,  label: 2  },
	{ value: 4,  label: 4  },
	{ value: 8,  label: 8  },
	{ value: 12, label: 12 },
	{ value: 24, label: 24 },
	{ value: 48, label: 48 }
]

const ControlPanel = ({
	frameRate,
	setFrameRate,
	saveAnimation
}) => (
	<div id="control-panel">
		<Select value={ frameRate } options={ frameRateOptions } onChange={ setFrameRate } />
		<Btn onClick={ saveAnimation } className="fa fa-cloud-upload"/>
	</div>
)

ControlPanel.propTypes = {}

const mapStateToProps = ( state, ownProps ) => ({
	frameRate: state.frames.rate
})

const mapDispatchToProps = ( dispatch ) => ({
	setFrameRate: ( fps ) => dispatch( setFrameRate( fps ) ),
	saveAnimation: () => dispatch( saveAnimation() )
})

export default connect( mapStateToProps, mapDispatchToProps )( ControlPanel )