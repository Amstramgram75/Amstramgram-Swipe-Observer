//Minify optimization
let
  w = window,
  p = 'pointer',
  t = 'touch',
  m = 'mouse'

export default class SO {//SO for SwipeObserver

  /* -------------------------------------------------------------------------- */
  /*                       PRIVATE STATIC VARIABLES                             */
  /* -------------------------------------------------------------------------- */
  //Hold the pointer event interface supported by the browser : 'pointer', 'touch' or 'mouse'
  static #pointerInterface = (w.PointerEvent) ? p : (w.TouchEvent) ? t : m

  //Hold the name of the starting event accordingly to the pointer/touch/mouse interface detected
  static #startEvent = (w.PointerEvent) ? `${p}down` : (w.TouchEvent) ? `${t}start` : `${m}down`


  /* -------------------------------------------------------------------------- */
  /*                       END PRIVATE STATIC VARIABLES                           */
  /*                            PRIVATE VARIABLES                               */
  /* -------------------------------------------------------------------------- */
  //HTML element to be observed
  #el = null
  //Hold the name of the pointer type used : 'mouse', 'pen' or 'touch'
  //If the browser supports the PointerEvents interface, 
  //#pointerType is updated by the pointerType property of the starting event
  //Else if the browser supports the TouchEvents interface, #pointerType is 'touch'
  //Else #pointerType is 'mouse'
  #pointerType = (SO.#pointerInterface == t) ? t : m
  //Hold the name of the moving event accordingly to the pointer type detected
  //Is 'mousemove' if pointer type is 'mouse', 'touchmove' otherwise
  #moveEvent
  //Hold the name of the ending event accordingly to the pointer type detected
  //Is 'mouseup' if pointer type is 'mouse', 'touchend' otherwise
  #endEvent
  //Hold the name of the cancelling event accordingly to the pointer type detected
  //Is 'mouseleave' if pointer type is 'mouse', 'touchcancel' otherwise
  #cancelEvent
  //Observer state
  #active = false
  //Timestamp of the beginning of the movement
  #t = null
  #originalEvent
  //PageX, pageY, clientX, clientY of the starting point of the movement
  #startPageX = null
  #startPageY = null
  #startClientX = null
  #startClientY = null
  //PageX, pageY, clientX, clientY of the current point
  #currentPageX = null
  #currentPageY = null
  #currentClientX = null
  #currentClientY = null
  //clientX, clientY of the previous point
  #previousClientX = null
  #previousClientY = null
  //Delta between starting and current positions values during the movement
  #deltaX = 0
  #deltaY = 0
  //Instance threshold set in the constructor or passed to the on method
  #threshold = 20//Minimum distance for a swipe



  /* -------------------------------------------------------------------------- */
  /*                           END PRIVATE VARIABLES                            */
  /*                              PRIVATE METHODS                               */
  /* -------------------------------------------------------------------------- */
  /**
   * 
   * @description: just a shortcut for Math.abs
   * @param {Number} n 
   * @returns absolute value of n
   */
  #abs(n) {
    return Math.abs(n)
  }

  /**
   * @description: just a shortcut for adding event listener to the observed element
   * @param {String} event 
   * @param {Function} callback 
   * @returns this
   */
  #on(event, callback) {
    this.#el.addEventListener(event, callback, false)
    return this
  }

  /**
   * @description: just a shortcut for removing event listener to the observed element
   * @param {String} event 
   * @param {Function} callback 
   * @returns this
   */
  #off(event, callback) {
    this.#el.removeEventListener(event, callback, false)
    return this
  }

  /**
   * @description: just a shortcut for dispatching event
   * @param {Event} e event to dispatch
   * @param {String} [name = 'swiping'] 'swiping' or 'swipe' 
   */
  #dispatch(e, name = 'swiping') {
    let data = this.#getEventData(e)
    if (data) this.#el.dispatchEvent(new CustomEvent(name, { detail: data }))
  }

  /**
   * @description: unregister move, end and cancel events
   * Called when swipe ends or by the off() method
   */
  #unregisterEvents() {
    this
      .#off(this.#moveEvent, this.#move)
      .#off(this.#endEvent, this.#end)
      .#off(this.#cancelEvent, this.#cancel)
  }

  /**
   * @description: Callback for 'pointerdown', 'touchstart' or 'mousedown' event
   * @param {PointerEvent | TouchEvent | MouseEvent} e
   */
  #start = (e) => {
    if (SO.#pointerInterface == p && !e.isPrimary) return
    this.#originalEvent = e
    //Store relevant data
    this.#t = Date.now()
    e = e.touches ? e.touches[0] : e
    this.#startPageX = this.#currentPageX = e.pageX
    this.#startPageY = this.#currentPageY = e.pageY
    this.#startClientX = this.#currentClientX = this.#previousClientX = e.clientX
    this.#startClientY = this.#currentClientY = this.#previousClientY = e.clientY
    //Reset delta values
    this.#deltaX = this.#deltaY = 0
    //Update #pointerType if PointerEvents are supported
    if (e.pointerType) this.#pointerType = e.pointerType
    let isMouse = (this.#pointerType == m)
    //Set listeners
    //We can't use pointermove or pointercancel
    //because the pointermove is cancelled if touch-action is not set
    this.#moveEvent = isMouse ? `${m}move` : `${t}move`
    this.#cancelEvent = isMouse ? `${m}leave` : `${t}cancel`
    this.#endEvent = isMouse ? `${m}up` : `${t}end`
    this
      .#on(this.#moveEvent, this.#move)
      .#on(this.#endEvent, this.#end)
      .#on(this.#cancelEvent, this.#cancel)
  }

  #cancel = (e) => {
    this.#end(e, true)
  }

  /**
   * @description: Callback for 'touchmove' or 'mousemove' event
   * @param {TouchEvent | MouseEvent} e
   */
  #move = (e) => {
    let ev = e.touches ? e.touches[0] : e
    this.#currentClientX = ev.clientX
    this.#currentClientY = ev.clientY
    this.#currentPageX = ev.pageX
    this.#currentPageY = ev.pageY
    if (!this.#el.contains(document.elementFromPoint(this.#currentClientX, this.#currentClientY))) {
      //The pointer is outside the observed element
      this.#cancel(e)
    } else {
      //Compute delta values
      this.#deltaX = this.#currentClientX - this.#previousClientX
      this.#deltaY = this.#currentClientY - this.#previousClientY
      this.#previousClientX = this.#currentClientX
      this.#previousClientY = this.#currentClientY
      this.#dispatch(e)
    }
  }


  /**
   * @description: Callback for 'touchend' or 'mouseup' event
   */
  #end = (e, cancelled = false) => {
    //Clean event listeners
    this.#unregisterEvents()
    //Compute event data
    this.#deltaX = this.#currentClientX - this.#startClientX
    this.#deltaY = this.#currentClientY - this.#startClientY
    let eventName = (!cancelled && Math.max(this.#abs(this.#deltaX), this.#abs(this.#deltaY)) > this.#threshold) ? 'swipe' : 'cancel'
    this.#dispatch(e, eventName)
  }

  /**
   * @description: Build the eventData object
   * @returns {Object} eventData
   *    @property {Object} client
   *        @property {Number} x - initial event clientX 
   *        @property {Number} y - initial event clientY
   *    @property {Object} delta
   *        @property {Number} x - horizontal distance traveled from the start
   *        @property {Number} y - vertical distance traveled from the start
   *    @property {String} direction - 'left', 'right', 'up' or 'down'
   *    @property {Integer} duration - Time elapsed since the start
   *    @property {String} orientation - 'hor' or 'vert'
   *    @property {TouchEvent | MouseEvent} original - Original event
   *    @property {Object} page
   *        @property {Number} x - initial event pageX 
   *        @property {Number} y - initial event pageY
   *    @property {String} pointerType - 'mouse', 'pen' or 'touch'
   */
  #getEventData(e) {
    let
      direction,
      orientation
    if (this.#abs(this.#deltaX) > this.#abs(this.#deltaY)) { // most significant
      orientation = (this.#deltaX == 0) ? '' : 'hor'
      direction = (this.#deltaX < 0) ? 'left' : (this.#deltaX == 0) ? '' : 'right'
    } else {
      orientation = (this.#deltaY == 0) ? '' : 'vert'
      direction = (this.#deltaY < 0) ? 'up' : (this.#deltaY == 0) ? '' : 'down'
    }
    if (direction == '') return false
    let eventData = {
      client: { x0: this.#startClientX, y0: this.#startClientY, x1: this.#currentClientX, y1: this.#currentClientY },
      delta: { x: this.#deltaX, y: this.#deltaY },
      direction: direction,
      duration: Date.now() - this.#t,
      events: { start: this.#originalEvent, end: e },
      orientation: orientation,
      page: { x0: this.#startPageX, y0: this.#startPageY, x1: this.#currentPageX, y1: this.#currentPageY },
      pointerType: this.#pointerType
    }
    return eventData
  }

  /**
   * @description: Validate the options passed to the constructor or to the on() method
   * @param {Object} opt
   *    @property {Integer} [threshold = 20] - Minimum distance in pixels between the start and the end of the movement to detect a swipe
   */
  #checkOptions(opt) {
    let threshold = opt.threshold
    this.#threshold = (Number.isInteger(threshold) && threshold > 0) ? threshold : this.#threshold
  }


  /**
   * @description: Activate the swipe listener
   */
  #activate() {
    this.#active = true
    this.#on(SO.#startEvent, this.#start, false)
  }



  /* -------------------------------------------------------------------------- */
  /*                          END PRIVATE METHODS                               */
  /*                              CONSTRUCTOR                                   */
  /* -------------------------------------------------------------------------- */
  /**
   * 
   * @param {HTMLElement} el : element to observe
   * @param {Object} opt
   *    @property {Boolean} [active = false] - If true, activate the swipe listener
   *    @property {Integer} [threshold = 20] - Minimum distance in pixels between the start and the end of the movement to detect a swipe
   */
  constructor(el, opt = {}) {
    if (!el) return;
    this.#el = el
    this.#checkOptions(opt)
    if (opt.active === true) this.#activate()
  }
  /* -------------------------------------------------------------------------- */
  /*                              END CONSTRUCTOR                               */
  /*                                  METHODS                                   */
  /* -------------------------------------------------------------------------- */
  /**
   * @description : Activate the swipe listener and/or update the options
   * @param {Object} opt
   *    @property {Integer} [threshold = 20] - Minimum distance in pixels between the start and the end of the movement to detect a swipe
   */
  on(opt = {}) {
    this.#checkOptions(opt)
    if (!this.#active) this.#activate()
  }

  /**
   * @description : Deactivate the swipe listener
   */
  off() {
    this.#off(SO.#startEvent, this.#start)
    this.#unregisterEvents()
  }

  /* -------------------------------------------------------------------------- */
  /*                                END METHODS                                 */
  /*                                  GETTERS                                   */
  /* -------------------------------------------------------------------------- */
  /**
   * @getter threshold
   */
  get threshold() {
    return this.#threshold
  }

  /**
   * @getter active
   * @returns {boolean} state of the observer
   */
  get active() {
    return this.#active
  }
  /* -------------------------------------------------------------------------- */
  /*                          END GETTERS / SETTERS                             */
  /* -------------------------------------------------------------------------- */
}