import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Btn from '../components/Button'

import UploadModal from './UploadModal'

import { reset, showUploadMoal, hideUploadModal, saveAnimation, setUploadName, allowKeyboardControls, disableKeyboardControls } from '../actions'

const ControlPanel = ({
	inProgress,
	showModal,
	error,
	name,
	reset,
	showUploadMoal,
	hideUploadModal,
	saveAnimation,
	setUploadName,
	allowKeyboardControls,
	disableKeyboardControls,
}) => (
	<div className="control-panel">

		<UploadModal display={ showModal } />

		<div className="button-panel">
			<Btn onClick={ reset } className="fa fa-file"/>
			<Btn onClick={ showUploadMoal } className="fa fa-cloud-upload"/>
			<Btn onClick={ showUploadMoal } disabled={ true } className="fa fa-cloud-download"/>
		</div>

	</div>
)

ControlPanel.propTypes = {}

const mapStateToProps = ( state ) => ({
	inProgress:  state.upload.inProgress,
	showModal: 	 state.upload.showModal,
	error:   	 state.upload.error,
	name:   	 state.upload.name,
})

const mapDispatchToProps = ( dispatch ) => ({
	reset: 		    () => dispatch( reset() ),
	showUploadMoal: () => dispatch( showUploadMoal() ),
	hideUploadModal: () => dispatch( hideUploadModal() ),
	saveAnimation:   () =>  dispatch( saveAnimation() ),
	setUploadName:   event =>  dispatch( setUploadName( event.target.value ) ),
	allowKeyboardControls:   () =>  dispatch( allowKeyboardControls() ),
	disableKeyboardControls: () =>  dispatch( disableKeyboardControls() ),
})

export default connect( mapStateToProps, mapDispatchToProps )( ControlPanel )