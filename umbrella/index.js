import THREE, { Object3D } from 'three';

import { STRIP_COUNT, LED_COUNT, INACTIVE_COLOUR } from '../constants/ledDefinitions'

class Umbrella extends Object3D {

    constructor(position = { x: 0, y: 0 } ) {
        super();

        // setup variables
        this.ledDistance   = 1;

        // material & geometry
        this.material = {
            mesh: new THREE.MeshLambertMaterial( { color: parseInt( INACTIVE_COLOUR, 16 ) } ),
            line: new THREE.LineBasicMaterial({ color: 0xdd00ff })
        };

        this.light = {
            point: new THREE.PointLight( 0xffffff )
        };

        this.position.set( position.x, position.y, 0 );

        this.umbrella = this.create();
    }

    simpleUmbrellaObject() {
        return {
            arms: []
        }
    }

    simpleArmObject() {
        return {
            lights: null,
            arm:    null
        };
    }

    create() {

        let umbrella = this.simpleUmbrellaObject();

        // build arms and lights
        for (let i = 0; i < STRIP_COUNT; i++) {

            umbrella.arms[i] = this.simpleArmObject();

            umbrella.arms[i].arm    = this.createArm( (360 / STRIP_COUNT) * i );
            umbrella.arms[i].lights = this.createLights( (360 / STRIP_COUNT) * i );

        }

        // position point light to give illusion of lights
        this.light.point.position.set( 0, 0, 10 );

        this.add( this.light.point );

        return umbrella;
    }

    createArm( angle ) {

        let arm = new THREE.Geometry(),
            x   = Math.cos(this.radians(angle)),
            y   = Math.sin(this.radians(angle)),
            arms;

        // loop each led and place in x,y,z axis
        for (let i = 1; i <= LED_COUNT; i++) {

            let _x     = x * ( this.ledDistance * i ),
                _y     = y * ( this.ledDistance * i ),
                _angle = (( 90 / LED_COUNT ) * i ) + 45,
                _z     = Math.cos(this.radians(_angle)) * ( this.ledDistance * i );

            arm.vertices.push(new THREE.Vector3(_x, _y, _z));
        }

        arms = new THREE.Line( arm, this.material.line );

        this.add( arms );

        return arms;
    }

    createLights( angle ) {

        let x      = Math.cos(this.radians(angle)),
            y      = Math.sin(this.radians(angle)),
            lights = [],
            geometry = new THREE.SphereGeometry( .5, 8 , 6 );

        // loop each led and place in x,y,z axis
        for (let i = 1; i <= LED_COUNT; i++) {

            let _x     = x * ( this.ledDistance * i ),
                _y     = y * ( this.ledDistance * i ),
                _angle = (( 90 / LED_COUNT ) * i ) + 45,
                _z     = Math.cos(this.radians(_angle)) * ( this.ledDistance * i );

            lights[i - 1] = new THREE.Mesh( geometry, this.material.mesh );
            lights[i - 1].position.set( _x, _y, _z );

            this.add( lights[i - 1] );
        }

        return lights;
    }

    radians( degrees ) {
        return degrees * (Math.PI / 180);
    }

    updateColour( frame ) {

        for ( let i = 0; i < STRIP_COUNT; i++ ) {
            for ( let j = 0; j < LED_COUNT; j++) {

                this.umbrella.arms[i].lights[j].material.color.setHex( parseInt( frame[i][j], 16 ) )
                this.umbrella.arms[i].lights[j].geometry.colorsNeedUpdate = true
            }
        }
    }

}

export default Umbrella;
