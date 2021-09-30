export default class Presentation {
    constructor(el) {
        this._el = el;
        this._box = this._el.querySelector("[data-presentation-frame]");
        this._frame = this._el.querySelector("[data-presentation-frame]");
        this._items = this._el.querySelectorAll("[data-presentation-item]");
        this._itemsContainer = this._items[0].parentElement;
        this._screens = this._el.querySelectorAll("[data-presentation-screen]");
        this._intersector = this._el.querySelector(".how-it__intersector");

        this._wrapper = this._el.querySelector(".how-it__content");

        this._elTopPos = null;

        this._current = null;
        this._currentScreen = null;
        this._currentHeight = null;

        this._interval = null;

        this._scrollPos = 0;
        this._heightModifier = 0;
        this._heightMin = 100;

        this._swiperOptions = {
            slidesPerView: 1,
        };
        this._swiper = null;

        this._handleScroll = this._handleScroll.bind(this);
    }
    init() {
        this._current = Array.from(this._items).find(item => item.classList.contains("is-active"));
        this._currentScreen = Array.from(this._screens).find(screen => screen.classList.contains("is-active"));
        // this._setInitialHeight();
        this._setIntersectionObserver();
        this._setStep();
        this._setResizeHandler();
        this._setSwiper();
        this._setItemClickHandler();

        // позиция начала блока
        // this._elTopPos = this._el.getBoundingClientRect().top + pageYOffset;
    }
    _setResizeHandler() {
        window.addEventListener("resize", () => {
            // this._setInitialHeight();
            this._setSwiper();
        });
    }
    _setStep() {
        const elHeight = this._el.scrollHeight;
        const boxHeight = this._itemsContainer.scrollHeight;
        const num = this._items.length;
        this._heightModifier = elHeight / boxHeight * num * 1.5;
    } 
    // проходит по списку элементов и вычисляет их высоты
    _setInitialHeight() {
        if(window.innerWidth > 641) {
            let base = window.innerHeight / 1.5;
            let count = 1;
            this._items.forEach(item => {
                const mod = count % 2 ? 100 : 72;
                base = base - mod;
                item.style.height = Math.floor(base) + "px";
                item.dataset.maxHeight = Math.floor(base);
                count++;
            });
        } else {
            this._items.forEach(item => {
                item.style.height = "";
                item.dataset.maxHeight = "";
            })
        }
        
    }
    _setCurrent(item, isPrev) {
        // если текущий уже есть.
        if(this._current) {
            // снять класс актива
            this._current.classList.remove("is-active");
            // добавить класс просмотрено
            this._current.classList.add("is-seen");
            this._currentScreen.classList.remove("is-active");
        }
        // засовываем в текущий переданный элемент
        this._current = item;
        // присваиваем ему класс активности
        this._current.classList.add("is-active");
        
        // обновляем текущую высоту блока. height - число неизменное.
        // if(isPrev) {
        //     this._currentHeight = this._heightMin;
        // } else {
        //     this._currentHeight = parseInt(this._current.style.height);
        // }

        // надо обновить скрин
        const name = this._current.dataset.presentationItem;
        this._currentScreen = this._el.querySelector(`[data-presentation-screen="${name}"]`);
        this._currentScreen.classList.add("is-active");
    }
    _setIntersectionObserver() {
        const options = {
            root: null,
            threshold: 0.75
        };
        const callback = (entries) => {
            entries.forEach(entry => {
                if(window.innerWidth <= 640) {
                    return false;
                }
                const {isIntersecting} = entry;
                if(isIntersecting && !this._interval) {
                    this._setCurrent(this._items[0]);
                    this._setInterval();
                }
            });
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(this._intersector);
    }
    _setInterval() {
        this._interval = setInterval(() => {
            if(this._current.nextElementSibling) {
                this._setCurrent(this._current.nextElementSibling);
            } else {
                this._setCurrent(this._items[0]);
            }
        }, 4000)
    }
    _clearInterval() {
        if(this._interval) {
            clearTimeout(this._interval);
        }
    }
    _setScrollingHandler() {
        window.addEventListener("scroll", this._handleScroll);
    }
    // обновляет значение текущей высоты и записывает в стайл текущего элемента
    _setCurrentHeight(val) {
        this._currentHeight = val;
        this._current.style.maxHeight = `${this._currentHeight}px`;
    }
    _setItemClickHandler() {
        this._items.forEach(item => {
            item.addEventListener("click", () => {
                this._clearInterval();
                this._setCurrent(item);
                this._setInterval();
            });
        });
    }

    _setSwiper() {
        if(window.innerWidth <= 640) {
            this._wrapper.classList.add("swiper-container");
            this._itemsContainer.classList.add("swiper-wrapper");
            this._items.forEach(item => {
                item.classList.add("swiper-slide");
            })

            this._swiper = new Swiper(this._wrapper, this._swiperOptions);
            this._swiper.on("slideChangeTransitionEnd", () => {
                const active = this._swiper.slides[this._swiper.realIndex];
                const name = active.dataset.presentationItem;
                if(this._currentScreen) {
                    this._currentScreen.classList.remove("is-active");
                    this._current.classList.remove("is-active");
                }
                this._current = active;
                this._currentScreen = Array.from(this._screens).find(screen => screen.dataset.presentationScreen === name);
                this._currentScreen.classList.add("is-active");
                this._current.classList.add("is-active");
            });
        }
    }
    _handleScroll() {
        if(window.innerWidth <= 640) {
            return false;
        }
        let st = window.pageYOffset;
        if(st > this._scrollPos) {
            // down
            if(this._current) {
                // определенно надо что-то менять в вычислении новой высоты. Она должна зависеть от текущей прокрутки.
                let dif = this._currentHeight - this._heightModifier;
                if(this._current.nextElementSibling && dif > this._heightMin) {
                    // текущая высота изменяется только если у элемента есть следующий элемент и если больше чем минимальная
                    // тобишь последний элемент мы вовсе не трогаем.
                    this._setCurrentHeight(dif);
                }
                
                // если вычисленная высота меньше либо равна минимальной, то переносим активность на следующий элемент 
                if(dif <= this._heightMin && this._current.nextElementSibling) {
                    this._setCurrent(this._current.nextElementSibling);
                }
            }
        } else {
            // up
            if(this._current) {
                let dif = this._currentHeight + this._heightModifier;
                // высота может увеличиваться, только если максимальная высота больше полученной разницы
                if(this._current.dataset.maxHeight >= dif) {
                    this._setCurrentHeight(dif);
                } else if(dif > this._current.dataset.maxHeight && this._current.previousElementSibling) {
                    // если у нас есть предыдущий элемент и разницы превысила максимальную высоту элемента, мы можем перейти
                    this._setCurrent(this._current.previousElementSibling, true);
                }
            }
        }
        this._scrollPos = st;
    }
}