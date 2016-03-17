import React, { Component, PropTypes } from 'react'
import ReactTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'

import Btn from '../components/Button'

import { hideUploadMoal, saveAnimation, setUploadName } from '../actions'

class Modal extends Component {

	constructor( props ) {
		super( props )

		this.state = {
			animationClass: 'modal'
		}
	}

	render() {
		return (
			<ReactTransitionGroup transitionName="modal" transitionEnterTimeout={ 500 } transitionLeaveTimeout={ 300 } >
				{
					this.props.showModal
						?
						<div className={ this.state.animationClass }>
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
	animate: PropTypes.bool
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