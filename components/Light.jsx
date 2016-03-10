import React, { Component, PropTypes } from 'react';

// className={ this.state.activeClass }
// style={ this.state.activeStyle }
// onClick={ this.toggleActive.bind(this) }
import { STRIP_COUNT, INACTIVE_COLOUR } from '../constants/ledDefinitions'

class Light extends Component {

    constructor( props ) {
        super( props )

        this.state = {
            animationClass: 'select-animation',
            enabled: false
        }
    }

    radians( degrees ) {
        return degrees * (Math.PI / 180);
    }

    componentWillReceiveProps( newProps ) {

        if ( newProps.colour !== INACTIVE_COLOUR && !this.state.enabled ) {

            this.setState({
                animationClass: 'select-animation show',
                enabled: true
            })

            window.setTimeout(()=> {

                this.setState({
                    animationClass: 'select-animation show animate'
                })

                window.setTimeout(()=> {

                    this.setState({
                        animationClass: 'select-animation'
                    })

                }, 500)

            }, 0)
        } else if (this.state.enabled) {

            this.setState({
                enable: false
            })

        }
    }

    render() {

        const panel  = 445,
              radius = 160;

        let left = Math.cos(this.radians( (360 / STRIP_COUNT) * this.props.index )) * radius,
            top  = Math.sin(this.radians( (360 / STRIP_COUNT) * this.props.index )) * radius;

        let colour   = {
                color: `#${ ( this.props.colour === INACTIVE_COLOUR ) ? 'ffffff' : this.props.colour }`
            },
            position = {
                top:  `${(( panel / 2 ) + top - 16)}px`,
                left: `${(( panel / 2 ) + left - 16)}px`,
                color: `#${ colour }`
            }

        return (
            <div onClick={ e => this.props.onClick() } style={ position }>
                <a className="indicator" style={ colour }></a>
                <a className={ this.state.animationClass } style={ colour }></a>
            </div>
        )
    }
}

export default Light
