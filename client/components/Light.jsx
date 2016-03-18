import React, { Component, PropTypes } from 'react';


import { STRIP_COUNT, INACTIVE_COLOUR, INACTIVE_SPHERE_COLOUR, INDICATOR_COLOUR } from '../constants/ledDefinitions'

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
            
        } else if (newProps.colour === INACTIVE_COLOUR) {

            this.setState({
                enabled: false
            })
        }
    }

    render() {

        const panel  = 200,
              radius = 70;

        let left = Math.cos(this.radians( 360 - (360 / STRIP_COUNT) * this.props.index )) * radius,
            top  = Math.sin(this.radians( 360 - (360 / STRIP_COUNT) * this.props.index )) * radius;

        let position = {
                top:  `${(( panel / 2 ) - 1 + top - 10)}px`,
                left: `${(( panel / 2 ) - 1 + left - 10)}px`
            }

        let colour = {
            boxShadow: `0 0 4px 2px #${ this.props.colour === INACTIVE_COLOUR ? INACTIVE_SPHERE_COLOUR : this.props.colour }`
        }

        if ( this.props.index === 0 ) {
            colour.border = `1px solid #${ INDICATOR_COLOUR }`
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
