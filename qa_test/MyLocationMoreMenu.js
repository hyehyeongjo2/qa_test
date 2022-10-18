export class MyLocationMoreMenu {
    constructor() {
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
    init(menu, mapData, map, mapContainer) {
        this.mapData = mapData; 
        this.map = map;
        this.mapContainer = mapContainer;
        this.menu = menu.addFolder("More");
        this.initlocatest(this.menu);
        return this.menu; 
    }
    initlocatest(gui){
        const mylocatest=()=>{
            setTimeout(() => {
                const Option = {
                    x: 2000,
                    y: 2000,
                };
                this.map.mylocation.set(Option);
            }, 1000);
            setTimeout(() => {
                const Option = {
                    x: 1000,
                    y: 1000,
                };
                this.map.mylocation.set(Option);
            }, 2000);
            setTimeout(() => {
                const Option = {
                    x: 1000,
                    y: 1000,
                    iconOption: {
                        positionZ: 400,
                        iconUrl: "https://assets.dabeeomaps.com/image/ico/img_person-3x.png",
                        width: 200,
                        height: 200,
                        anchor: {
                            x: 0.5,
                            y: 0.5,
                        }
                    },
                };
                this.map.mylocation.set(Option);
            }, 3000);
            setTimeout(() => {
                const Option = {
                    x: 1000,
                    y: 1000,
                    iconOption: {
                        positionZ: 400,
                        iconUrl: "https://assets.dabeeomaps.com/image/ico/img_person-3x.png",
                        width: 50,
                        height: 50,
                        anchor: {
                            x: 0.5,
                            y: 0.5,
                        }
                    },
                };
                this.map.mylocation.set(Option);
            }, 4000);
            setTimeout(() => {
                const Option = {
                    x: 1000,
                    y: 1000,
                    iconOption: {
                        positionZ: 400,
                        iconUrl: "https://assets.dabeeomaps.com/image/ico/img_person-3x.png",
                        width: 50,
                        height: 50,
                        anchor: {
                            x: 0.1,
                            y: 0.1,
                        }
                    },
                };
                this.map.mylocation.set(Option);
            }, 5000);
            setTimeout(() => {
                const Option = {
                    x: 1000,
                    y: 1000,
                    iconOption: {
                        positionZ: 400,
                        iconUrl: "https://assets.dabeeomaps.com/image/ico/img_person-3x.png",
                        width: 50,
                        height: 50,
                        anchor: {
                            x: 1,
                            y: 1,
                        }
                    },
                };
                this.map.mylocation.set(Option);
            }, 6000);
        }
        const setting = {
            mylocatest: mylocatest,
          };
        gui.add(setting, "mylocatest");
        } 
}
