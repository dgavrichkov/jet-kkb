export default class Presentation {
    constructor(el) {
        this._el = el;
        this._box = this._el.querySelector("[data-presentation-frame]");
        this._frame = this._el.querySelector("[data-presentation-frame]");
        this._items = this._el.querySelectorAll("[data-presentation-item]");
        this._itemsContainer = this._items[0].parentElement;
        this._screens = this._el.querySelectorAll("[data-presentation-screen]");

        this._elTopPos = null;

        this._current = null;
        this._currentScreen = null;
        this._currentHeight = null;

        this._scrollPos = 0;
        this._heightModifier = 0;
        this._heightMin = 100;

        this._swiper = null;

        this._handleScroll = this._handleScroll.bind(this);
    }
    init() {
        this._setInitialHeight();
        this._setIntersectionObserver();
        this._setScrollingHandler();
        this._setStep();
        // позиция начала блока
        // this._elTopPos = this._el.getBoundingClientRect().top + pageYOffset;
    }
    _setStep() {
        // console.log(this._el.scrollHeight, this._itemsContainer.scrollHeight);
        const elHeight = this._el.scrollHeight;
        const boxHeight = this._itemsContainer.scrollHeight;
        const num = this._items.length;
        this._heightModifier = elHeight / boxHeight * num * 1.5;
    }
    _setCurrent(item) {
        // если текущий уже есть.
        if(this._current) {
            // снять класс актива
            this._current.classList.remove("is-active");
            // добавить класс просмотрено
            this._current.classList.add("is-seen");
        }
        // засовываем в текущий переданный элемент
        this._current = item;
        // присваиваем ему класс активности
        this._current.classList.add("is-active");
        // обновляем текущую высоту блока. height - число неизменное.
        this._currentHeight = parseInt(this._current.style.height);
    }
    // проходит по списку элементов и вычисляет их высоты
    _setInitialHeight() {
        let base = window.innerHeight / 1.5;
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
            threshold: 1
        };
        const callback = (entries) => {
            entries.forEach(entry => {
                const {isIntersecting, intersectionRatio} = entry;
                if(isIntersecting && intersectionRatio === 1) {
                    if(!this._current) {
                        this._setCurrent(this._items[0]);
                        // console.log(this._current, this._currentHeight)
                    }
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
                let dif = this._currentHeight - this._heightModifier;
                
                if(this._current.nextElementSibling && dif > this._heightMin) {
                    // текущая высота изменяется только если у элемента есть следующий элемент и если больше чем минимальная
                    // тобишь последний элемент мы вовсе не трогаем.
                    this._currentHeight = dif;
                    this._current.style.maxHeight = `${this._currentHeight}px`;
                }
                
                
                // если вычисленная высота меньше либо равна минимальной, то переносим активность на следующий элемент 
                if(dif <= this._heightMin && this._current.nextElementSibling) {
                    console.log("turn to next el");
                    this._setCurrent(this._current.nextElementSibling);
                }
                console.log(this._currentHeight);
            }
        } else {
            // up
            if(this._current) {
                let dif = this._currentHeight + this._heightModifier;
                // высота может увеличиваться, только если максимальная высота больше полученной разницы
                if(this._current.dataset.maxHeight >= dif) {
                    this._currentHeight = dif;
                    this._current.style.maxHeight = `${this._currentHeight}px`;
                }
                // если у нас есть предыдущий элемент и разницы превысила максимальную высоту элемента, мы можем перейти
                if(dif > this._current.dataset.maxHeight && this._current.previousElementSibling) {
                    console.log("turn to prev el");
                    this._setCurrent(this._current.previousElementSibling); 
                }

                // а почему это срабатывает несколько раз кряду, 
                console.log(this._currentHeight);
            }
        }
        this._scrollPos = st;

        // console.log(this._currentHeight, this._current);
    }

    // set current screen on phone

    // bind scroll to current block height

    // swiper slider on mobile
    // -- set classes to markup
    // -- init slider
    // -- resize event - init and destroy swiper
}