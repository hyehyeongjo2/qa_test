export class ControlMoreMenu {
    constructor() {
        this.mapData = null;
        this.map = null;
        this.mapContainer = null;
        this.menu = null;
        this.objectList = null;
        this.poiList = null;
        this.event = null;
        this.floorList = null;
    }
    removeMenu() {
        if (this.menu) {
            this.gui.removeFolder(this.menu);
            this.menu = null;
        }
    }
    async init(menu, mapData, map, mapContainer) {
        this.mapData = mapData;
        this.map = map;
        this.mapContainer = mapContainer;
        this.menu = menu.addFolder('More');
        this.fpoi = menu.addFolder('fpoi');
        this.fob = menu.addFolder('fob');
        this.paddingtest = menu.addFolder('paddingtest');
        const currentFloor = this.map.context.getCurrentFloor().id;
        const objects = await this.mapData.dataObject.getObjects(currentFloor);
        this.objectList = objects.reduce(
            (result, cur) => {
                return [...result, cur.id];
            },
            [''],
        );
        this.poiList = this.mapData.dataPoi.getPois().reduce(
            (result, cur) => {
                if (currentFloor == cur.floorId) result.push(cur.id);
                return result;
            },
            [''],
        );
        this.floorList = this.mapData.dataFloor.getFloors();
        this.initztest(this.menu);
        this.initStest(this.menu);
        this.initMtest(this.menu);
        this.initRotest(this.menu);
        this.inittitest(this.menu);
        this.initenztest(this.menu);
        this.initfocustestob1(this.fob);
        this.initfocustestob2(this.fob);
        this.initfocustestob3(this.fob);
        this.initfocustestpoi1(this.fpoi);
        this.initfocustestpoi2(this.fpoi);
        this.initfocustestpoi3(this.fpoi);
        this.obpadding(this.paddingtest);
        this.poipadding(this.paddingtest);
        this.navpadding(this.paddingtest);
        return this.menu;
    }

    initztest(gui) {
        const mapContainer = this.mapContainer;
        this.event = true;
        const ztest = (value) => {
            let cameraType = this.map.control.getCameraType();
            console.log('cameraType : ', cameraType);
            this.map.control.setOption({
                controlRangeOption: {
                    zoom: {
                        min: 20,
                        max: 22,
                    },
                },
            });
            this.map.control.changeZoom({ zoom: 20, transition: false });
            console.log('currentZoomLevel:', this.map.control.getCurrentZoomLevel());
            setTimeout(() => {
                this.map.control.changeZoom({ zoom: 24, transition: false });
                this.event = true;
                console.log('changeZoom', this.map.control.getCurrentZoomLevel());
            }, 1000);
            setTimeout(() => {
                this.map.control.set({ zoom: 20, rotation: 0, tilt: 0, transition: false });
                this.event = true;
                console.log('set', this.map.control.getCurrentZoomLevel());
            }, 3000);
            setTimeout(() => {
                this.map.control.set({ zoom: 24, rotation: 0, tilt: 0, transition: false });
                this.event = true;
                console.log('set', this.map.control.getCurrentZoomLevel());
            }, 4000);
            setTimeout(() => {
                // this.map.control.changeZoom({ zoom: 20 });
                this.map.control.zoomIn({ transition: false });
                this.event = true;
                console.log('set', this.map.control.getCurrentZoomLevel());
            }, 6000);
            setTimeout(() => {
                // this.map.control.changeZoom({ zoom: 24 });
                this.map.control.zoomOut({ transition: false });
                this.event = true;
                console.log('Zoomin/ Out', this.map.control.getCurrentZoomLevel());
            }, 7000);
            setTimeout(() => {
                console.log('scroll plz');
            }, 8000);
            setTimeout(() => {
                this.map.control.setOption({
                    controlRangeOption: {
                        zoom: {
                            min: 1,
                            max: 24,
                        },
                    },
                });
                this.map.control.reset({ transition: true });
                console.log('reset');
            }, 10000);
            mapContainer.addEventListener('zoom-changed', (e) => {
                if (this.event) {
                    console.log('zoom-changed 에 대한 결과값', e.detail);
                    this.event = false;
                }
            });
        };
        const setting = {
            ztest: ztest,
        };
        gui.add(setting, 'ztest');
    }

    initMtest(gui) {
        let cameraType = this.map.control.getCameraType();
        const Mtest = (value) => {
            const option = {
                transition: false,
                position: { x: 1000, y: 1000 },
            };
            const option2 = {
                transition: false,
                position: { x: 2000, y: 2000 },
            };
            setTimeout(() => {
                this.map.control.moveTo(option);
            }, 1000);
            setTimeout(() => {
                this.map.control.moveTo(option2);
            }, 3000);
        };
        const setting = {
            Mtest: Mtest,
        };
        gui.add(setting, 'Mtest');
    }

    initRotest(gui) {
        this.event = true;
        const mapContainer = this.mapContainer;
        let cameraType = this.map.control.getCameraType();
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
                this.event = true;
            }, 1000);
            setTimeout(() => {
                this.map.control.set({ zoom: 20, rotation: 180, tilt: 0 });
                this.event = true;
                console.log('set');
            }, 2000);
            setTimeout(() => {
                console.log('scroll plz');
            }, 3000);
            mapContainer.addEventListener('rotation-changed', (e) => {
                if (this.event) {
                    console.log('rotation-changed 에 대한 결과값', e.detail);
                    this.event = false;
                }
            });
        };
        const setting = {
            Rotest: Rotest,
        };
        gui.add(setting, 'Rotest');
    }

    initStest(gui) {
        let cameraType = this.map.control.getCameraType();
        const Stest = (value) => {
            const option = {
                transition: true,
                zoom: 20,
                rotation: 45,
                tilt: 10,
            };
            const option2 = {
                transition: true,
                zoom: 24,
                rotation: 180,
                tilt: 50,
            };
            const option3 = {
                transition: true,
                zoom: 20,
                rotation: 45,
                tilt: 10,
            };
            const option4 = {
                transition: true,
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
        const mapContainer = this.mapContainer;
        this.event = true;
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
                this.event = true;
            }, 1000);
            setTimeout(() => {
                this.map.control.set({ zoom: 20, rotation: 0, tilt: 80 });
                this.event = true;
                console.log('set');
            }, 2000);
            setTimeout(() => {
                console.log('scroll plz');
            }, 3000);
            mapContainer.addEventListener('tilt-changed', (e) => {
                if (this.event) {
                    console.log('tilt-changed 에 대한 결과값', e.detail);
                    this.event = false;
                }
            });
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

    initfocustestob1(gui) {
        const focustestob1 = async (value) => {
            const floorList = this.mapData.dataFloor.getFloors();
            const floorChangedTest_2F = async () => {
                this.mapContainer.addEventListener('floor-changed', (e) => {
                    const second = this.mapData.dataObject.getObjects(floorList[1].id);
                    console.log('floor changed 에 대한 결과값', e.detail);
                    this.map.control.focusTo({
                        focus: {
                            type: 'OBJECT',
                            ids: [second[5].id],
                            //ids : OB-3PdRZ1rzi5625- 2층계단, OB-u-GoTosOj64029-남자화장실, OB-EwYTaOTNj4029- 화장실-여
                            // ids: ['OB-mxanpdYA1T2410', 'OB-aN7fGeVoze1959', 'OB-ccjURqW8hq1959']
                        },
                        transition: true,
                        padding: {
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                        },
                    });
                });
                await this.map.context.changeFloor(floorList[1].id); // 지도를 입력한 층 아이디에 맞는 층으로 전환합니다.
            };
            const floorChangedTest_11F = async () => {
                this.mapContainer.addEventListener('floor-changed', (e) => {
                    const first = this.mapData.dataObject.getObjects(floorList[0].id);
                    console.log('floor changed 에 대한 결과값', e.detail);
                    this.map.control.focusTo({
                        focus: {
                            type: 'OBJECT',
                            ids: [first[5].id],
                            //ids : OB-3PdRZ1rzi5625- 2층계단, OB-u-GoTosOj64029-남자화장실, OB-EwYTaOTNj4029- 화장실-여
                            // ids: ['OB-mxanpdYA1T2410', 'OB-aN7fGeVoze1959', 'OB-ccjURqW8hq1959']
                        },
                        transition: true,
                        padding: {
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                        },
                    });
                });
                await this.map.context.changeFloor(floorList[0].id); // 지도를 입력한 층 아이디에 맞는 층으로 전환합니다.
            };
            floorChangedTest_2F();
            setTimeout(() => {
                floorChangedTest_11F();
            }, 2000);
        };
        const setting = {
            focustestob1: focustestob1,
        };
        gui.add(setting, 'focustestob1');
    }

    initfocustestob2(gui) {
        const focustestob2 = async (value) => {
            const floorChangedTest_2F = async () => {
                this.mapContainer.addEventListener('floor-changed', (e) => {
                    console.log('floor changed 에 대한 결과값', e.detail);
                    this.map.control.focusTo({
                        focus: {
                            type: 'OBJECT_ALL',
                            // ids: [],
                            //ids : OB-3PdRZ1rzi5625- 2층계단, OB-u-GoTosOj64029-남자화장실, OB-EwYTaOTNj4029- 화장실-여
                            // ids: ['OB-mxanpdYA1T2410', 'OB-aN7fGeVoze1959', 'OB-ccjURqW8hq1959']
                        },
                        transition: true,
                        padding: {
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                        },
                    });
                });
                await this.map.context.changeFloor('FL-vf3q07spbmsw8132'); // 지도를 입력한 층 아이디에 맞는 층으로 전환합니다.
            };
            const floorChangedTest_11F = async () => {
                this.mapContainer.addEventListener('floor-changed', (e) => {
                    console.log('floor changed 에 대한 결과값', e.detail);
                    this.map.control.focusTo({
                        focus: {
                            type: 'OBJECT_ALL',
                            // ids: [],
                            //ids : OB-3PdRZ1rzi5625- 2층계단, OB-u-GoTosOj64029-남자화장실, OB-EwYTaOTNj4029- 화장실-여
                            // ids: ['OB-mxanpdYA1T2410', 'OB-aN7fGeVoze1959', 'OB-ccjURqW8hq1959']
                        },
                        transition: true,
                        padding: {
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                        },
                    });
                });
                await this.map.context.changeFloor('FL-t4vqgyek3jnb8146'); // 지도를 입력한 층 아이디에 맞는 층으로 전환합니다.
            };
            floorChangedTest_2F();
            setTimeout(() => {
                floorChangedTest_11F();
            }, 10000);
        };
        const setting = {
            focustestob2: focustestob2,
        };
        gui.add(setting, 'focustestob2');
    }

    initfocustestob3(gui) {
        const focustestob3 = async (value) => {
            const floorList = this.mapData.dataFloor.getFloors();
            const floorChangedTest_2F = async () => {
                this.mapContainer.addEventListener('floor-changed', (e) => {
                    const second = this.mapData.dataObject.getObjects(floorList[1].id);
                    console.log('floor changed 에 대한 결과값', e.detail);
                    this.map.control.focusTo({
                        focus: {
                            type: 'OBJECT',
                            // ids: []
                            //ids : OB-3PdRZ1rzi5625- 2층계단, OB-u-GoTosOj64029-남자화장실, OB-EwYTaOTNj4029- 화장실-여
                            ids: [second[5].id, second[4].id, second[2].id],
                        },
                        transition: true,
                        padding: {
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                        },
                    });
                });
                await this.map.context.changeFloor(floorList[1].id); // 지도를 입력한 층 아이디에 맞는 층으로 전환합니다.
            };
            const floorChangedTest_11F = async () => {
                this.mapContainer.addEventListener('floor-changed', (e) => {
                    const first = this.mapData.dataObject.getObjects(floorList[0].id);
                    console.log('floor changed 에 대한 결과값', e.detail);
                    this.map.control.focusTo({
                        focus: {
                            type: 'OBJECT',
                            // ids: []
                            //ids : OB-3PdRZ1rzi5625- 2층계단, OB-u-GoTosOj64029-남자화장실, OB-EwYTaOTNj4029- 화장실-여
                            ids: [first[5].id, first[4].id, first[2].id],
                        },
                        transition: true,
                        padding: {
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                        },
                    });
                });
                await this.map.context.changeFloor(floorList[0].id); // 지도를 입력한 층 아이디에 맞는 층으로 전환합니다.
            };
            floorChangedTest_2F();
            setTimeout(() => {
                floorChangedTest_11F();
            }, 2000);
        };

        const setting = {
            focustestob3: focustestob3,
        };
        gui.add(setting, 'focustestob3');
    }

    initfocustestpoi1(gui) {
        const focustestpoi1 = async (value) => {
            const floorList = this.mapData.dataFloor.getFloors();
            const floorChangedTest_2F = async () => {
                this.mapContainer.addEventListener('floor-changed', (e) => {
                    const second = this.mapData.dataPoi.getPois(floorList[1].id);
                    console.log('floor changed 에 대한 결과값', e.detail);
                    this.map.control.focusTo({
                        focus: {
                            type: 'POI',
                            ids: [second[4].id],
                        },
                        transition: true,
                        padding: {
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                        },
                    });
                });
                await this.map.context.changeFloor(floorList[1].id); // 지도를 입력한 층 아이디에 맞는 층으로 전환합니다.
            };
            const floorChangedTest_11F = async () => {
                this.mapContainer.addEventListener('floor-changed', (e) => {
                    const first = this.mapData.dataPoi.getPois(floorList[0].id);
                    console.log('floor changed 에 대한 결과값', e.detail);
                    this.map.control.focusTo({
                        focus: {
                            type: 'POI',
                            ids: [first[5].id],
                        },
                        transition: true,
                        padding: {
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                        },
                    });
                });
                await this.map.context.changeFloor(floorList[0].id); // 지도를 입력한 층 아이디에 맞는 층으로 전환합니다.
            };
            floorChangedTest_2F();
            setTimeout(() => {
                floorChangedTest_11F();
            }, 2000);
        };
        const setting = {
            focustestpoi1: focustestpoi1,
        };
        gui.add(setting, 'focustestpoi1');
    }

    initfocustestpoi2(gui) {
        const focustestpoi2 = async (value) => {
            const floorChangedTest_2F = async () => {
                this.mapContainer.addEventListener('floor-changed', (e) => {
                    console.log('floor changed 에 대한 결과값', e.detail);
                    this.map.control.focusTo({
                        focus: {
                            type: 'POI_ALL',
                            ids: [],
                        },
                        transition: true,
                        padding: {
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                        },
                    });
                });
                await this.map.context.changeFloor(this.floorList[0].id); // 지도를 입력한 층 아이디에 맞는 층으로 전환합니다.
            };
            const floorChangedTest_11F = async () => {
                this.mapContainer.addEventListener('floor-changed', (e) => {
                    console.log('floor changed 에 대한 결과값', e.detail);
                    this.map.control.focusTo({
                        focus: {
                            type: 'POI_ALL',
                            ids: [],
                        },
                        transition: true,
                        padding: {
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                        },
                    });
                });
                await this.map.context.changeFloor(this.floorList[1].id); // 지도를 입력한 층 아이디에 맞는 층으로 전환합니다.
            };
            floorChangedTest_2F();
            setTimeout(() => {
                floorChangedTest_11F();
            }, 2000);
        };
        const setting = {
            focustestpoi2: focustestpoi2,
        };
        gui.add(setting, 'focustestpoi2');
    }

    initfocustestpoi3(gui) {
        const focustestpoi3 = async (value) => {
            const floorChangedTest_2F = async () => {
                this.mapContainer.addEventListener('floor-changed', (e) => {
                    const second = this.mapData.dataObject.getObjects(floorList[1].id);
                    console.log('floor changed 에 대한 결과값', e.detail);
                    this.map.control.focusTo({
                        focus: {
                            type: 'POI',
                            ids: [second[5].id, second[4].id, second[2].id],
                        },
                        transition: true,
                        padding: {
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                        },
                    });
                });
                await this.map.context.changeFloor(this.floorList[1].id); // 지도를 입력한 층 아이디에 맞는 층으로 전환합니다.
            };
            const floorChangedTest_11F = async () => {
                this.mapContainer.addEventListener('floor-changed', (e) => {
                    const first = this.mapData.dataObject.getObjects(floorList[0].id);
                    console.log('floor changed 에 대한 결과값', e.detail);
                    this.map.control.focusTo({
                        focus: {
                            type: 'POI',
                            ids: [first[5].id, first[4].id, first[2].id],
                        },
                        transition: true,
                        padding: {
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                        },
                    });
                });
                await this.map.context.changeFloor(this.floorList[0].id); // 지도를 입력한 층 아이디에 맞는 층으로 전환합니다.
            };
            floorChangedTest_2F();
            setTimeout(() => {
                floorChangedTest_11F();
            }, 2000);
        };
        const setting = {
            focustestpoi3: focustestpoi3,
        };
        gui.add(setting, 'focustestpoi3');
    }
    obpadding(gui) {
        const obpadding = async (value) => {
            const Option = {
                color: '#00ffff',
                ids: [this.objectList[3]],
                activeDest: true,
                opacity: 0.3,
                duration: 1000,
                isRepeat: true,
                isYoyo: true,
                isAnimate: true,
            };
            // map.objects.set(Option
            this.map.objects.set(Option);
            const objecttop = async () => {
                this.map.control.focusTo({
                    focus: {
                        type: 'OBJECT',
                        ids: [this.objectList[3]],
                    },
                    transition: true,
                    padding: {
                        top: 1000,
                        left: 0,
                        bottom: 0,
                        right: 0,
                    },
                });
            };
            const objectleft = async () => {
                this.map.control.focusTo({
                    focus: {
                        type: 'OBJECT',
                        ids: [this.objectList[3]],
                    },
                    transition: true,
                    padding: {
                        top: 0,
                        left: 1000,
                        bottom: 0,
                        right: 0,
                    },
                });
            };
            const objectbottom = async () => {
                this.map.control.focusTo({
                    focus: {
                        type: 'OBJECT',
                        ids: [this.objectList[3]],
                    },
                    transition: true,
                    padding: {
                        top: 0,
                        left: 0,
                        bottom: 1000,
                        right: 0,
                    },
                });
            };
            const objectright = async () => {
                this.map.control.focusTo({
                    focus: {
                        type: 'OBJECT',
                        ids: [this.objectList[3]],
                    },
                    transition: true,
                    padding: {
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 1000,
                    },
                });
            };
            objecttop();
            setTimeout(() => {
                objectleft();
            }, 3000);
            setTimeout(() => {
                objectbottom();
            }, 6000);
            setTimeout(() => {
                objectright();
                this.map.objects.reset();
            }, 9000);
        };
        const setting = {
            obpadding: obpadding,
        };
        gui.add(setting, 'obpadding');
    }
    poipadding(gui) {
        const poipadding = async (value) => {
            const Option = {
                color: '#00ffff',
                ids: [this.objectList[3]],
                activeDest: true,
                opacity: 0.3,
                duration: 1000,
                isRepeat: true,
                isYoyo: true,
                isAnimate: true,
            };
            // map.objects.set(Option
            this.map.objects.set(Option);
            const poitop = async () => {
                this.map.control.focusTo({
                    focus: {
                        type: 'POI',
                        ids: [this.poiList[3]],
                    },
                    transition: true,
                    padding: {
                        top: 1000,
                        left: 0,
                        bottom: 0,
                        right: 0,
                    },
                });
            };
            const poileft = async () => {
                this.map.control.focusTo({
                    focus: {
                        type: 'POI',
                        ids: [this.poiList[3]],
                    },
                    transition: true,
                    padding: {
                        top: 0,
                        left: 1000,
                        bottom: 0,
                        right: 0,
                    },
                });
            };
            const poibottom = async () => {
                this.map.control.focusTo({
                    focus: {
                        type: 'POI',
                        ids: [this.poiList[3]],
                    },
                    transition: true,
                    padding: {
                        top: 0,
                        left: 0,
                        bottom: 1000,
                        right: 0,
                    },
                });
            };
            const poiright = async () => {
                this.map.control.focusTo({
                    focus: {
                        type: 'POI',
                        ids: [this.poiList[3]],
                    },
                    transition: true,
                    padding: {
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 1000,
                    },
                });
            };
            poitop();
            setTimeout(() => {
                poileft();
            }, 3000);
            setTimeout(() => {
                poibottom();
            }, 6000);
            setTimeout(() => {
                poiright();
            }, 9000);
        };
        const setting = {
            poipadding: poipadding,
        };
        gui.add(setting, 'poipadding');
    }
    navpadding(gui) {
        const navpadding = async (value) => {
            const floorList = this.mapData.dataFloor.getFloors();

            const route = {
                origin: {
                    position: { x: 2068, y: 1467, z: 50 },
                    floorId: floorList[0].id,
                },
                destination: {
                    position: { x: 4393, y: 1332, z: 50 },
                    floorId: floorList[0].id,
                },
                type: ['recommendation'],
            };
            const naviOption = {
                lineZ: 100, // 주행선의 z축 값을 지정합니다.
                lineDivide: true, // 주행선을 경유지 기준으로 분할 여부를 결정합니다.
                defaultLineOption: {
                    lineColor: '#0000ff', // navigation 주행 라인의 색상을 지정
                    lineSpotSize: 10,
                    lineSpotInterval: 10,
                    lineSpotCount: 10,
                    lineSpotAnimate: true,
                    lineSpotAnimateSpeed: 0.1,
                },
            };
            const naviResponse = await this.mapData.getRoute(route);
            await this.map.routeSimulation.set(naviResponse.recommendation, naviOption);
            const navtop = async () => {
                this.map.control.focusTo({
                    focus: {
                        type: 'NAVIGATION',
                    },
                    transition: true,
                    padding: {
                        top: 10000,
                        left: 0,
                        bottom: 0,
                        right: 0,
                    },
                });
            };
            const navleft = async () => {
                this.map.control.focusTo({
                    focus: {
                        type: 'NAVIGATION',
                    },
                    transition: true,
                    padding: {
                        top: 0,
                        left: 10000,
                        bottom: 0,
                        right: 0,
                    },
                });
            };
            const navbottom = async () => {
                this.map.control.focusTo({
                    focus: {
                        type: 'NAVIGATION',
                    },
                    transition: true,
                    padding: {
                        top: 0,
                        left: 0,
                        bottom: 10000,
                        right: 0,
                    },
                });
            };
            const navright = async () => {
                this.map.control.focusTo({
                    focus: {
                        type: 'NAVIGATION',
                    },
                    transition: true,
                    padding: {
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 10000,
                    },
                });
            };
            navtop();
            setTimeout(() => {
                navleft();
            }, 3000);
            setTimeout(() => {
                navbottom();
            }, 6000);
            setTimeout(() => {
                navright();
            }, 9000);
        };
        const setting = {
            navpadding: navpadding,
        };
        gui.add(setting, 'navpadding');
    }
}
