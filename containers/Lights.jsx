import React, { PropTypes } from 'react';
import ColorPicker from 'react-color';

import Light from '../components/Light';

// this.activateAll.bind(this)
// this.deActivateAll.bind(this)

const Lights = () => (
    <div id="ui-lights">

        <div className="lights">
            <p><Light index={ 0 }/></p>
            <p><Light index={ 7 }/><Light index={ 1 }/></p>
            <p><Light index={ 6 }/><Light index={ 2 }/></p>
            <p><Light index={ 5 }/><Light index={ 3 }/></p>
            <p><Light index={ 4 }/></p>
        </div>

        <div className="controls">
            <button><i className="fa fa-sun-o"></i></button>
            <button><i className="fa fa-circle-thin"></i></button>
        </div>

        <div className="set-colour">
            <ColorPicker type="slider"/>
        </div>

    </div>
);

export default Lights;
