import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Btn from '../components/Button'

import UploadModal   from './UploadModal'
import DownloadModal from './DownloadModal'

import { reset, showUploadModal, showDownloadModal } from '../actions'

const ControlPanel = ({
	reset,
	showUploadModal,
	showDownloadModal
}) => (
	<div className="control-panel">

		<UploadModal/>
		<DownloadModal/>

		<div className="button-panel">
			<Btn onClick={ reset } className="fa fa-file"/>
			<Btn onClick={ showUploadModal } className="fa fa-cloud-upload"/>
			<Btn onClick={ showDownloadModal } className="fa fa-cloud-download"/>
		</div>

	</div>
)

ControlPanel.propTypes = {}

const mapDispatchToProps = ( dispatch ) => ({
	reset: 		    () => dispatch( reset() ),
	showUploadModal: () => dispatch( showUploadModal() ),
	showDownloadModal: () => dispatch( showDownloadModal() ),
})

export default connect( null, mapDispatchToProps )( ControlPanel )