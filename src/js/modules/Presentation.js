export default class Presentation {
    constructor(el) {
        this._el = el;
        this._frame = this._el.querySelector("[data-presentation-frame]");
        this._items = this._el.querySelectorAll("[data-presentation-item]");

        this._current = null;
        
        this._swiper = null;
    }
    init() {
        console.log(this._items);
        this._setInitialHeight();
    }

    // set initial height of items
    _setInitialHeight() {
        let base = window.innerHeight / 1.2;
        let count = 1;
        this._items.forEach(item => {
            const mod = count % 2 ? 100 : 72;
            base = base - mod;
            item.style.height = base + "px";
            count++;
        });
    }

    // set block on current
    

    // set current screen on phone

    // bind scroll to current block height

    // swiper slider on mobile
    // -- set classes to markup
    // -- init slider
    // -- resize event - init and destroy swiper
}