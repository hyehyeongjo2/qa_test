export class MyLocationMenu {
    constructor() {
        this.gui = null;
        this.mapData = null;
        this.map = null;
        this.mapContainer = null;
        this.menu = null;
        this.setting = null;

        this.iconSetting = null;
        this.anchorSetting = null;
        this.animateSetting = null;

        this.iconApplyFlag = false;
        this.anchorApply = false;
        this.animateApplyFlag = false;
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
        this.menu = this.gui.addFolder("My Location Menu");
        this.setting = this.initSetting();
        this.iconSetting = this.initIconSetting();
        this.anchorSetting = this.initAnchorSetting();
        this.animateSetting = this.initAnimateSetting();
        return this.menu;
    }
    initSetting() {
        const setting = {
            x: "3000",
            y: "1000",
            onActive: true,
        };
        const menu = this.menu;
        menu.add(setting, "x");
        menu.add(setting, "y");
        menu.add(setting, "onActive");

        const actionSetting = {
            set: this.set.bind(this),
            clear: this.clear.bind(this),
        };
        menu.add(actionSetting, "set");
        menu.add(actionSetting, "clear");
        return setting;
    }

    initIconSetting() {
        let iconController = null;
        const iconApply = () => {
            this.iconApplyFlag = !this.iconApplyFlag;
            if (this.iconApplyFlag) iconController = iconController.name("icon Reset");
            else iconController = iconController.name("icon Apply");
        };
        const setting = {
            positionZ: "",
            iconUrl: "",
            width: "",
            height: "",
        };
        const menu = this.menu.addFolder("Icon setting");
        menu.add(setting, "positionZ");
        menu.add(setting, "iconUrl", ["", "https://assets.dabeeomaps.com/image/ico/img_person-3x.png"]);
        menu.add(setting, "width");
        menu.add(setting, "height");
        const actionSetting = {
            iconApply: iconApply,
        };

        iconController = menu.add(actionSetting, "iconApply");
        return setting;
    }
    initAnchorSetting() {
        let anchorController = null;
        const anchorApply = () => {
            this.anchorApplyFlag = !this.anchorApplyFlag;
            if (this.anchorApplyFlag) anchorController = anchorController.name("anchor Reset");
            else anchorController = anchorController.name("anchor Apply");
        };
        const setting = {
            x: 0.5,
            y: 0.5,
        };
        const actionSetting = {
            anchorApply: anchorApply,
        };
        const menu = this.menu.addFolder("anchor setting");
        menu.add(setting, "x");
        menu.add(setting, "y");
        anchorController = menu.add(actionSetting, "anchorApply");
        return setting;
    }
    initAnimateSetting() {
        let animateController = null;
        const animateApply = () => {
            this.animateApplyFlag = !this.animateApplyFlag;
            if (this.animateApplyFlag) animateController = animateController.name("animte Reset");
            else animateController = animateController.name("animate Apply");
        };
        const setting = {
            color: "#00ff00",
            opacity: 0.4,
            desireScale: 4,
        };
        const menu = this.menu.addFolder("Animate setting");
        menu.addColor(setting, "color");
        menu.add(setting, "opacity");
        menu.add(setting, "desireScale");

        const actionSetting = {
            animateApply: animateApply,
        };
        animateController = menu.add(actionSetting, "animateApply");

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
        console.log(option);

        this.map.mylocation.set(option);
    }

    clear() {
        this.map.mylocation.clear();
    }
}
