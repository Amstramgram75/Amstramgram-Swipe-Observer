/**
 * @class APD
 * @description Singleton in charge of pointer events names standardization
 * @example :
    //Add the amst__mouse class to the body when the current pointer used is a mouse
    import aPD from './import/aPD.js'
    aPD.mouseClass('amst__mouse')
 * 
 * 
 * 
 */
class APD {
  /* -------------------------------------------------------------------------- */
  /*                               PRIVATE FIELDS                               */
  /* -------------------------------------------------------------------------- */
  //Stores the current pointer type ("pen", "touch" or "mouse")
  #currentPointerType

  //Stores the current pointer events interface ("pointer", "touch" or "mouse")
  #pointerEventsInterface

  //Stores the callback(s) passed to the on() method
  #changeCallbacks = new Set()

  #init = false

  /* -------------------------------------------------------------------------- */
  /*                                  GETTERS                                   */
  /* -------------------------------------------------------------------------- */
  /**
   * @getter type
   * @returns {string} "pen", "mouse" or "touch"
   */

  /**
   * @getter interface
   * @returns {string} "pointer", "touch" or "mouse"
   */


  /* -------------------------------------------------------------------------- */
  /*                                 CONSTRUCTOR                                */
  /* -------------------------------------------------------------------------- */
  constructor() {
    //If first instantiation
    if (!APD.aPD) {
      const
        w = window,
        on = (e, callback) => w.addEventListener(e, callback)
      /*
        If PointerEvent is detected, pointerEventsInterface is set to 'pointer'.
        If not and if TouchEvent is detected, pointerEventsInterface is set to 'touch'.
        Finally, if neither PointerEvent nor TouchEvent are detected, pointerEventsInterface is set to 'mouse'.
      */
      this.#pointerEventsInterface = w.PointerEvent ? 'pointer' : (w.TouchEvent) ? 'touch' : 'mouse'

      //By default, we set the currentPointerType as touch
      //unless the detected pointerEventsInterface is 'mouse'
      this.#currentPointerType = (this.#pointerEventsInterface == 'mouse') ? 'mouse' : 'touch'

      /*
        If the browser supports pointer events API, we have to know whether mouse is used or not to adapt the UI accordingly.
        When a change is detected, all the functions registered by the on method are executed.
      */
      if (this.#pointerEventsInterface == 'pointer') {
        //Listening function
        const getPointerType = e => {
          const type = e.pointerType
          if (type == this.#currentPointerType && this.#init) return false
          this.#init = true
          //If the pointer type is now mouse 
          if (type == 'mouse') {
            //We don't need anymore to watch the pointermove event.
            //Indeed, if the pointer changes from mouse to touch,
            //the pointerdown event will be triggered before the pointermove event.
            w.removeEventListener('pointermove', getPointerType)
          } else {
            //We're now waiting for a mouse event
            //We listen to the pointermove event which will be triggered
            //before pointerdown if the pointer changes from touch to mouse
            //window.addEventListener('pointermove', getPointerType)
            on('pointermove', getPointerType)
          }
          //Store the new detected pointerType
          this.#currentPointerType = type
          //Execute the registered callbacks
          this.#changeCallbacks.forEach(fn => fn.apply(this, [type]))
        }
        //By default, we have defined the currentPointerType as touch
        //So we listen to the pointermove event to detect future mouse event
        //w.addEventListener('pointermove', getPointerType)
        on('pointermove', getPointerType)
        //And we listen to the pointerdown event
        //to detect if pointer type is 'pen' or 'touch'
        //w.addEventListener('pointerdown', getPointerType)
        on('pointerdown', getPointerType)
      }
      APD.aPD = this
    }
    return APD.aPD
  }
  /* -------------------------------------------------------------------------- */
  /*                               END CONSTRUCTOR                              */
  /* -------------------------------------------------------------------------- */




  /* -------------------------------------------------------------------------- */
  /*                                   GETTERS                                  */
  /* -------------------------------------------------------------------------- */
  /**
   * @getter type
   * @returns {string} "mouse", "pen" or "touch"
   */
  get type() {
    return this.#currentPointerType
  }

  /**
   * @getter interface
   * @returns {string} "mouse", "pointer" or "touch"
   */
  get interface() {
    return this.#pointerEventsInterface
  }

  /* -------------------------------------------------------------------------- */
  /*                                 END GETTERS                                */
  /* -------------------------------------------------------------------------- */



  /* -------------------------------------------------------------------------- */
  /*                               PUBLIC METHODS                               */
  /* -------------------------------------------------------------------------- */

  /**
   * @param {String} mouseClass 
   * @param {HTMLElement} [el = document.body ] 
   * @description add the mouseClass class to the HTMLElement el when mouse is detected
   */
  class(mouseClass, el = document.body) {
    const add = _ => el.classList.add(mouseClass)
    if (this.#pointerEventsInterface == 'pointer') {
      const onPointerChange = e => (e == 'mouse') ? add() : el.classList.remove(mouseClass)
      this.on(onPointerChange)
      onPointerChange(this.#currentPointerType)
    } else if (this.#pointerEventsInterface == 'mouse') add()
    return this
  }

  /**
   * @param {function} : function to be called when pointerType changes
   */
  on(fn) {
    this.#changeCallbacks.add(fn)
    return this
  }

  /**
   * @param {function} : remove the given function from the on callbacks
   */
  off(fn) {
    this.#changeCallbacks.delete(fn)
    return this
  }
  /* -------------------------------------------------------------------------- */
  /*                                  END CLASS                                 */
  /* -------------------------------------------------------------------------- */
}

//Creating, freezing and exporting an unique instance
export default Object.freeze(new APD())
