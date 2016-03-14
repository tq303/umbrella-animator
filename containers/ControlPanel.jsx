import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Btn from '../components/Button'
import DropDown from '../components/DropDown'

import { setFrameRate, saveAnimation } from '../actions'

import { STRIP_COUNT, INACTIVE_COLOUR } from '../constants/ledDefinitions'

const frameRateOptions = [ 1, 2, 4, 8, 12, 24, 48 ]

const ControlPanel = ({
	frameRate,
	setFrameRate
}) => (
	<div id="control-panel">
		<DropDown options={ frameRateOptions } selected={ frameRate } onSelect={ setFrameRate }/>
	</div>
)

ControlPanel.propTypes = {}

const mapStateToProps = ( state, ownProps ) => ({
	frameRate: state.frames.rate
})

const mapDispatchToProps = ( dispatch ) => ({
	setFrameRate: ( fps ) => dispatch( setFrameRate( fps ) )
})

export default connect( mapStateToProps, mapDispatchToProps )( ControlPanel )