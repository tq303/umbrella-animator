import React, { Component, PropTypes } from 'react';

// className={ this.state.activeClass }
// style={ this.state.activeStyle }
// onClick={ this.toggleActive.bind(this) }

class Light extends Component {

    radians( degrees ) {
        return degrees * (Math.PI / 180);
    }

    render() {

        const panel  = 445,
              radius = 180;

        let left = Math.cos(this.radians( (360 / 8) * this.props.index )) * radius,
            top  = Math.sin(this.radians( (360 / 8) * this.props.index )) * radius;

        let style = {
            top:  `${(( panel / 2 ) + top - 16)}px`,
            left: `${(( panel / 2 ) + left - 16)}px`
        };

        return (
            <div style={ style }>
                <a className="indicator"></a>
                <a className="hover-animation"></a>
            </div>
        )
    }
}

export default Light
