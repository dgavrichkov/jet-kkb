export default class Tabs {
    constructor(el) {
        this._el = el;
        this._controls = this._el.querySelectorAll(".servtab__control");
        this._caret = this._el.querySelector(".servtab__indicator-caret");
        this._current = null;
    
        this._handleControlClick = this._handleControlClick.bind(this);
    }
    init() {
        this._defineCurrent();
        this._setCaretState();
        this._setControlClickHandler();
    }

    _setCaretState() {
        const width = this._current.offsetWidth;
        const left = this._current.offsetLeft;
        this._caret.style.width = `${width}px`; 
        this._caret.style.left = `${left}px`;
    }

    _setControlClickHandler() {
        this._controls.forEach(btn => {
            btn.addEventListener("click", this._handleControlClick);
        })
    }

    _defineCurrent() {
        this._current = this._el.querySelector(".servtab__control.is-active");
    }

    _handleControlClick(e) {
        this._current.classList.remove("is-active");
        this._current = null;
        e.target.classList.add("is-active");
        this._defineCurrent();
        this._setCaretState();
    }
}