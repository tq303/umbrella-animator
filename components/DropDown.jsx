import React, { Component, PropTypes } from 'react'

require('../styles/drop-down-menu.scss')

class DropDown extends Component {

	constructor( props ) {
		super( props )

		this.state = {
			displayDownDown: false
		}
	}

	render() {

		let dropDownMenuStyle = {
			top: `-${ this.props.options.length * 100 }%`
		}

		if ( this.state.displayDownDown ) {
			dropDownMenuStyle.top = '100%'
		}

		return (
			<div className="drop-down-menu">
				<div className="options" style={ dropDownMenuStyle }>
					{
						this.props.options.map(( o ) => <div className="option" onClick={ e => this.props.onSelect( o ) }>{ o }</div>)
					}
				</div>
				<div className="selected"><span class="value">{ this.props.selected }</span><span class="claret"></span></div>
			</div>
		)
	}
}

DropDown.propTypes = {}

export default DropDown