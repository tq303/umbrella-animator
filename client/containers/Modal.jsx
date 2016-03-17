import React, { Component, PropTypes } from 'react'
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

	// animate in
	componentWillMount() {
		if ( this.props.animate ) {
			this.setState({
				animationClass: 'modal animate'
			})

			window.setTimeout(() => {
				this.setState({
					animationClass: 'modal'
				})			
			}, 10)
		}
	}

	// animate out
	componentWillMount() {}

	render() {
		return (
			<div className={ this.state.animationClass }>
				<input type="text" onChange={ this.props.setUploadName } />
				<Btn onClick={ this.props.hideUploadMoal } disabled={ true } className="fa fa-times"/>
				<Btn onClick={ this.props.saveAnimation } disabled={ true } className="fa fa-check"/>
			</div>
		)
	}
}

Modal.propTypes = {
	animate: PropTypes.bool
}

const mapDispatchToProps = ( dispatch ) => ({
	hideUploadMoal: () => dispatch( hideUploadMoal() ),
	saveAnimation:  () => dispatch( saveAnimation() ),
	setUploadName:  () => dispatch( setUploadName() ),
})

export default connect( null, mapDispatchToProps )( Modal )