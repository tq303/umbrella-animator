import React from 'react';

class Light extends React.Component {

    constructor( props ) {

        super( props );

        this.iColour = '#777';

        this.state = {
            active: false,
            activeClass: '',
            activeStyle: {
                color: this.iColour
            },
            colour: this.props.colour
        };
    }

    toggleActive() {

        this.setState(( state )=> {

            let nextStateActive = !state.active;
            let colourIsOff = this.props.pickerColour === window.INACTIVE_COLOUR;
            let styleColour = ( colourIsOff ) ? this.iColour : this.props.pickerColour;

            return {
                active: (nextStateActive && !colourIsOff),
                activeClass: ( nextStateActive && !colourIsOff ) ? 'active' : '',
                activeStyle: {
                    color: ( nextStateActive ) ? `#${ styleColour }` : this.iColour
                },
                colour: ( nextStateActive && !colourIsOff ) ? this.props.pickerColour : window.INACTIVE_COLOUR
            }
        });

        setTimeout(()=> {
            this.props.updateParent( this.props.index, this.state.colour );
        }, 0);
    }

    componentWillReceiveProps( nextProps ) {

        console.log(nextProps);

        this.setState(( state )=> {
            return {
                // active: ( nextProps.colour !== null ),
                // activeClass: ( nextProps.colour !== null ) ? 'active' : '',
                // activeStyle: {
                    // color: ( nextProps.colour !== null) ? nextProps.updateColour : this.iColour
                // },
                // colour: `#${nextProps.updateColour}`
            };
        });

    }

    render() {
        return (
            <a className={ this.state.activeClass } style={ this.state.activeStyle } onClick={ this.toggleActive.bind(this) }></a>
        )
    }
}

Light.PropTypes = {
    updateColour: React.PropTypes.number.isRequired
};

export default Light
