export class ControlMorePaddingMenu {
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
        this.obpadding(this.paddingtest);
        this.poipadding(this.paddingtest);
        this.navpadding(this.paddingtest);
        return this.menu;
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
                        top: 1000,
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
                        left: 1000,
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
                        bottom: 1000,
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
                        right: 1000,
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
