import main from './common/main'
import aside from './common/aside'
import code from './common/code'
import Prism from 'prismjs'
import pointerDetector from './common/amstramgramPointerDetector'
import SwipeObserver from '../../src/amstramgramSwipeObserver'

/**
 * TODO :
 * Demo 2 works on IOS>=14, tested on Android >= 7
 */

const
  w = window,
  d = document

pointerDetector.class('amst__mouse')

//https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
//Test via a getter in the options object to see if the passive property is accessed
let supportsPassive = false
try {
  const opts = Object.defineProperty({}, 'passive', {
    get: function () {
      supportsPassive = true
    }
  })
  w.addEventListener("testPassive", null, opts)
  w.removeEventListener("testPassive", null, opts)
} catch (e) { }


//Redirect to error.html if the browser does not understand our code...
// w.addEventListener('error', e => {
//   const nameModule = w.location.origin + '/js/index.js',
//     nameNoModule = w.location.origin + '/js/noModule/index.js'
//   if (e.filename == nameModule || e.filename == nameNoModule) w.location.href = './error.html' 
// })


console.log(`Pointer Events are ${w.PointerEvent ? '' : 'not '}supported`)
console.log(`Css touch-action property is ${w.CSS && CSS.supports('touch-action', 'none') ? '' : 'not '}supported`)
console.log(`Passive listeners are ${supportsPassive ? '' : 'not '}supported`)


//Set all the used variables names as custom keywords for Prism
//This has to be done before DOM load
const myVars = ['swipeObserver']
Prism.languages.insertBefore('javascript', 'constant', {
  'my-vars': {
    pattern: new RegExp("\\b(?:" + myVars.join("|") + ")\\b(?=}?)(?!:)"),
  }
});


w.addEventListener("load", function () {
  main()
  aside()
  code()
  init()
}, false)

function init() {
  const
    demo1Element = d.querySelector('.content .demo'),
    demo2Element = d.querySelector('.content .demo.demo2'),
    textDemo1 = demo1Element.querySelector('p'),
    textDemo2 = demo2Element.querySelector('p'),
    demo2 = new SwipeObserver(demo2Element, { ps: false })
  // demo2 = new SwipeObserver(demo2Element, {ps: supportsPassive})
  new SwipeObserver(demo1Element, { active: true })
  demo1Element.addEventListener('swiping', function (e) {
    console.log('SWIPING', e.detail)
    textDemo1.innerHTML = 'SWIPING ' + e.detail.direction.toUpperCase()
  })
  demo1Element.addEventListener('swipe', function (e) {
    console.log('SWIPE', e.detail)
    textDemo1.innerHTML = 'SWIPE ' + e.detail.direction.toUpperCase()
  })
  demo1Element.addEventListener('cancel', function (e) {
    console.log('SWIPE CANCELLED', e.detail)
    textDemo1.innerHTML = 'CANCEL'
  })


  //Store the last swipe direction ('left', 'right', 'up', 'down' or '')
  let previousDir = ''
  //Test the support of pan-up value for the css touch-action property
  //First, we create a test container
  const testFullTouchActionSupport = d.createElement('div')
  //we set its touch-action property to pan-up
  testFullTouchActionSupport.style.touchAction = 'pan-up'
  //fullTouchActionSupport will be true if the pan-up value is understood by the browser
  const fullTouchActionSupport = (testFullTouchActionSupport.style.touchAction === 'pan-up')
  //In this case, we set the touch-action property to none until we detect a vertical swipe
  //Scroll is blocked
  if (fullTouchActionSupport) demo2Element.style.touchAction = 'none'
  //Log the test result
  console.log(`Css touch-action property ${fullTouchActionSupport ? 'supports' : 'does not support'} pan-up and pan-down values`)


  //Swiping listener
  demo2Element.addEventListener('swiping', (e) => {
    //If this is a vertical swipe 
    //and if its direction is different from the last swipe detected
    if (e.detail.pointerType != 'mouse' && e.detail.orientation == 'vert' && previousDir != e.detail.direction) {
      //e.detail.events.end is the original touchmove event
      const ev = e.detail.events.end
      //If the event is cancelable
      if (ev.cancelable) {
        //we prevent it
        ev.preventDefault()
        console.log('Scroll has been blocked.')
      } else {
        console.log("Scroll can't be blocked.")
      }
    }
    textDemo2.innerHTML = 'SWIPING ' + e.detail.direction.toUpperCase()
  })

  //Swipe listener
  demo2Element.addEventListener('swipe', (e) => {
    if (e.detail.pointerType != 'mouse') {
      const dir = e.detail.direction
      //If it's a horizontal swipe
      if (e.detail.orientation == 'hor') {
        //Reset the container to its default state
        reset()
        //If it's a vertical swipe 
        //and if its direction is different from the last swipe detected
      } else if (previousDir != dir) {
        if (dir == 'down') {
          //Show the top banner
          demo2Element.classList.add('show_top')
          //Hide the bottom banner
          demo2Element.classList.remove('show_bottom')
        } else {
          //Hide the top banner
          demo2Element.classList.remove('show_top')
          //Show the bottom banner
          demo2Element.classList.add('show_bottom')
        }
        //If pan-up value is supported
        if (fullTouchActionSupport) {
          const touchActionDirection = (dir == 'down') ? 'up' : 'down'
          //Update the touch-action property
          demo2Element.style.touchAction = 'pan-' + touchActionDirection
        }
      }
      previousDir = dir
    }
    textDemo2.innerHTML = 'SWIPE ' + e.detail.direction.toUpperCase()
  })

  demo2Element.addEventListener('cancel', (e) => {
    textDemo2.innerHTML = 'CANCEL'
    previousDir = ''
    reset()
  })

  function reset() {
    //Reset the touc-action property to none
    if (fullTouchActionSupport) demo2Element.style.touchAction = 'none'
    //Hide the top banner
    demo2Element.classList.remove('show_top')
    //Hide the bottom banner
    demo2Element.classList.remove('show_bottom')
  }

  demo2.on()
}
