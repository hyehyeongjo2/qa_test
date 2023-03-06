import { ContextMoreMenu } from './ContextMoreMenu.js';

export class ContextMenu {
    constructor() {
        this.gui = null;
        this.mapData = null;
        this.map = null;
        this.mapContainer = null;
        this.menu = null;
    }

    init(gui, mapData, map, mapContainer) {
        this.gui = gui;
        this.mapData = mapData;
        this.map = map;
        this.mapContainer = mapContainer;
        this.menu = this.gui.addFolder('Context');
        this.menu.open();
        this.setting = this.initSetting(this.menu);
        new ContextMoreMenu().init(this.menu, mapData, map, mapContainer);
        return this.menu;
    }
    initSetting(menu) {
        this.mapContainer.addEventListener('floor-changed', (e) => {
            setting.getCurrentFloor = this.map.context.getCurrentFloor().id;
        });

        const currentFloor = this.map.context.getCurrentFloor();
        const currentCameraMode = this.map.control.getCameraType();

        const langList = this.mapData.dataLanguage.getLanguage().reduce((result, cur) => {
            return { ...result, [cur.name]: cur.lang };
        }, {});

        const scaleList = [1, 2, 3, 4, 5];
        const groupList = this.mapData.dataGroupCode.findAll();

        const setting = {
            changeCamera: currentCameraMode,
            changeLang: '',
            convert2Image: '',
            getCurrentFloor: currentFloor.id,
            getMapOptions: this.getMapOptions.bind(this),
            hideByCode: '',
            showByCode: '',
            cleanup: this.cleanup.bind(this),
        };

        // menu.open();
        menu.add(setting, 'changeCamera', ['2D', '3D']).onChange(this.changeCamera.bind(this));
        menu.add(setting, 'changeLang', langList).onChange(this.changeLanguage.bind(this));
        menu.add(setting, 'convert2Image', scaleList).onChange(this.convert2Image.bind(this));
        menu.add(setting, 'getCurrentFloor').listen();
        menu.add(setting, 'getMapOptions');
        menu.add(setting, 'hideByCode', groupList).onChange(this.hideByCode.bind(this));
        menu.add(setting, 'showByCode', groupList).onChange(this.showByCode.bind(this));
        menu.add(setting, 'cleanup');
        return setting;
    }

    cleanup(value) {
        this.map.context.cleanup();
        console.log(`this.map.context.cleanup()`);
        this.map = null;
        this.removeMenu();
    }
    changeLanguage(value) {
        this.map.context.changeLanguage(value); // poi 언어를 바꿉니다. 'en' | 'ko'
        console.log(`this.map.context.changeLanguage(${value})`);
    }
    hideByCode(value) {
        this.map.context.hideByCode(value);
        console.log(`this.map.context.hideByCode(${value})`);
    }
    showByCode(value) {
        this.map.context.showByCode(value);
        console.log(`this.map.context.showByCode(${value})`);
    }

    convert2Image(value) {
        this.map.context.convertToImg({ ratio: value });
        console.log(`this.map.context.convertToImg({ratio:${value}})`);
    }

    getMapOptions(value) {
        const option = this.map.context.getMapOptions();
        console.log(`this.map.context.getMapOptions()`, option);
    }

    changeCamera(value) {
        this.map.control.changeCamera(value);
        console.log(`this.map.context.changeCamera(${value})`);
    }
    removeMenu() {
        if (this.menu) {
            this.gui.removeFolder(this.menu);
            this.menu = null;
        }
    }
}
