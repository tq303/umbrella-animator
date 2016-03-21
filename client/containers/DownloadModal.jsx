import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Btn from '../components/Button'

import Modal from './Modal'

import { hideDownloadModal, loadAnimation, setUploadName, allowKeyboardControls, disableKeyboardControls } from '../actions'

const ControlPanel = ({
	inProgress,
	showModal,
	error,
	list,
	name,
	hideDownloadModal,
	loadAnimation,
	setUploadName,
	allowKeyboardControls,
	disableKeyboardControls,
}) => (
	<Modal type="modal-top-down" display={ showModal }>

		<p>Download Animation</p>

		<ul className="animation-list">
			{
				list.map( item => (<li key={ item }>{ item }</li>) )
			}
		</ul>

		<Btn onClick={ hideDownloadModal } disabled={ false } className="fa fa-times"/>
		<Btn onClick={ loadAnimation } disabled={ false } className="fa fa-check"/>

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

ControlPanel.propTypes = {}

const mapStateToProps = ( state ) => ({
	error:   	state.download.error,
	list:   	state.download.list,
	inProgress: state.download.inProgress,
	showModal:  state.download.showModal,
})

const mapDispatchToProps = ( dispatch ) => ({
	hideDownloadModal: () => dispatch( hideDownloadModal() ),
	loadAnimation:   () =>  dispatch( loadAnimation() ),
	setUploadName:   event =>  dispatch( setUploadName( event.target.value ) ),
	allowKeyboardControls:   () =>  dispatch( allowKeyboardControls() ),
	disableKeyboardControls: () =>  dispatch( disableKeyboardControls() ),
})

export default connect( mapStateToProps, mapDispatchToProps )( ControlPanel )