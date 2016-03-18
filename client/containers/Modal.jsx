import React, { Component, PropTypes } from 'react'
import ReactTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'

import Btn from '../components/Button'

import { hideUploadModal, saveAnimation, setUploadName, allowKeyboardControls, disableKeyboardControls } from '../actions'

class Modal extends Component {

	render() {
		return (
			<ReactTransitionGroup transitionName={ this.props.type } transitionEnterTimeout={ 200 } transitionLeaveTimeout={ 200 } >
				{
					this.props.showModal
						?
						<div key="modal-key" className={ this.props.type }>

							<p>Save Animation</p>

							<input type="text"
								   value={ this.props.name }
								   onChange={ this.props.setUploadName }
								   onFocus={ this.props.allowKeyboardControls }
								   onBlur={ this.props.disableKeyboardControls } 
						    />

							<Btn onClick={ this.props.hideUploadModal } disabled={ false } className="fa fa-times"/>
							<Btn onClick={ this.props.saveAnimation } disabled={ false } className="fa fa-check"/>

							{
								this.props.inProgress
								?
								<div className="disable"></div>
								:
								null
							}
							{
								this.props.error
								?
								<p className="error">{ this.props.error }</p>
								:
								null
							}

						</div>
						:
						null
				}
			</ReactTransitionGroup>
		)
	}
}

Modal.propTypes = {
	type: PropTypes.string.isRequired
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

export default connect( mapStateToProps, mapDispatchToProps )( Modal )