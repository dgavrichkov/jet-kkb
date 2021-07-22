export default class Bonuses {
    constructor(el) {
        this._el = el;
        this._isAnimed = false;
        // this._handleIntersection = this._handleIntersection.bind(this);
    }
    init() {
        console.log(this._el);
        this._setIntersectionObserver();
    }

    _setIntersectionObserver() {
        const options = {
            root: null,
            threshold: 0.8
        };
        const callback = (entries) => {
            if(window.innerWidth < 768) {
                return false;
            }
            entries.forEach(entry => {
                const {isIntersecting, intersectionRatio} = entry;
                if(isIntersecting) {
                    if(!this._isAnimed) {
                        this._handleIntersection();
                    }
                }
            })
        }
        const observer = new IntersectionObserver(callback, options);
        observer.observe(this._el);
    }

    _handleIntersection() {
        console.log(this._el)
        this._el.classList.add("is-animed");
        this._isAnimed = true;
    }
}