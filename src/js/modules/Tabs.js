export default class Tabs {
    constructor(el) {
        this._el = el;
        this._controls = this._el.querySelectorAll(".servtab__control");
        this._caret = this._el.querySelector(".servtab__indicator-caret");
        this._current = null;
        this._currentScreen = null;
        this._mobControls = this._el.querySelectorAll(".servtab__mobile-control");

        this._handleControlClick = this._handleControlClick.bind(this);
        this._handleMobControl = this._handleMobControl.bind(this);
    
    }
    init() {
        this._defineCurrent();
        this._setCaretState();
        this._setControlClickHandlers();
        this._setMobControlsHandlers();
    }

    _setCaretState() {
        const width = this._current.offsetWidth;
        const left = this._current.offsetLeft;
        this._caret.style.width = `${width}px`; 
        this._caret.style.left = `${left}px`;
    }

    _setControlClickHandlers() {
        this._controls.forEach(btn => {
            btn.addEventListener("click", this._handleControlClick);
        });
    }
    _setMobControlsHandlers() {
        this._mobControls.forEach(btn => {
            btn.addEventListener("click", this._handleMobControl);
        });
    }
    _defineCurrent() {
        if(this._currentScreen) {
            this._currentScreen.classList.remove("is-active");
        }
        this._current = this._el.querySelector(".servtab__control.is-active");
        const name = this._current.dataset.tabControl;
        this._currentScreen = this._el.querySelector(`[data-tab-screen="${name}"]`);
        this._currentScreen.classList.add("is-active");

        if(window.innerWidth < 768) {
            const body =  this._currentScreen.querySelector(".serve");
            body.style.height = body.scrollHeight + "px";
        }
    }

    _handleControlClick(e) {
        this._current.classList.remove("is-active");
        this._current = null;
        e.target.classList.add("is-active");
        this._defineCurrent();
        this._setCaretState();
    }
    _handleMobControl(e) {
        const screen = e.target.parentElement;
        const body = screen.querySelector(".serve");
        if(screen.classList.contains("is-active")) {
            body.style.height = "";
            screen.classList.remove("is-active");
        } else {
            screen.classList.add("is-active");
            body.style.height = body.scrollHeight + "px";
        }
    }
}