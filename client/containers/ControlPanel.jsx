import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Btn from '../components/Button'

import Modal from './Modal'

import { reset, showUploadMoal } from '../actions'

const ControlPanel = ({
	reset,
	showUploadMoal,
	showModal
}) => (
	<div className="control-panel">

		{ showModal ? <Modal animate={ true }/> : null }

		<div className="button-panel">
			<Btn onClick={ reset } className="fa fa-file"/>
			<Btn onClick={ showUploadMoal } className="fa fa-cloud-upload"/>
			<Btn onClick={ showUploadMoal } disabled={ true } className="fa fa-cloud-download"/>
		</div>

	</div>
)

ControlPanel.propTypes = {}

const mapStateToProps = ( state ) => ({
	showModal: state.upload.showModal
})

const mapDispatchToProps = ( dispatch ) => ({
	reset: 		    () => dispatch( reset() ),
	showUploadMoal: () => dispatch( showUploadMoal() ),
})

export default connect( mapStateToProps, mapDispatchToProps )( ControlPanel )