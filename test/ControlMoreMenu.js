export class ControlMoreMenu {
    constructor() {
        this.mapData = null;
        this.map = null;
        this.mapContainer = null;
        this.menu = null;
    }
    removeMenu() {
        if (this.menu) {
            this.gui.removeFolder(this.menu);
            this.menu = null;
        }
    }
    init(menu, mapData, map, mapContainer) {
        this.mapData = mapData;
        this.map = map;
        this.mapContainer = mapContainer;
        this.menu = menu.addFolder('More');
        this.fpoi = menu.addFolder('fpoi');
        this.fob = menu.addFolder('fob');

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
        return this.menu;
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
                this.map.control.zoomIn({ transition: true });
            }, 6000);
            setTimeout(() => {
                this.map.control.changeZoom({ zoom: 24 });
                this.map.control.zoomOut({ transition: true });
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

    initMtest(gui) {
        const Mtest = (value) => {
            const option = {
                transition: true,
                position: { x: 1000, y: 1000 },
            };
            const option2 = {
                transition: true,
                position: { x: 2000, y: 2000 },
            };
            const option3 = {
                transition: true,
                position: { x: 1000, y: 1000 },
            };
            const option4 = {
                transition: true,
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

    initfocustestob1(gui) {
        const focustestob1 = async (value) => {
            const floorChangedTest_2F = async () => {
                this.mapContainer.addEventListener('floor-changed', (e) => {
                    console.log('floor changed 에 대한 결과값', e.detail);
                    this.map.control.focusTo({
                        focus: {
                            type: 'OBJECT',
                            ids: ['OB-u-GoTosOj64029'],
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
                            type: 'OBJECT',
                            ids: ['OB-3Uf1pIZXd2409'],
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
                            type: 'OBJECT',
                            ids: [],
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
                            type: 'OBJECT',
                            ids: [],
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
            }, 2000);
        };
        const setting = {
            focustestob2: focustestob2,
        };
        gui.add(setting, 'focustestob2');
    }

    initfocustestob3(gui) {
        const focustestob3 = async (value) => {
            const floorChangedTest_2F = async () => {
                this.mapContainer.addEventListener('floor-changed', (e) => {
                    console.log('floor changed 에 대한 결과값', e.detail);
                    this.map.control.focusTo({
                        focus: {
                            type: 'OBJECT',
                            // ids: []
                            //ids : OB-3PdRZ1rzi5625- 2층계단, OB-u-GoTosOj64029-남자화장실, OB-EwYTaOTNj4029- 화장실-여
                            ids: ['OB-9-3QKxtuSO8077', 'OB-saqgik_0l4094', 'OB-EwYTaOTNj4029'],
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
                            type: 'OBJECT',
                            // ids: []
                            //ids : OB-3PdRZ1rzi5625- 2층계단, OB-u-GoTosOj64029-남자화장실, OB-EwYTaOTNj4029- 화장실-여
                            ids: ['OB-mxanpdYA1T2410', 'OB-aN7fGeVoze1959', 'OB-ccjURqW8hq1959'],
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
            }, 2000);
        };
        const setting = {
            focustestob3: focustestob3,
        };
        gui.add(setting, 'focustestob3');
    }

    initfocustestpoi1(gui) {
        const focustestpoi1 = async (value) => {
            const floorChangedTest_2F = async () => {
                this.mapContainer.addEventListener('floor-changed', (e) => {
                    console.log('floor changed 에 대한 결과값', e.detail);
                    this.map.control.focusTo({
                        focus: {
                            type: 'POI',
                            ids: ['PO-9InVzIGv20417'],
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
                            type: 'POI',
                            ids: ['PO-4JvSQCWHC2270'],
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
                            type: 'POI',
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
                await this.map.context.changeFloor('FL-vf3q07spbmsw8132'); // 지도를 입력한 층 아이디에 맞는 층으로 전환합니다.
            };
            const floorChangedTest_11F = async () => {
                this.mapContainer.addEventListener('floor-changed', (e) => {
                    console.log('floor changed 에 대한 결과값', e.detail);
                    this.map.control.focusTo({
                        focus: {
                            type: 'POI',
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
                await this.map.context.changeFloor('FL-t4vqgyek3jnb8146'); // 지도를 입력한 층 아이디에 맞는 층으로 전환합니다.
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
                    console.log('floor changed 에 대한 결과값', e.detail);
                    this.map.control.focusTo({
                        focus: {
                            type: 'POI',
                            ids: ['PO-9InVzIGv20417', 'PO-bG8eepPeB2502'],
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
                            type: 'POI',
                            ids: ['PO-4JvSQCWHC2270', 'PO-gy5U7uRVH9908', 'PO-NMvw3E0pe1690'],
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
            }, 2000);
        };
        const setting = {
            focustestpoi3: focustestpoi3,
        };
        gui.add(setting, 'focustestpoi3');
    }
}
