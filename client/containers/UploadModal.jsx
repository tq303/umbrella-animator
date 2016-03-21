import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Btn from '../components/Button'

import Modal from './Modal'

import { hideUploadModal, saveAnimation, setUploadName, allowKeyboardControls, disableKeyboardControls } from '../actions'

const ControlPanel = ({
	inProgress,
	showModal,
	error,
	name,
	hideUploadModal,
	saveAnimation,
	setUploadName,
	allowKeyboardControls,
	disableKeyboardControls,
}) => (
	<Modal type="modal-top-down" display={ showModal }>
		<p>Save Animation</p>

		<input type="text"
			   value={ name }
			   onChange={ setUploadName }
			   onFocus={ allowKeyboardControls }
			   onBlur={ disableKeyboardControls } 
	    />

		<Btn onClick={ hideUploadModal } disabled={ false } className="fa fa-times"/>
		<Btn onClick={ saveAnimation } disabled={ false } className="fa fa-check"/>

		{
			inProgress
			?
			<div className="disable"></div>
			:
			null
		}
		{
			error
			?
			<p className="error">{ error }</p>
			:
			null
		}
	</Modal>
)

ControlPanel.propTypes = {
	display: PropTypes.bool.isRequired
}

const mapStateToProps = ( state ) => ({
	inProgress:  state.upload.inProgress,
	showModal: 	 state.upload.showModal,
	error:   	 state.upload.error,
	name:   	 state.upload.name,
})

const mapDispatchToProps = ( dispatch ) => ({
	hideUploadModal: () => dispatch( hideUploadModal() ),
	saveAnimation:   () =>  dispatch( saveAnimation() ),
	setUploadName:   event =>  dispatch( setUploadName( event.target.value ) ),
	allowKeyboardControls:   () =>  dispatch( allowKeyboardControls() ),
	disableKeyboardControls: () =>  dispatch( disableKeyboardControls() ),
})

export default connect( mapStateToProps, mapDispatchToProps )( ControlPanel )