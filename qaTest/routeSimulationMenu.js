import { routesumulation_emart_1 } from './routesumulation_emart_1.js';
import { routesumulation_hyundai_1 } from './routesumulation_hyundai_1.js';
import { routesumulation_hyundai_2 } from './routesumulation_hyundai_2.js';
import { routesumulation_lotte_1 } from './routesumulation_lotte_1.js';

export class routeSimulation2 {
    constructor() {
        this.gui = null;
        this.mapData = null;
        this.map = null;
        this.mapContainer = null;
        this.menu = null;
        this.setting = null;
    }
    removeMenu() {
        if (this.menu) {
            this.gui.removeFolder(this.menu);
            this.menu = null;
        }
    }
    init(gui, mapData, map, mapContainer) {
        this.gui = gui;
        this.mapData = mapData;
        this.map = map;
        this.mapContainer = mapContainer;
        this.menu = this.gui.addFolder('routeSimulation Menu');
        new routesumulation_emart_1().init(this.menu, mapData, map, mapContainer);
        new routesumulation_hyundai_1().init(this.menu, mapData, map, mapContainer);
        new routesumulation_hyundai_2().init(this.menu, mapData, map, mapContainer);
        new routesumulation_lotte_1().init(this.menu, mapData, map, mapContainer);
        this.menu.open();
        return this.menu;
    }
}
