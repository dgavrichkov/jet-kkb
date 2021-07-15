import Accordeon from "./modules/Accordeon";
import Tabs from "./modules/Tabs";

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

document.addEventListener("DOMContentLoaded", function() {
    accordionInit();    
    tabsInit();
});