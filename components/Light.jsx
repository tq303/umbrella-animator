import React, { Component, PropTypes } from 'react';

// className={ this.state.activeClass }
// style={ this.state.activeStyle }
// onClick={ this.toggleActive.bind(this) }
import { STRIP_COUNT, INACTIVE_COLOUR } from '../constants/ledDefinitions'

class Light extends Component {

    radians( degrees ) {
        return degrees * (Math.PI / 180);
    }

    render() {

        const panel  = 445,
              radius = 160;

        let left = Math.cos(this.radians( (360 / STRIP_COUNT) * this.props.index )) * radius,
            top  = Math.sin(this.radians( (360 / STRIP_COUNT) * this.props.index )) * radius;

        let colour = ( this.props.colour === INACTIVE_COLOUR ) ? 'ffffff' : this.props.colour,
            style = {
                top:  `${(( panel / 2 ) + top - 16)}px`,
                left: `${(( panel / 2 ) + left - 16)}px`,
                color: `#${ colour }`
            }

        return (
            <div style={ style }>
                <a className="indicator"></a>
                <a className="hover-animation"></a>
            </div>
        )
    }
}

export default Light
