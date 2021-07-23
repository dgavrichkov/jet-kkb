export default class Bonuses {
    constructor(el) {
        this._el = el;
        this._intersector = this._el.querySelector(".bonuses__intersector");
        this._isAnimed = false;
    }
    init() {
        this._setIntersectionObserver();
    }

    _setIntersectionObserver() {
        const options = {
            root: null,
            threshold: 0.75,
        };
        const callback = (entries) => {
            if(window.innerWidth < 768) {
                return false;
            }
            entries.forEach(entry => {
                const {isIntersecting} = entry;
                if(isIntersecting) {
                    if(!this._isAnimed) {
                        this._handleIntersection();
                    }
                }
            })
        }
        const observer = new IntersectionObserver(callback, options);
        observer.observe(this._intersector);
    }

    _handleIntersection() {
        this._el.classList.add("is-animed");
        this._isAnimed = true;
    }
}