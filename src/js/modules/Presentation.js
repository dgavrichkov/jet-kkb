export default class Presentation {
    constructor(el) {
        this._el = el;
        this._box = this._el.querySelector("[data-presentation-frame]");
        this._frame = this._el.querySelector("[data-presentation-frame]");
        this._items = this._el.querySelectorAll("[data-presentation-item]");
        this._screens = this._el.querySelectorAll("[data-presentation-screen]");

        this._elTopPos = null;

        this._current = null;
        this._currentScreen = null;
        this._currentHeight = null;

        this._scrollPos = 0;
        this._heightModifier = 10;
        this._heightMin = 100;

        this._swiper = null;

        this._handleScroll = this._handleScroll.bind(this);
    }
    init() {
        this._setInitialHeight();
        this._setIntersectionObserver();
        this._setScrollingHandler();

        this._elTopPos = this._el.getBoundingClientRect().top + pageYOffset;
        console.log(this._elTopPos);
    }

    // set initial height of items
    _setInitialHeight() {
        let base = window.innerHeight / 1.2;
        let count = 1;
        this._items.forEach(item => {
            const mod = count % 2 ? 100 : 72;
            base = base - mod;
            item.style.height = Math.floor(base) + "px";
            item.dataset.maxHeight = Math.floor(base);
            count++;
        });
    }

    _setIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: "0.8"
        };
        const callback = (entries) => {
            entries.forEach(entry => {
                const {isIntersecting} = entry;
                if(isIntersecting) {
                    this._current = this._items[0];
                    this._current.classList.add("is-active");
                    this._currentHeight = parseInt(this._current.style.height);
                }
            })
        }
        const observer = new IntersectionObserver(callback, options);
        observer.observe(this._box);
    }

    _setScrollingHandler() {
        window.addEventListener("scroll", this._handleScroll);
    }

    _handleScroll(e) {
        let st = window.pageYOffset;
        if(st > this._scrollPos) {
            // down
            if(this._current) {
                this._currentHeight = this._currentHeight - this._heightModifier;
                if(this._currentHeight > this._heightMin) {
                    this._current.style.height = this._currentHeight + "px";
                }
            }
        } else {
            // up
            if(this._current) {
                this._currentHeight = this._currentHeight + this._heightModifier;
                if(this._currentHeight < this._current.dataset.maxHeight) {                    
                    this._current.style.height = this._currentHeight + "px";
                }
            }
        }
        this._scrollPos = st;

        
    }

    // set current screen on phone

    // bind scroll to current block height

    // swiper slider on mobile
    // -- set classes to markup
    // -- init slider
    // -- resize event - init and destroy swiper
}