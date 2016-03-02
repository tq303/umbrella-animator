import Canvas   from './js/Canvas'
import Umbrella from './js/Umbrella'
import Animator from './js/Animator'

require('./styles/style.scss');

window.LED_COUNT      = 30;
window.STRIP_COUNT    = 8;
window.UMBRELLA_COUNT = 1;
window.INACTIVE_COLOUR = '000000';

let width  = window.innerWidth,
    height = window.innerHeight;

let canvas = new Canvas( 1024, 576, 25 ),
    umbrellas = [];

// add single umbrella
umbrellas[0] = new Umbrella({ x: 0, y: 0 });
canvas.scene.add( umbrellas[0] );

let animator = new Animator( umbrellas );

// resize logic
window.addEventListener("resize", ()=> {

    canvas.resize( window.innerWidth, window.innerHeight );

}, false);
