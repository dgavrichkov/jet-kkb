export default class Popup {
    constructor(el) {
        this._el = el;
        this._overlay = this._el.querySelector(".popup__overlay");

        this._handleOverlayClick = this._handleOverlayClick.bind(this);
        this._frame = this._el.querySelector("iframe");
        if(this._frame) {
            this._video = this._frame.contentWindow;
        }
    }
    init() {
        this._setOverlayClosing();
    }
    open() {
        this._el.classList.add("is-open");
        document.body.classList.add("modal-open");
        this._video.postMessage('{"event":"command","func":"' + "playVideo" + '","args":""}', '*');;
    }
    close() {
        this._el.classList.remove("is-open");
        document.body.classList.remove("modal-open");
        this._video.postMessage('{"event":"command","func":"' + "pauseVideo" + '","args":""}', '*');;
    }

    _setOverlayClosing() {
        this._overlay.addEventListener("click", this._handleOverlayClick);
    }

    _handleOverlayClick() {
        this.close();
    }
}