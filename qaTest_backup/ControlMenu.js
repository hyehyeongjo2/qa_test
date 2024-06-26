import { ControlMoreMenu } from './ControlMoreMenu.js';

export class ControlMenu {
    constructor() {
        this.gui = null;
        this.mapData = null;
        this.map = null;
        this.mapContainer = null;
        this.menu = null;
        this.transitionSetting = null;
        this.objectIds = [];
        this.poisIds = [];
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
        this.menu = this.gui.addFolder('Control');
        this.initTransition(this.menu);
        this.initSetOption(this.menu);
        this.initChangeZoom(this.menu);
        this.initMoveTo(this.menu);
        this.initSet(this.menu);
        this.initObjectEvent();
        this.initPoiEvent();
        this.initFocus(this.menu);
        this.initZoomIn(this.menu);
        this.initZoomOut(this.menu);
        this.initReset(this.menu);
        new ControlMoreMenu().init(this.menu, mapData, map, mapContainer);
        return this.menu;
    }

    initTransition(gui) {
        this.transitionSetting = {
            transition: false,
            transition2: true,
        };
        gui.add(this.transitionSetting, 'transition');
    }
    initSetOption(gui) {
        const setOption = (value) => {
            const option = {};
            const controlRangeOption = {};

            let zoomOption = {};
            for (let key in zoomSetting) if (zoomSetting[key] != '') zoomOption[key] = Number(zoomSetting[key]);
            if (Object.keys(zoomOption).length) controlRangeOption.zoom = zoomOption;

            let rotateOption = {};
            for (let key in rotateSetting) if (rotateSetting[key] != '') rotateOption[key] = Number(rotateSetting[key]);
            if (Object.keys(rotateOption).length) controlRangeOption.rotate = rotateOption;

            let tiltOption = {};
            for (let key in tiltSetting) if (tiltSetting[key] != '') tiltOption[key] = Number(tiltSetting[key]);
            if (Object.keys(tiltOption).length) controlRangeOption.tilt = tiltOption;

            if (Object.keys(controlRangeOption).length) option.controlRangeOption = controlRangeOption;

            mouseSetting.buttonOption = buttonSetting;
            option.mouseOption = mouseSetting;
            option.touchOption = touchSetting;

            console.log(option);
            this.map.control.setOption(option);
        };

        const menu = gui.addFolder('SetOption');
        const controlRangeMenu = menu.addFolder('controlRange');
        controlRangeMenu.open();

        const zoomSetting = {
            min: '',
            max: '',
        };
        const zoomMenu = controlRangeMenu.addFolder('zoom');
        // zoomMenu.open();
        zoomMenu.add(zoomSetting, 'min');
        zoomMenu.add(zoomSetting, 'max');

        const rotateSetting = {
            min: '',
            max: '',
        };
        const rotateMenu = controlRangeMenu.addFolder('rotate');
        // rotateMenu.open();
        rotateMenu.add(rotateSetting, 'min');
        rotateMenu.add(rotateSetting, 'max');

        const tiltSetting = {
            min: '',
            max: '',
        };
        const tiltMenu = controlRangeMenu.addFolder('tilt');
        // tiltMenu.open();
        tiltMenu.add(tiltSetting, 'min');
        tiltMenu.add(tiltSetting, 'max');
        const actionSetting = {
            setOption: setOption,
        };

        const mouseSetting = {
            enableZoom: true,
            enableRotate: true,
            enablePan: true,
            enableTilt: true,
        };
        const mouseMenu = menu.addFolder('mouse');
        // mouseMenu.open();
        mouseMenu.add(mouseSetting, 'enableZoom');
        mouseMenu.add(mouseSetting, 'enableRotate');
        mouseMenu.add(mouseSetting, 'enablePan');
        mouseMenu.add(mouseSetting, 'enableTilt');

        const buttonSetting = {
            left: 'PAN',
            middle: 'ZOOM',
            right: 'ROTATE',
        };
        const buttonSettingOption = ['PAN', 'ZOOM', 'ROTATE'];
        const buttonMenu = mouseMenu.addFolder('button');
        // buttonMenu.open();
        buttonMenu.add(buttonSetting, 'left', buttonSettingOption);
        buttonMenu.add(buttonSetting, 'middle', buttonSettingOption);
        buttonMenu.add(buttonSetting, 'right', buttonSettingOption);

        const touchSetting = {
            enableZoom: true,
            enableRotate: true,
            enablePan: true,
            enableTilt: true,
        };
        const touchMenu = menu.addFolder('touch');
        // touchMenu.open();
        touchMenu.add(touchSetting, 'enableZoom');
        touchMenu.add(touchSetting, 'enableRotate');
        touchMenu.add(touchSetting, 'enablePan');
        touchMenu.add(touchSetting, 'enableTilt');

        menu.add(actionSetting, 'setOption');
    }

    //Zoom In
    initZoomIn(gui) {
        const zoomIn = (value) => {
            const option = {
                transition: this.transitionSetting.transition,
            };
            console.log(option);
            this.map.control.zoomIn(option);
        };
        const setting = {
            zoomIn: zoomIn,
        };
        gui.add(setting, 'zoomIn');
    }

    //Zoom out
    initZoomOut(gui) {
        const zoomOut = (value) => {
            const option = {
                transition: this.transitionSetting.transition,
            };
            console.log(option);
            this.map.control.zoomOut(option);
        };
        const setting = {
            zoomOut: zoomOut,
        };

        gui.add(setting, 'zoomOut');
    }

    initChangeZoom(gui) {
        const changeZoom = (value) => {
            console.log(value);
            const option = {
                transition: this.transitionSetting.transition,
                zoom: setting.zoom,
            };
            console.log(option);
            this.map.control.changeZoom(option);
        };
        const setting = {
            zoom: '',
            changeZoom: changeZoom,
        };
        gui.add(setting, 'zoom').onFinishChange(changeZoom);
    }

    //reset
    initReset(gui) {
        const reset = (value) => {
            const option = {
                transition: this.transitionSetting.transition,
            };
            console.log(option);
            this.map.control.reset(option);
        };
        const setting = {
            reset: reset,
        };
        gui.add(setting, 'reset');
    }

    initztest(gui) {
        const ztest = (value) => {
            this.map.control.setOption({
                controlRangeOption: {
                    zoom: {
                        min: 21,
                        max: 22,
                    },
                },
            });
            this.map.control.changeZoom({ zoom: 4, transition: true });
            setTimeout(() => {
                this.map.control.changeZoom({ zoom: 24, transition: true });
                console.log('changeZoom');
            }, 1000);
            setTimeout(() => {
                this.map.control.set({ zoom: 4, rotation: 0, tilt: 0, transition: true });
            }, 3000);
            setTimeout(() => {
                this.map.control.set({ zoom: 24, rotation: 0, tilt: 0, transition: true });
                console.log('set');
            }, 4000);
            setTimeout(() => {
                this.map.control.changeZoom({ zoom: 4 });
                map.control.zoomIn({ transition: true });
            }, 6000);
            setTimeout(() => {
                this.map.control.changeZoom({ zoom: 24 });
                map.control.zoomOut({ transition: true });
                console.log('Zoomin/ Out');
            }, 7000);
            setTimeout(() => {
                console.log('scroll plz');
            }, 8000);
        };
        const setting = {
            ztest: ztest,
        };
        gui.add(setting, 'ztest');
    }

    //initMoveTo
    initMoveTo(gui) {
        const moveTo = (value) => {
            const option = {
                transition: this.transitionSetting.transition,
                position: { x: setting.x, y: setting.y },
            };
            console.log(option);
            this.map.control.moveTo(option);
        };
        const setting = {
            x: '',
            y: '',
            moveTo: moveTo,
        };
        const menu = gui.addFolder('Move To');
        // menu.open();
        menu.add(setting, 'x');
        menu.add(setting, 'y');
        menu.add(setting, 'moveTo');
    }

    initMtest(gui) {
        const Mtest = (value) => {
            const option = {
                transition: this.transitionSetting.transition,
                position: { x: 1000, y: 1000 },
            };
            const option2 = {
                transition: this.transitionSetting.transition,
                position: { x: 2000, y: 2000 },
            };
            const option3 = {
                transition: this.transitionSetting.transition2,
                position: { x: 1000, y: 1000 },
            };
            const option4 = {
                transition: this.transitionSetting.transition2,
                position: { x: 2000, y: 2000 },
            };
            setTimeout(() => {
                this.map.control.moveTo(option);
            }, 1000);
            setTimeout(() => {
                this.map.control.moveTo(option2);
            }, 3000);
            setTimeout(() => {
                this.map.control.moveTo(option3);
            }, 5000);
            setTimeout(() => {
                this.map.control.moveTo(option4);
            }, 7000);
            this.map.control.moveTo(option);
        };
        const setting = {
            Mtest: Mtest,
        };
        gui.add(setting, 'Mtest');
    }

    //initSet

    initSet(gui) {
        const set = (value) => {
            const option = {};
            for (let key in setting) {
                if (setting[key] != '') option[key] = Number(setting[key]);
            }
            option.transition = this.transitionSetting.transition;
            console.log(option);
            this.map.control.set(option);
        };

        const setting = {
            rotation: '',
            tilt: '',
            zoom: '',
        };
        const settingActonSet = {
            set: set,
        };
        const menu = gui.addFolder('Set');
        // menu.open();
        menu.add(setting, 'rotation');
        menu.add(setting, 'tilt');
        menu.add(setting, 'zoom');
        menu.add(settingActonSet, 'set');
    }

    initRotest(gui) {
        const Rotest = (value) => {
            this.map.control.setOption({
                controlRangeOption: {
                    rotate: {
                        min: -90,
                        max: 90,
                    },
                },
            });
            setTimeout(() => {
                this.map.control.set({ zoom: 20, rotation: -180, tilt: 0 });
            }, 1000);
            setTimeout(() => {
                this.map.control.set({ zoom: 20, rotation: 180, tilt: 0 });
                console.log('set');
            }, 2000);
            setTimeout(() => {
                console.log('scroll plz');
            }, 3000);
        };
        const setting = {
            Rotest: Rotest,
        };
        gui.add(setting, 'Rotest');
    }
    initStest(gui) {
        const Stest = (value) => {
            const option = {
                transition: this.transitionSetting.transition,
                zoom: 20,
                rotation: 45,
                tilt: 10,
            };
            const option2 = {
                transition: this.transitionSetting.transition,
                zoom: 24,
                rotation: 180,
                tilt: 50,
            };
            const option3 = {
                transition: this.transitionSetting.transition2,
                zoom: 20,
                rotation: 45,
                tilt: 10,
            };
            const option4 = {
                transition: this.transitionSetting.transition2,
                zoom: 24,
                rotation: 180,
                tilt: 50,
            };
            setTimeout(() => {
                this.map.control.set(option);
            }, 1000);
            setTimeout(() => {
                this.map.control.set(option2);
            }, 3000);
            setTimeout(() => {
                this.map.control.set(option3);
            }, 5000);
            setTimeout(() => {
                this.map.control.set(option4);
            }, 7000);
        };
        const setting = {
            Stest: Stest,
        };
        gui.add(setting, 'Stest');
    }
    inittitest(gui) {
        const titest = (value) => {
            this.map.control.setOption({
                controlRangeOption: {
                    tilt: {
                        min: 40,
                        max: 50,
                    },
                },
            });
            setTimeout(() => {
                this.map.control.set({ zoom: 20, rotation: 0, tilt: 10 });
            }, 1000);
            setTimeout(() => {
                this.map.control.set({ zoom: 20, rotation: 0, tilt: 80 });
                console.log('set');
            }, 2000);
            setTimeout(() => {
                console.log('scroll plz');
            }, 3000);
        };
        const setting = {
            titest: titest,
        };
        gui.add(setting, 'titest');
    }

    initenztest(gui) {
        const initenztest = (value) => {
            setTimeout(() => {
                this.map.control.setOption({
                    mouseOption: {
                        enableZoom: false,
                        enableRotate: true,
                        enablePan: true,
                        enableTilt: true,
                        buttonOption: {
                            left: 'PAN',
                            middle: 'ZOOM',
                            right: 'ROTATE',
                        },
                    },
                });
                console.log('plz check zoom false : 6s');
            }, 1000);
            setTimeout(() => {
                // this.map.control.reset();
                this.map.control.setOption({
                    mouseOption: {
                        enableZoom: true,
                        enableRotate: false,
                        enablePan: true,
                        enableTilt: true,
                        buttonOption: {
                            left: 'PAN',
                            middle: 'ZOOM',
                            right: 'ROTATE',
                        },
                    },
                });
                console.log('plz check rotate false : 6s');
            }, 7000);
            setTimeout(() => {
                // this.map.control.reset();
                this.map.control.setOption({
                    mouseOption: {
                        enableZoom: true,
                        enableRotate: true,
                        enablePan: false,
                        enableTilt: true,
                        buttonOption: {
                            left: 'PAN',
                            middle: 'ZOOM',
                            right: 'ROTATE',
                        },
                    },
                });
                console.log('plz check pan false : 6s');
            }, 13000);
            setTimeout(() => {
                // this.map.control.reset();
                this.map.control.setOption({
                    mouseOption: {
                        enableZoom: true,
                        enableRotate: true,
                        enablePan: true,
                        enableTilt: false,
                        buttonOption: {
                            left: 'PAN',
                            middle: 'ZOOM',
                            right: 'ROTATE',
                        },
                    },
                });
                console.log('plz check tilt false : 6s');
            }, 19000);
            setTimeout(() => {
                this.map.control.reset();
                this.map.control.setOption({
                    mouseOption: {
                        enableZoom: true,
                        enableRotate: true,
                        enablePan: true,
                        enableTilt: true,
                        buttonOption: {
                            left: 'ROTATE',
                            middle: 'ZOOM',
                            right: 'PAN',
                        },
                    },
                });
                console.log('plz check ro/pa button change : 6s');
            }, 25000);
        };
        const setting = {
            initenztest: initenztest,
        };
        gui.add(setting, 'initenztest');
    }

    initFocus(gui) {
        const focusTo = (value) => {
            let ids = null;

            if (settingFocusTo.type === 'OBJECT') {
                if (this.objectIds.length == 0) {
                    alert('click one or multiple objects to focus on');
                    return;
                }
                ids = this.objectIds;
            } else if (settingFocusTo.type === 'POI') {
                if (this.poisIds.length == 0) {
                    alert('click one or multiple pois to focus on');
                    return;
                }
                ids = this.poisIds;
            } else if (settingFocusTo.type === 'NAVIGATION') {
            }

            const option = {
                focus: {
                    type: settingFocusTo.type,
                    ids: ids,
                },
                transition: this.transitionSetting.transition,
                padding: {
                    top: settingFocusTo.top,
                    left: settingFocusTo.left,
                    bottom: settingFocusTo.bottom,
                    right: settingFocusTo.right,
                },
            };
            console.log(option);
            this.map.control.focusTo(option);
        };
        const settingFocusTo = {
            type: 'OBJECT_ALL',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            focusTo: focusTo,
        };
        const focusToMenu = gui.addFolder('Focus To');
        const focusType = ['OBJECT_ALL', 'OBJECT', 'NAVIGATION', 'POI', 'POI_ALL'];
        focusToMenu.add(settingFocusTo, 'type', focusType);
        focusToMenu.add(settingFocusTo, 'top', 0, 2000);
        focusToMenu.add(settingFocusTo, 'left', 0, 2000);
        focusToMenu.add(settingFocusTo, 'bottom', 0, 2000);
        focusToMenu.add(settingFocusTo, 'right', 0, 2000);
        focusToMenu.add(settingFocusTo, 'focusTo');
    }

    initObjectEvent() {
        let option = {
            activeDest: true,
            color: '#00ffff',
            opacity: 0.5,
            isAnimate: true,
            duration: 1200,
            isRepeat: true,
            isYoyo: true,
        };

        this.mapContainer.addEventListener('object-mouse-enter', (e) => {
            console.log('object enter ', e.detail);
            const id = e.detail.id;
            option = { ...option, ids: [id] };
            this.map.objects.set(option);
        });

        this.mapContainer.addEventListener('object-mouse-leave', (e) => {
            console.log('object leave ', e.detail);
            const id = e.detail.id;
            if (!this.objectIds.includes(id)) this.map.objects.reset(id);
        });

        this.mapContainer.addEventListener('object-click', (e) => {
            console.log('object click ', e.detail);
            const id = e.detail[0].id;
            if (this.objectIds.includes(id)) {
                this.map.objects.reset(id);
                this.objectIds = this.objectIds.filter((item) => item !== id); //화살표 함수로 필터 함수를 단순화
            } else {
                this.objectIds.push(id);
                option = { ...option, ids: this.objectIds };
                this.map.objects.set(option);
            }
            console.log(this.objectIds);
        });
    }

    initPoiEvent() {
        const map = this.map;
        const mapContainer = this.mapContainer;
        let poisIds = this.poisIds;
        console.log('initPOI event');

        let option = {
            outerColor: '#00ff00',
            innerColor: '#ff0000',
            scale: 1.2,
        };

        mapContainer.addEventListener('poi-mouse-enter', async (e) => {
            console.log('poi enter ', e.detail);
            const id = e.detail.id;
            option = { ...option, ids: [id] };
            await map.pois.set(option);
        });

        mapContainer.addEventListener('poi-mouse-leave', async (e) => {
            console.log('poi leave ', e.detail);
            const id = e.detail.id;
            if (!poisIds.includes(id)) await map.pois.reset(id);
        });

        mapContainer.addEventListener('poi-click', (e) => {
            console.log('poi click ', e.detail);
            const id = e.detail[0].id;
            if (poisIds.includes(id)) {
                map.pois.reset(id);
                poisIds = poisIds.filter((item) => item !== id); //화살표 함수로 필터 함수를 단순화
            } else {
                poisIds.push(id);
                option = { ...option, ids: poisIds };
                map.pois.set(option);
            }
            console.log(poisIds);
        });
    }
}
