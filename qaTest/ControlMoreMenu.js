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
}
