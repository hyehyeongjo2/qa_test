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
        this.floorList = null;
    }
    init(menu, mapData, map, mapContainer) {
        this.mapData = mapData;
        this.map = map;
        this.mapContainer = mapContainer;
        this.floorList = this.mapData.dataFloor.getFloors();
        this.menu = menu.addFolder('More');
        this.initlocatest(this.menu);
        this.initlocatestOn(this.menu);
        this.initgiftest(this.menu);
        return this.menu;
    }
    initlocatest(gui) {
        const mylocatest = () => {
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
                        iconUrl: 'https://assets.dabeeomaps.com/image/ico/img_person-3x.png',
                        width: 200,
                        height: 200,
                        anchor: {
                            x: 0.5,
                            y: 0.5,
                        },
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
                        iconUrl: 'https://assets.dabeeomaps.com/image/ico/img_person-3x.png',
                        width: 50,
                        height: 50,
                        anchor: {
                            x: 0.5,
                            y: 0.5,
                        },
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
                        iconUrl: 'https://assets.dabeeomaps.com/image/ico/img_person-3x.png',
                        width: 50,
                        height: 50,
                        anchor: {
                            x: 0.1,
                            y: 0.1,
                        },
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
                        iconUrl: 'https://assets.dabeeomaps.com/image/ico/img_person-3x.png',
                        width: 50,
                        height: 50,
                        anchor: {
                            x: 1,
                            y: 1,
                        },
                    },
                };
                this.map.mylocation.set(Option);
            }, 6000);
        };
        const setting = {
            mylocatest: mylocatest,
        };
        gui.add(setting, 'mylocatest');
    }

    initlocatestOn(gui) {
        const mylocatestOn = async () => {
            const myloca1 = async () => {
                const locationOption = {
                    x: 2500,
                    y: 1000,
                    iconOption: {
                        positionZ: 400,
                        iconUrl: 'https://assets.dabeeomaps.com/image/ico/img_person-3x.png',
                        width: 200,
                        height: 200,
                        anchor: {
                            x: 0.5,
                            y: 0.5,
                        },
                    },
                    onActive: true,
                    animate: {
                        color: '#00ff00',
                        opacity: 0.4,
                        desireScale: 4,
                        duration: 1500,
                    },
                };
                this.map.mylocation.set(locationOption);
                setTimeout(() => {
                    this.map.context.changeFloor(this.floorList[1].id);
                }, 2000);
                setTimeout(() => {
                    this.map.context.changeFloor(this.floorList[0].id);
                }, 4000);
            };

            const myloca2 = async () => {
                const locationOption = {
                    x: 2500,
                    y: 1000,
                    iconOption: {
                        positionZ: 400,
                        iconUrl: 'https://assets.dabeeomaps.com/image/ico/img_person-3x.png',
                        width: 200,
                        height: 200,
                        anchor: {
                            x: 0.5,
                            y: 0.5,
                        },
                    },
                    onActive: false,
                    animate: {
                        color: '#00ff00',
                        opacity: 0.4,
                        desireScale: 4,
                        duration: 1500,
                    },
                };
                this.map.mylocation.set(locationOption);
                setTimeout(() => {
                    this.map.context.changeFloor(this.floorList[1].id);
                }, 2000);
                setTimeout(() => {
                    this.map.context.changeFloor(this.floorList[0].id);
                }, 4000);
            };
            myloca1();
            setTimeout(() => {
                myloca2();
            }, 8000);
        };
        const setting = {
            mylocatestOn: mylocatestOn,
        };
        gui.add(setting, 'mylocatestOn');
    }

    initgiftest(gui) {
        const giftest = async () => {
            const giftestonoff = async () => {
                const locationOption = {
                    x: 2500,
                    y: 1000,
                    iconOption: {
                        positionZ: 400,
                        iconUrl: 'https://assets.dabeeomaps.com/image/ico/landy.gif',
                        width: 200,
                        height: 200,
                        anchor: {
                            x: 0.5,
                            y: 0.5,
                        },
                    },
                };
                this.map.mylocation.set(locationOption);
                setTimeout(() => {
                    const option = {
                        x: 1000,
                        y: 1000,
                    };
                    this.map.mylocation.setPosition(option);
                }, 3000);
                setTimeout(() => {
                    this.map.mylocation.gifOff();
                }, 6000);
                setTimeout(() => {
                    const option = {
                        x: 3000,
                        y: 3000,
                    };
                    this.map.mylocation.setPosition(option);
                }, 9000);
                setTimeout(() => {
                    this.map.mylocation.gifOn();
                }, 12000);
            };
            giftestonoff();
        };
        const setting = {
            giftest: giftest,
        };
        gui.add(setting, 'giftest');
    }
}
