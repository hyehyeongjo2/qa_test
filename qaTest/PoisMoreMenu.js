export class PoisMoreMenu {
    constructor() {
        this.mapData = null;
        this.map = null;
        this.mapContainer = null;
        this.menu = null;
        this.poiList = null;
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
        this.initMoreSetting();
        const currentFloor = this.map.context.getCurrentFloor().id;
        this.poiList = this.mapData.dataPoi.getPois().reduce(
            (result, cur) => {
                if (currentFloor == cur.floorId) result.push(cur.id);
                return result;
            },
            [''],
        );

        return this.menu;
    }

    initMoreSetting() {
        const setting = {
            single_h_to_s: this.single_h_to_s.bind(this),
            arr_h_to_s: this.arr_h_to_s.bind(this),
            all_h_to_s: this.all_h_to_s.bind(this),
            single_s_to_h: this.single_s_to_h.bind(this),
            arr_s_to_h: this.arr_s_to_h.bind(this),
            all_s_to_h: this.all_s_to_h.bind(this),
            getCurrent: this.getCurrent.bind(this),
            // distense: this.initGetCategoryDistance.bind(this),
        };

        const menu = this.menu;
        menu.add(setting, 'single_h_to_s');
        menu.add(setting, 'arr_h_to_s');
        menu.add(setting, 'all_h_to_s');
        menu.add(setting, 'single_s_to_h');
        menu.add(setting, 'arr_s_to_h');
        menu.add(setting, 'all_s_to_h');
        menu.add(setting, 'getCurrent');
        // menu.add(setting, 'distense');
    }

    single_h_to_s(value) {
        const option = {
            outerColor: 'black',
            innerColor: 'red',
            scale: 3,
            ids: this.poiList[1],
        };
        console.log(this.poiList[1]);
        this.map.pois.set(option);
        setTimeout(() => {
            this.map.pois.hide(this.poiList[1]);
            console.log('hide');
        }, 1000);
        setTimeout(() => {
            this.map.pois.show(this.poiList[1]);
            console.log('show');
        }, 3000);
        setTimeout(() => {
            this.map.pois.hide(this.poiList[1]);
            console.log('hide');
        }, 5000);
        setTimeout(() => {
            this.map.pois.show([this.poiList[1], this.poiList[2], this.poiList[3]]);
            console.log('show');
        }, 7000);
        setTimeout(() => {
            this.map.pois.hide(this.poiList[1]);
            console.log('hide');
        }, 9000);
        setTimeout(() => {
            this.map.pois.show();
            console.log('show');
        }, 11000);
        setTimeout(() => {
            this.map.pois.reset();
        }, 12000);
    }

    arr_h_to_s(value) {
        const option = {
            ids: [this.poiList[1], this.poiList[2], this.poiList[3]],
            outerColor: 'black',
            innerColor: 'red',
            scale: 3,
        };
        this.map.pois.set(option);
        setTimeout(() => {
            this.map.pois.hide([this.poiList[1], this.poiList[2], this.poiList[3]]);
            console.log('hide');
        }, 1000);
        setTimeout(() => {
            this.map.pois.show(this.poiList[1]);
            console.log('show');
        }, 3000);
        setTimeout(() => {
            this.map.pois.hide([this.poiList[1], this.poiList[2], this.poiList[3]]);
            console.log('hide');
        }, 5000);
        setTimeout(() => {
            this.map.pois.show([this.poiList[1], this.poiList[2], this.poiList[3]]);
            console.log('show');
        }, 7000);
        setTimeout(() => {
            this.map.pois.hide([this.poiList[1], this.poiList[2], this.poiList[3]]);
            console.log('hide');
        }, 9000);
        setTimeout(() => {
            this.map.pois.show();
            console.log('show');
        }, 11000);
        setTimeout(() => {
            this.map.pois.reset();
        }, 12000);
    }

    all_h_to_s(value) {
        const option = {
            // ids: [this.poiList[1],this.poiList[2],this.poiList[3]] ,
            outerColor: 'black',
            innerColor: 'red',
            scale: 3,
        };
        this.map.pois.set(option);
        setTimeout(() => {
            this.map.pois.hide();
            console.log('hide');
        }, 1000);
        setTimeout(() => {
            this.map.pois.show(this.poiList[1]);
            console.log('show');
        }, 3000);
        setTimeout(() => {
            this.map.pois.hide();
            console.log('hide');
        }, 5000);
        setTimeout(() => {
            this.map.pois.show([this.poiList[1], this.poiList[2], this.poiList[3]]);
            console.log('show');
        }, 7000);
        setTimeout(() => {
            this.map.pois.hide();
            console.log('hide');
        }, 9000);
        setTimeout(() => {
            this.map.pois.show();
            console.log('show');
        }, 11000);
        setTimeout(() => {
            this.map.pois.reset();
        }, 12000);
    }

    single_s_to_h(value) {
        const option = {
            ids: [this.poiList[1]],
            outerColor: 'black',
            innerColor: 'red',
            scale: 3,
        };
        setTimeout(() => {
            this.map.pois.set(option);
        }, 1000);
        setTimeout(() => {
            this.map.pois.reset(this.poiList[1]);
            console.log('single');
        }, 3000);
        setTimeout(() => {
            this.map.pois.set(option);
        }, 4000);
        setTimeout(() => {
            this.map.pois.reset([this.poiList[1], this.poiList[2], this.poiList[3]]);
            console.log('arr');
        }, 5000);
        setTimeout(() => {
            this.map.pois.set(option);
        }, 7000);
        setTimeout(() => {
            this.map.pois.reset();
            console.log('all');
        }, 8000);
    }

    arr_s_to_h(value) {
        const option = {
            ids: [this.poiList[1], this.poiList[2], this.poiList[3]],
            outerColor: 'black',
            innerColor: 'red',
            scale: 3,
        };
        setTimeout(() => {
            this.map.pois.set(option);
        }, 1000);
        setTimeout(() => {
            this.map.pois.reset(this.poiList[1]);
            console.log('single');
        }, 3000);
        setTimeout(() => {
            this.map.pois.set(option);
        }, 4000);
        setTimeout(() => {
            this.map.pois.reset([this.poiList[1], this.poiList[2], this.poiList[3]]);
            console.log('arr');
        }, 5000);
        setTimeout(() => {
            this.map.pois.set(option);
        }, 7000);
        setTimeout(() => {
            this.map.pois.reset();
            console.log('all');
        }, 8000);
    }

    all_s_to_h(value) {
        const option = {
            // ids: [this.poiList[1]] ,
            outerColor: 'black',
            innerColor: 'red',
            scale: 3,
        };
        setTimeout(() => {
            this.map.pois.set(option);
        }, 1000);
        setTimeout(() => {
            this.map.pois.reset(this.poiList[1]);
            console.log('single');
        }, 3000);
        setTimeout(() => {
            this.map.pois.set(option);
        }, 4000);
        setTimeout(() => {
            this.map.pois.reset([this.poiList[1], this.poiList[2], this.poiList[3]]);
            console.log('arr');
        }, 5000);
        setTimeout(() => {
            this.map.pois.set(option);
        }, 7000);
        setTimeout(() => {
            this.map.pois.reset();
            console.log('all');
        }, 8000);
    }
    getCurrent() {
        const option = {
            isVisible: true,
            sortOption: {
                center: { x: 0, y: 0, z: 0 },
                byAsc: true,
            },
        };
        const pois = this.map.pois.getCurrentPois(option);
        console.log('현재 화면 안에서 보여지고 있는 pois, isVisible: true, x: 0, y: 0:, byAsc: true ', pois);
        pois?.forEach((poi) => {
            console.log('poi title : ', poi.title);
        });
        const option2 = {
            isVisible: true,
            sortOption: {
                center: { x: 0, y: 0, z: 0 },
                byAsc: false,
            },
        };
        const pois2 = this.map.pois.getCurrentPois(option2);
        console.log('현재 화면 안에서 보여지고 있는 pois, isVisible: true, x: 0, y: 0:, byAsc: false ', pois2);
        pois2?.forEach((poi) => {
            console.log('poi title : ', poi.title);
        });
        const option3 = {
            isVisible: true,
            sortOption: {
                center: { x: 6000, y: 6000, z: 0 },
                byAsc: true,
            },
        };
        const pois3 = this.map.pois.getCurrentPois(option3);
        console.log('현재 화면 안에서 보여지고 있는 pois, isVisible: true, x: 6000, y: 6000:, byAsc: true ', pois3);
        pois3?.forEach((poi) => {
            console.log('poi title : ', poi.title);
        });
        this.map.control.set({ zoom: 21, rotation: 0, tilt: 80, transition: false });
        setTimeout(() => {
            const option4 = {
                isVisible: true,
                sortOption: {
                    center: { x: 0, y: 0, z: 0 },
                    byAsc: true,
                },
            };
            const pois4 = this.map.pois.getCurrentPois(option4);
            console.log('현재 화면 안에서 보여지고 있는 pois, isVisible: true, x: 0, y: 0:, byAsc: true ', pois4);
            pois4?.forEach((poi) => {
                console.log('poi title : ', poi.title);
            });
        }, 2000);
        setTimeout(() => {
            const option5 = {
                isVisible: false,
                sortOption: {
                    center: { x: 0, y: 0, z: 0 },
                    byAsc: true,
                },
            };
            const pois5 = this.map.pois.getCurrentPois(option5);
            console.log('현재 화면 안에서 보여지고 있는 pois, isVisible: true, x: 0, y: 0:, byAsc: false ', pois5);
            pois5?.forEach((poi) => {
                console.log('poi title : ', poi.title);
            });
        }, 4000);
    }
    // async initGetCategoryDistance() {
    //     // const { mapData, map } = arg;
    //     const floorList = this.mapData.dataFloor.getFloors();

    //     const option = {
    //         position: { x: 3000, y: 1000 },
    //         floorId: floorList[1], // 11층
    //     };
    //     const categoryCode = {
    //         refund: 'S011',
    //         elevator: 'S001',
    //         restRoom: 'S002',
    //         escalator: 'S003',
    //         helpDesk: 'S004',
    //         keepCarrier: 'S005',
    //         nursuryRoom: 'S008',
    //         customerService: 'S009',
    //         exchange: 'S010',
    //     };
    //     const pois = await this.mapData.getCategoryDistance(option, categoryCode.restRoom);
    //     if (!pois) return;
    //     console.log(pois);
    //     const poisList = pois.map((poi) => {
    //         return { x: poi.position.x, y: poi.position.y, floorId: poi.floorId };
    //     });
    //     console.log(poisList);

    //     const optionMarker = {
    //         marker: poisList,
    //     };
    //     map.markers.set(optionMarker);
    // }
}
