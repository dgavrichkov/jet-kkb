import Accordeon from "./modules/Accordeon";
import Tabs from "./modules/Tabs";
import Popup from "./modules/Popup";
import Presentation from "./modules/Presentation";

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


document.addEventListener("DOMContentLoaded", function() {
    accordionInit();
    tabsInit();
    popupsInit();
    initPresentation();
});