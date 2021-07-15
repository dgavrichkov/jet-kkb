export default class Accordeon {
    constructor(el) {
        this._el = el;
        this._items = this._el.querySelectorAll(".accordeon__item");
        this._bodies = this._el.querySelectorAll(".accordeon__body");
        this._heads = this._el.querySelectorAll(".accordeon__head");
        this._current = this._el.querySelector(".accordeon__item.is-active") || null;
        this._handleResize = this._handleResize.bind(this);
    }
    init() {
        this._setHeadClickHandler();
        this._setResizeHandler();
    }

    _setHeadClickHandler() {
        this._heads.forEach(head => {
            head.addEventListener("click", () => {
                const body = head.nextElementSibling;
                const item = head.parentElement;
                if(item.classList.contains("is-active")) {
                    this._closeItem(item, body);
                } else {
                    this._openItem(item, body);
                }
            });
        })
    }

    _setResizeHandler() {
        window.addEventListener("resize", this._handleResize);
        window.addEventListener("orientationchange", this._handleResize);
    }

    _openItem(item, body) {
        item.classList.add("is-active");
        body.style.height = body.scrollHeight + "px";
    }
    _closeItem(item, body) {
        item.classList.remove("is-active");
        body.style.height = '';
    }
    _handleResize() {
        this._bodies.forEach(body => {
            const item = body.parentElement;
            this._closeItem(item, body)
        })
    }
}