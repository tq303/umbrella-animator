import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Btn from '../components/Button'

import { reset, saveAnimation } from '../actions'

const ControlPanel = ({
	reset,
	saveAnimation
}) => (
	<div className="control-panel">
		<Btn onClick={ reset } className="fa fa-file"/>
		<Btn onClick={ saveAnimation } className="fa fa-cloud-upload"/>
		<Btn onClick={ saveAnimation } disabled={ true } className="fa fa-cloud-download"/>
	</div>
)

ControlPanel.propTypes = {}

const mapDispatchToProps = ( dispatch ) => ({
	reset: 		   () => dispatch( reset() ),
	saveAnimation: () => dispatch( saveAnimation() ),
})

export default connect( null, mapDispatchToProps )( ControlPanel )