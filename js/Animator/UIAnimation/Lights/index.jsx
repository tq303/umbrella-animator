import React from 'react';
import ColorPicker from 'react-color';

import Light from './Light';

class Lights extends React.Component {

    constructor( params ) {

        super( params );

        this.state = {
            lights: this.props.lights,
            hexColour: window.INACTIVE_COLOUR
        };
    }

    activateAll() {
        this.setState(( state )=> {
            return {
                lights: state.lights.map(()=> this.state.hexColour)
            };
        });
    }

    deActivateAll() {
        this.setState(( state )=> {
            return {
                lights: state.lights.map(()=> null)
            };
        });
    }

    colourChange( colour ) {
        this.setState({ hexColour: colour.hex });
    }

    componentWillReceiveProps( nextProps ) {
        this.setState({
            lights: nextProps.lights
        });
    }

    update( index,  hexColour ) {
        setTimeout(()=> {
            this.props.updateParent( index, hexColour );
        }, 0);
    }

    render() {
        return (
            <div id="ui-lights">

                <div className="lights">
                    <p><Light updateParent={ this.update.bind(this) } pickerColour={ this.state.hexColour } colour={ this.state.lights[0] } index={ 0 }/></p>
                    <p><Light updateParent={ this.update.bind(this) } pickerColour={ this.state.hexColour } colour={ this.state.lights[7] } index={ 7 }/><Light updateParent={ this.update.bind(this) } pickerColour={ this.state.hexColour } colour={ this.state.lights[1] } index={ 1 }/></p>
                    <p><Light updateParent={ this.update.bind(this) } pickerColour={ this.state.hexColour } colour={ this.state.lights[6] } index={ 6 }/><Light updateParent={ this.update.bind(this) } pickerColour={ this.state.hexColour } colour={ this.state.lights[2] } index={ 2 }/></p>
                    <p><Light updateParent={ this.update.bind(this) } pickerColour={ this.state.hexColour } colour={ this.state.lights[5] } index={ 5 }/><Light updateParent={ this.update.bind(this) } pickerColour={ this.state.hexColour } colour={ this.state.lights[3] } index={ 3 }/></p>
                    <p><Light updateParent={ this.update.bind(this) } pickerColour={ this.state.hexColour } colour={ this.state.lights[4] } index={ 4 }/></p>
                </div>

                <div className="controls">
                    <button onClick={ this.activateAll.bind(this) }><i className="fa fa-sun-o"></i></button>
                    <button onClick={ this.deActivateAll.bind(this) }><i className="fa fa-circle-thin"></i></button>
                </div>

                <div className="set-colour">
                    <ColorPicker type="slider" color={ this.state.hexColour } onChange={ this.colourChange.bind(this) } />
                </div>

            </div>
        )
    }
}

export default Lights;
