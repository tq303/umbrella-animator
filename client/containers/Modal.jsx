import React, { Component, PropTypes } from 'react'
import ReactTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'

import Btn from '../components/Button'

import { hideUploadMoal, saveAnimation, setUploadName } from '../actions'

class Modal extends Component {

	render() {
		return (
			<ReactTransitionGroup transitionName={ this.props.type } transitionEnterTimeout={ 200 } transitionLeaveTimeout={ 200 } >
				{
					this.props.showModal
						?
						<div key="modal-key" className={ this.props.type }>
							<input type="text" onChange={ this.props.setUploadName } />
							<Btn onClick={ this.props.hideUploadMoal } disabled={ true } className="fa fa-times"/>
							<Btn onClick={ this.props.saveAnimation } disabled={ true } className="fa fa-check"/>
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
	showModal: state.upload.showModal
})

const mapDispatchToProps = ( dispatch ) => ({
	hideUploadMoal: () => dispatch( hideUploadMoal() ),
	saveAnimation:  () => dispatch( saveAnimation() ),
	setUploadName:  () => dispatch( setUploadName() ),
})

export default connect( mapStateToProps, mapDispatchToProps )( Modal )