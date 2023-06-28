import { MyLocationMoreMenu } from './MyLocationMoreMenu.js';

export class MyLocationMenu {
    constructor() {
        this.gui = null;
        this.mapData = null;
        this.map = null;
        this.mapContainer = null;
        this.menu = null;
        this.setting = null;
        this.setPosition = null;
        this.iconSetting = null;
        this.anchorSetting = null;
        this.animateSetting = null;
        this.setRotation = null;
        this.iconApplyFlag = false;
        this.anchorApply = false;
        this.animateApplyFlag = false;
        this.movePosition = null;
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
        this.menu = this.gui.addFolder('My Location Menu');
        this.menu.open();
        this.setting = this.initSetting();
        this.setPosition = this.initsetPosition();
        this.movePosition = this.initmovePosition();
        this.setRotation = this.initsetRotation();
        this.iconSetting = this.initIconSetting();
        this.anchorSetting = this.initAnchorSetting();
        this.animateSetting = this.initAnimateSetting();
        new MyLocationMoreMenu().init(this.menu, mapData, map, mapContainer);
        return this.menu;
    }
    initSetting() {
        const setting = {
            x: '3000',
            y: '1000',
            onActive: true,
        };
        const menu = this.menu;
        menu.add(setting, 'x');
        menu.add(setting, 'y');
        menu.add(setting, 'onActive');
        const actionSetting = {
            set: this.set.bind(this),
            clear: this.clear.bind(this),
            GifAnimationOn: this.gifon.bind(this),
            GifAnimationOff: this.gifoff.bind(this),
        };
        menu.add(actionSetting, 'set');
        menu.add(actionSetting, 'clear');
        menu.add(actionSetting, 'GifAnimationOn');
        menu.add(actionSetting, 'GifAnimationOff');
        return setting;
    }

    initsetPosition() {
        const setting = {
            x: '0',
            y: '0',
        };
        const menu = this.menu.addFolder('setPosition');
        menu.add(setting, 'x');
        menu.add(setting, 'y');

        const actionSetting = {
            setPosition: this.setposition.bind(this),
        };
        menu.add(actionSetting, 'setPosition');
        return setting;
    }

    initmovePosition() {
        const setting = {
            x: 0,
            y: 0,
        };
        const menu = this.menu.addFolder('movePosition');
        menu.add(setting, 'x');
        menu.add(setting, 'y');

        const actionSetting = {
            movePosition: this.moveposition.bind(this),
        };
        menu.add(actionSetting, 'movePosition');
        return setting;
    }

    initsetRotation() {
        const setting = {
            setRotation: '0',
        };
        const menu = this.menu.addFolder('setRotation');
        menu.add(setting, 'setRotation');

        const actionSetting = {
            setRotation: this.setrotation.bind(this),
        };
        menu.add(actionSetting, 'setRotation');
        return setting;
    }

    initIconSetting() {
        let iconController = null;
        const iconApply = () => {
            this.iconApplyFlag = !this.iconApplyFlag;
            if (this.iconApplyFlag) iconController = iconController.name('icon Reset');
            else iconController = iconController.name('icon Apply');
        };
        const setting = {
            positionZ: '',
            iconUrl: '',
            width: '',
            height: '',
        };
        const menu = this.menu.addFolder('Icon setting');
        menu.add(setting, 'positionZ');
        menu.add(setting, 'iconUrl', ['', 'https://assets.dabeeomaps.com/image/ico/img_person-3x.png', 'https://assets.dabeeomaps.com/image/ico/landy.gif']);
        menu.add(setting, 'width');
        menu.add(setting, 'height');
        const actionSetting = {
            iconApply: iconApply,
        };

        iconController = menu.add(actionSetting, 'iconApply');
        return setting;
    }
    initAnchorSetting() {
        let anchorController = null;
        const anchorApply = () => {
            this.anchorApplyFlag = !this.anchorApplyFlag;
            if (this.anchorApplyFlag) anchorController = anchorController.name('anchor Reset');
            else anchorController = anchorController.name('anchor Apply');
        };
        const setting = {
            x: 0.5,
            y: 0.5,
        };
        const actionSetting = {
            anchorApply: anchorApply,
        };
        const menu = this.menu.addFolder('anchor setting');
        menu.add(setting, 'x');
        menu.add(setting, 'y');
        anchorController = menu.add(actionSetting, 'anchorApply');
        return setting;
    }
    initAnimateSetting() {
        let animateController = null;
        const animateApply = () => {
            this.animateApplyFlag = !this.animateApplyFlag;
            if (this.animateApplyFlag) animateController = animateController.name('animte Reset');
            else animateController = animateController.name('animate Apply');
        };
        const setting = {
            color: '#00ff00',
            opacity: 0.4,
            desireScale: 4,
        };
        const menu = this.menu.addFolder('Animate setting');
        menu.addColor(setting, 'color');
        menu.add(setting, 'opacity');
        menu.add(setting, 'desireScale');

        const actionSetting = {
            animateApply: animateApply,
        };
        animateController = menu.add(actionSetting, 'animateApply');

        return setting;
    }

    set() {
        const option = Object.assign({}, this.setting);
        if (this.iconApplyFlag) {
            option.iconOption = this.iconSetting;
            if (this.anchorApplyFlag) option.iconOption.anchor = this.anchorSetting;
        }
        if (this.animateApplyFlag) {
            option.animate = this.animateSetting;
        }
        this.map.mylocation.set(option);
        const oboption = console.log(option);
        const setoboption = console.log(this.map.mylocation.set(option));
        if (oboption == setoboption) {
            console.log('true');
        } else {
            console.log('false');
        }
    }

    gifon() {
        this.map.mylocation.gifOn();
    }

    gifoff() {
        this.map.mylocation.gifOff();
    }

    clear() {
        this.map.mylocation.clear();
    }
    setposition() {
        const option = Object.assign({}, this.setPosition);
        this.map.mylocation.setPosition(option);
    }
    setrotation() {
        const option = this.setRotation.setRotation;
        this.map.mylocation.setRotation(option);
    }
    moveposition() {
        const option = Object.assign({}, this.movePosition);
        this.map.mylocation.movePosition(option);
    }
}
