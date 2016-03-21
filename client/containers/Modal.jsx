import React, { Component, PropTypes } from 'react'
import ReactTransitionGroup from 'react-addons-css-transition-group'

const Modal = ({
	type,
	display,
	children,
}) => (
	<ReactTransitionGroup transitionName={ type } transitionEnterTimeout={ 200 } transitionLeaveTimeout={ 200 } >
		{
			display
			?
			<div key="modal-key" className={ type }>
				{ children }
			</div>
			:
			null
		}
	</ReactTransitionGroup>
)

Modal.propTypes = {
	type: PropTypes.string.isRequired, // css class to be used
	display: PropTypes.bool.isRequired // whether to animate in / out
}

export default Modal