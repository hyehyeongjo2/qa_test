import { PoisMoreMenu } from './PoisMoreMenu.js';

export class PoisMenu {
    constructor() {
        this.gui = null;
        this.mapData = null;
        this.map = null;
        this.mapContainer = null;
        this.menu = null;
        this.setting = null;
        this.actionSetting = null;
        this.currentSetting = null;
        this.poiList = null;
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
        this.menu = this.gui.addFolder('Pois Menu');
        this.menu.open();
        this.initSetting();
        this.currentSetting = this.initCurrentSetting();
        new PoisMoreMenu().init(this.menu, mapData, map, mapContainer);
        return this.menu;
    }

    initSetting() {
        let poisSetting = null;
        this.mapContainer.addEventListener('floor-changed', (e) => {
            const currentFloor = e.detail.id;
            const poiList = this.mapData.dataPoi.getPois().reduce(
                (result, cur) => {
                    if (currentFloor == cur.floorId) return { ...result, [cur.title]: cur.id };
                    else return result;
                },
                { '': '' },
            );
            poisSetting = poisSetting.options(poiList);
        });

        const currentFloor = this.map.context.getCurrentFloor().id;
        const poiList = this.mapData.dataPoi.getPois().reduce(
            (result, cur) => {
                if (currentFloor == cur.floorId) return { ...result, [cur.title]: cur.id };
                else return result;
            },
            { '': '' },
        );

        this.setting = {
            outerColor: '#00ff00',
            innerColor: '#ff00ff',
            scale: 1,
        };

        this.actionSetting = {
            ids: '',
            set: this.set.bind(this),
            reset: this.reset.bind(this),
            hide: this.hide.bind(this),
            show: this.show.bind(this),
        };
        const menu = this.menu;
        menu.addColor(this.setting, 'outerColor');
        menu.addColor(this.setting, 'innerColor');
        menu.add(this.setting, 'scale');
        poisSetting = menu.add(this.actionSetting, 'ids', poiList);

        menu.add(this.actionSetting, 'set');
        menu.add(this.actionSetting, 'reset');
        menu.add(this.actionSetting, 'hide');
        menu.add(this.actionSetting, 'show');
    }

    initCurrentSetting() {
        const setting = {
            isVisible: true,
            x: '',
            y: '',
            z: '',
            byAsc: true,
            currentPoi: this.currentPoi.bind(this),
        };

        const menu = this.menu.addFolder('current menu');
        menu.add(setting, 'isVisible');
        menu.add(setting, 'x');
        menu.add(setting, 'y');
        menu.add(setting, 'z');
        menu.add(setting, 'byAsc');
        menu.add(setting, 'currentPoi');
        return setting;
    }
    currentPoi(value) {
        setTimeout(() => {
            const option = {
                isVisible: this.currentSetting.isVisible,
                sortOption: {
                    center: {
                        x: this.currentSetting.x,
                        y: this.currentSetting.y,
                        z: this.currentSetting.z,
                    },
                    byAsc: this.currentSetting.byAsc,
                },
            };
            const pois = this.map.pois.getCurrentPois(option);
            console.log('현재 화면 안에서 보여지고 있는 pois : ', pois);
            pois?.forEach((poi) => {
                console.log('poi title : ', poi.title);
            });
        }, 500);
    }

    set() {
        const option = Object.assign({}, this.setting);
        if (this.actionSetting.ids) {
            option.ids = [this.actionSetting.ids];
        }
        this.map.pois.set(option);
        const oboption = console.log(option);
        const setoboption = console.log(this.map.pois.set(option));
        if (oboption == setoboption) {
            console.log('true');
        } else {
            console.log('false');
        }
    }

    reset() {
        if (this.actionSetting.ids) this.map.pois.reset(this.actionSetting.ids);
        else this.map.pois.reset();
    }
    hide() {
        if (this.actionSetting.ids) this.map.pois.hide(this.actionSetting.ids);
        else this.map.pois.hide();
    }
    show() {
        if (this.actionSetting.ids) this.map.pois.show(this.actionSetting.ids);
        else this.map.pois.show();
    }
}
