import Accordeon from "./modules/Accordeon";
import Tabs from "./modules/Tabs";
import Popup from "./modules/Popup";
import Presentation from "./modules/Presentation";
import Bonuses from "./modules/Bonuses";

const accordionInit = function() {
    const accordeon = document.querySelector(".accordeon");
    const accordeonComp = new Accordeon(accordeon);
    accordeonComp.init()
}

const tabsInit = function() {
    const tabs = document.querySelector(".servtab");
    const tabsComp = new Tabs(tabs);
    tabsComp.init();
}

const popupsInit = function() {
    const popups = document.querySelectorAll(".popup");
    popups.forEach(pop => {
        const name = pop.dataset.videoPopup;
        const trigger = document.querySelector(`.video-preview[data-video-popup="${name}"]`);
        const popupComp = new Popup(pop);
        popupComp.init();
        trigger.addEventListener("click", () => {
            popupComp.open();
        });
    })
}

const initPresentation = function() {
    const block = document.querySelector(".how-it");
    const presentation = new Presentation(block);
    presentation.init();
};

const bonusesInit = function() {
    const block = document.querySelector(".bonuses");
    const comp = new Bonuses(block);
    comp.init();
}

document.addEventListener("DOMContentLoaded", function() {
    bonusesInit();
    accordionInit();
    tabsInit();
    popupsInit();
    initPresentation();
});

window.onbeforeunload = function () { 
    // window.scrollTo(0,0) 
};
