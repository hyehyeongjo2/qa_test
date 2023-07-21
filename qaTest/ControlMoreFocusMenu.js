export class ControlMoreFocusMenu {
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
        this.fpoi = menu.addFolder('fpoi');
        this.fob = menu.addFolder('fob');
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
        this.initfocustestob1(this.fob);
        this.initfocustestob2(this.fob);
        this.initfocustestob3(this.fob);
        this.initfocustestpoi1(this.fpoi);
        this.initfocustestpoi2(this.fpoi);
        this.initfocustestpoi3(this.fpoi);
        return this.menu;
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
}
