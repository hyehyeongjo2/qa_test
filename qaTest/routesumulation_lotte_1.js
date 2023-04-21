export class routesumulation_lotte_1 {
    constructor() {
        this.mapData = null;
        this.map = null;
        this.mapContainer = null;
        this.menu = null;
        this.setting = null;
        this.poiList = null;
        this.complete = null;
        this.naviOption = {
            lineZ: 10, // 주행선의 z축 값을 지정합니다.
            lineDivide: false, // 주행선을 경유지 기준으로 분할 여부를 결정합니다.
            defaultLineOption: {
                lineColor: '#0000ff',
                solidLineEnabled: true, // 주행라인의 속성을 결정합니다. false일 때는 점선, true일 때는 실선으로 그려집니다. default는 false.
                solidLineWidth: 10,
            },
            origin: {
                // 출발지 마커 옵션
                markerOptions: {
                    // 출발지 마커 옵션
                    // iconUrl: string,                                  // 출발지 마커 이미지 url
                    width: 50, // 출발지 마커 width
                    height: 50, // 출발지 마커 height
                    positionZ: 10, // 출발지 마커 높이
                    visibleIcon: true, // 출발지 마커 보여줄지 말지 여부. default 는 true.
                    anchor: {
                        x: 1,
                        y: 0.5,
                    },
                },
            },
            destination: {
                // 도착지 마커 및 주행선 옵션
                showTag: true, // 도착지 말풍선 생성 여부 (기본값 true)
                markerOptions: {
                    // 도착지 마커 옵션 (출발지 마커 옵션과 동일)
                    // iconUrl: string,
                    width: 50,
                    height: 50,
                    positionZ: 10,
                    visibleIcon: true,
                },
            },
            wayPoints: [
                // 경유지 마커 및 주행선 옵션 배열
                {
                    markerOptions: {
                        width: 50,
                        height: 50,
                        positionZ: 10,
                        visibleIcon: false,
                    },
                },
            ],
        };
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
        this.menu = menu.addFolder('롯데_타임빌라스');
        this.menu1 = this.menu.addFolder('계단');
        this.menu2 = this.menu.addFolder('엘리베이터');
        this.menu3 = this.menu.addFolder('에스컬레이터');
        this.initMoreSetting();
        return this.menu;
    }
    initMoreSetting() {
        const setting = {
            stair_1_2_3: this.stair_1_2_3.bind(this),
            stair_1_2_1: this.stair_1_2_1.bind(this),
            st_es_1_2_3: this.st_es_1_2_3.bind(this),
            st_ev_1_2_3: this.st_ev_1_2_3.bind(this),
            st_es_1_2_1: this.st_es_1_2_1.bind(this),
            st_ev_1_2_1: this.st_ev_1_2_1.bind(this),
            ev_1_2_3: this.ev_1_2_3.bind(this),
            ev_1_2_1: this.ev_1_2_1.bind(this),
            ev_es_1_2_3: this.ev_es_1_2_3.bind(this),
            ev_st_1_2_3: this.ev_st_1_2_3.bind(this),
            ev_es_1_2_1: this.ev_es_1_2_1.bind(this),
            ev_st_1_2_1: this.ev_st_1_2_1.bind(this),
            es_1_2_3: this.es_1_2_3.bind(this),
            es_1_2_1: this.es_1_2_1.bind(this),
            es_ev_1_2_3: this.es_ev_1_2_3.bind(this),
            es_st_1_2_3: this.es_st_1_2_3.bind(this),
            es_ev_1_2_1: this.es_ev_1_2_1.bind(this),
            es_st_1_2_1: this.es_st_1_2_1.bind(this),
        };
        const menu1 = this.menu1;
        const menu2 = this.menu2;
        const menu3 = this.menu3;
        menu1.add(setting, 'stair_1_2_3');
        menu1.add(setting, 'stair_1_2_1');
        menu1.add(setting, 'st_es_1_2_3');
        menu1.add(setting, 'st_ev_1_2_3');
        menu1.add(setting, 'st_es_1_2_1');
        menu1.add(setting, 'st_ev_1_2_1');
        menu2.add(setting, 'ev_1_2_3');
        menu2.add(setting, 'ev_1_2_1');
        menu2.add(setting, 'ev_es_1_2_3');
        menu2.add(setting, 'ev_st_1_2_3');
        menu2.add(setting, 'ev_es_1_2_1');
        menu2.add(setting, 'ev_st_1_2_1');
        menu3.add(setting, 'es_1_2_3');
        menu3.add(setting, 'es_1_2_1');
        menu3.add(setting, 'es_ev_1_2_3');
        menu3.add(setting, 'es_st_1_2_3');
        menu3.add(setting, 'es_ev_1_2_1');
        menu3.add(setting, 'es_st_1_2_1');
    }
    async stair_1_2_3() {
        const route = {
            origin: {
                poiId: 'PO-DZsPBGU6p7621',
                floorId: 'FL-u7ojaau871h46979',
            },
            destination: {
                poiId: 'PO-H-EM7ADdZ3158',
                floorId: 'FL-r1a3h556yx5t7014',
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: 'PO-JH3JwAhcP1864',
                    floorId: 'FL-skmrtag6wq5i7051',
                },
            ],
        };
        const naviOption = this.naviOption;
        const naviResponse = await this.mapData.getRoute(route);
        await this.map.routeSimulation.set(naviResponse.recommendation, naviOption);
    }
    async stair_1_2_1() {
        const route = {
            origin: {
                poiId: 'PO-JH3JwAhcP1864',
                floorId: 'FL-skmrtag6wq5i7051',
            },
            destination: {
                poiId: 'PO-1CunkPRh-7411',
                floorId: 'FL-skmrtag6wq5i7051',
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: 'PO-H-EM7ADdZ3158',
                    floorId: 'FL-r1a3h556yx5t7014',
                },
            ],
        };
        const naviOption = this.naviOption;
        const naviResponse = await this.mapData.getRoute(route);
        await this.map.routeSimulation.set(naviResponse.recommendation, naviOption);
    }
    async st_es_1_2_3() {
        const route = {
            origin: {
                poiId: 'PO-DZsPBGU6p7621',
                floorId: 'FL-u7ojaau871h46979',
            },
            destination: {
                poiId: 'PO-Y6bSILslT0087',
                floorId: 'FL-r1a3h556yx5t7014',
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: 'PO-D4FybNMUs8388',
                    floorId: 'FL-skmrtag6wq5i7051',
                },
            ],
        };
        const naviOption = this.naviOption;
        const naviResponse = await this.mapData.getRoute(route);
        await this.map.routeSimulation.set(naviResponse.recommendation, naviOption);
    }
    async st_ev_1_2_3() {
        const route = {
            origin: {
                poiId: 'PO-DZsPBGU6p7621',
                floorId: 'FL-u7ojaau871h46979',
            },
            destination: {
                poiId: 'PO-H-EM7ADdZ3158',
                floorId: 'FL-r1a3h556yx5t7014',
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: 'PO-D4FybNMUs8388',
                    floorId: 'FL-skmrtag6wq5i7051',
                },
            ],
        };
        const naviOption = this.naviOption;
        const naviResponse = await this.mapData.getRoute(route);
        await this.map.routeSimulation.set(naviResponse.recommendation, naviOption);
    }
    async st_es_1_2_1() {
        const route = {
            origin: {
                poiId: 'PO-1CunkPRh-7411',
                floorId: 'FL-skmrtag6wq5i7051',
            },
            destination: {
                poiId: 'PO-pjtrvmCxN7226',
                floorId: 'FL-skmrtag6wq5i7051',
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: 'PO-_-THydP_44278',
                    floorId: 'FL-r1a3h556yx5t7014',
                },
            ],
        };
        const naviOption = this.naviOption;
        const naviResponse = await this.mapData.getRoute(route);
        await this.map.routeSimulation.set(naviResponse.recommendation, naviOption);
    }
    async st_ev_1_2_1() {
        const route = {
            origin: {
                poiId: 'PO-1CunkPRh-7411',
                floorId: 'FL-skmrtag6wq5i7051',
            },
            destination: {
                poiId: 'PO-xql3SQqUO8899',
                floorId: 'FL-skmrtag6wq5i7051',
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: 'PO-_-THydP_44278',
                    floorId: 'FL-r1a3h556yx5t7014',
                },
            ],
        };
        const naviOption = this.naviOption;
        const naviResponse = await this.mapData.getRoute(route);
        await this.map.routeSimulation.set(naviResponse.recommendation, naviOption);
    }
    async ev_1_2_1() {
        const route = {
            origin: {
                poiId: 'PO-lNTN-_mB97875',
                floorId: 'FL-skmrtag6wq5i7051',
            },
            destination: {
                poiId: 'PO-_q1gOYQZm5492',
                floorId: 'FL-skmrtag6wq5i7051',
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: 'PO-3_gbsAso_9425',
                    floorId: 'FL-r1a3h556yx5t7014',
                },
            ],
        };
        const naviOption = this.naviOption;
        const naviResponse = await this.mapData.getRoute(route);
        await this.map.routeSimulation.set(naviResponse.recommendation, naviOption);
    }
    async ev_1_2_3() {
        const route = {
            origin: {
                poiId: 'PO-280wKNjuS1810',
                floorId: 'FL-u7ojaau871h46979',
            },
            destination: {
                poiId: 'PO-rx-AsgeA_0523',
                floorId: 'FL-r1a3h556yx5t7014',
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: 'PO-xql3SQqUO8899',
                    floorId: 'FL-skmrtag6wq5i7051',
                },
            ],
        };
        const naviOption = this.naviOption;
        const naviResponse = await this.mapData.getRoute(route);
        await this.map.routeSimulation.set(naviResponse.recommendation, naviOption);
    }
    async ev_es_1_2_1() {
        const route = {
            origin: {
                poiId: 'PO-lNTN-_mB97875',
                floorId: 'FL-skmrtag6wq5i7051',
            },
            destination: {
                poiId: 'PO-Q3xMVHPFk3821',
                floorId: 'FL-skmrtag6wq5i7051',
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: 'PO-JsWR4Pb5z5014',
                    floorId: 'FL-r1a3h556yx5t7014',
                },
            ],
        };
        const naviOption = this.naviOption;
        const naviResponse = await this.mapData.getRoute(route);
        await this.map.routeSimulation.set(naviResponse.recommendation, naviOption);
    }
    async ev_st_1_2_1() {
        const route = {
            origin: {
                poiId: 'PO-xql3SQqUO8899',
                floorId: 'FL-skmrtag6wq5i7051',
            },
            destination: {
                poiId: 'PO-JH3JwAhcP1864',
                floorId: 'FL-skmrtag6wq5i7051',
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: 'PO-H-EM7ADdZ3158',
                    floorId: 'FL-r1a3h556yx5t7014',
                },
            ],
        };
        const naviOption = this.naviOption;
        const naviResponse = await this.mapData.getRoute(route);
        await this.map.routeSimulation.set(naviResponse.recommendation, naviOption);
    }
    async ev_st_1_2_3() {
        const route = {
            origin: {
                poiId: 'PO-280wKNjuS1810',
                floorId: 'FL-u7ojaau871h46979',
            },
            destination: {
                poiId: 'PO-H-EM7ADdZ3158',
                floorId: 'FL-r1a3h556yx5t7014',
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: 'PO-C3OOKWInX4262',
                    floorId: 'FL-skmrtag6wq5i7051',
                },
            ],
        };
        const naviOption = this.naviOption;
        const naviResponse = await this.mapData.getRoute(route);
        await this.map.routeSimulation.set(naviResponse.recommendation, naviOption);
    }
    async ev_es_1_2_3() {
        const route = {
            origin: {
                poiId: 'PO-280wKNjuS1810',
                floorId: 'FL-u7ojaau871h46979',
            },
            destination: {
                poiId: 'PO-Y6bSILslT0087',
                floorId: 'FL-r1a3h556yx5t7014',
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: 'PO-m-8ChsdBj8624',
                    floorId: 'FL-skmrtag6wq5i7051',
                },
            ],
        };
        const naviOption = this.naviOption;
        const naviResponse = await this.mapData.getRoute(route);
        await this.map.routeSimulation.set(naviResponse.recommendation, naviOption);
    }
    async es_1_2_1() {
        const route = {
            origin: {
                poiId: 'PO-JH3JwAhcP1864',
                floorId: 'FL-skmrtag6wq5i7051',
            },
            destination: {
                poiId: 'PO-1CunkPRh-7411',
                floorId: 'FL-skmrtag6wq5i7051',
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: 'PO-Y6bSILslT0087',
                    floorId: 'FL-r1a3h556yx5t7014',
                },
            ],
        };
        const naviOption = this.naviOption;
        const naviResponse = await this.mapData.getRoute(route);
        await this.map.routeSimulation.set(naviResponse.recommendation, naviOption);
    }
    async es_1_2_3() {
        const route = {
            origin: {
                poiId: 'PO-SAz0xgvyS7227',
                floorId: 'FL-u7ojaau871h46979',
            },
            destination: {
                poiId: 'PO-Y6bSILslT0087',
                floorId: 'FL-r1a3h556yx5t7014',
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: 'PO-m-8ChsdBj8624',
                    floorId: 'FL-skmrtag6wq5i7051',
                },
            ],
        };
        const naviOption = this.naviOption;
        const naviResponse = await this.mapData.getRoute(route);
        await this.map.routeSimulation.set(naviResponse.recommendation, naviOption);
    }
    async es_st_1_2_1() {
        const route = {
            origin: {
                poiId: 'PO-c8TbLsHN-4852',
                floorId: 'FL-skmrtag6wq5i7051',
            },
            destination: {
                poiId: 'PO-JH3JwAhcP1864',
                floorId: 'FL-skmrtag6wq5i7051',
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: 'PO-H-EM7ADdZ3158',
                    floorId: 'FL-r1a3h556yx5t7014',
                },
            ],
        };
        const naviOption = this.naviOption;
        const naviResponse = await this.mapData.getRoute(route);
        await this.map.routeSimulation.set(naviResponse.recommendation, naviOption);
    }
    async es_ev_1_2_1() {
        const route = {
            origin: {
                poiId: 'PO-xql3SQqUO8899',
                floorId: 'FL-skmrtag6wq5i7051',
            },
            destination: {
                poiId: 'PO-Nv1Eqv93i1027',
                floorId: 'FL-skmrtag6wq5i7051',
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: 'PO-Y6bSILslT0087',
                    floorId: 'FL-r1a3h556yx5t7014',
                },
            ],
        };
        const naviOption = this.naviOption;
        const naviResponse = await this.mapData.getRoute(route);
        await this.map.routeSimulation.set(naviResponse.recommendation, naviOption);
    }
    async es_ev_1_2_3() {
        const route = {
            origin: {
                poiId: 'PO-bVxa51AdU0359',
                floorId: 'FL-u7ojaau871h46979',
            },
            destination: {
                poiId: 'PO-rx-AsgeA_0523',
                floorId: 'FL-r1a3h556yx5t7014',
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: 'PO-Nv1Eqv93i1027',
                    floorId: 'FL-skmrtag6wq5i7051',
                },
            ],
        };
        const naviOption = this.naviOption;
        const naviResponse = await this.mapData.getRoute(route);
        await this.map.routeSimulation.set(naviResponse.recommendation, naviOption);
    }
    async es_st_1_2_3() {
        const route = {
            origin: {
                poiId: 'PO-bVxa51AdU0359',
                floorId: 'FL-u7ojaau871h46979',
            },
            destination: {
                poiId: 'PO-H-EM7ADdZ3158',
                floorId: 'FL-r1a3h556yx5t7014',
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: 'PO-Nv1Eqv93i1027',
                    floorId: 'FL-skmrtag6wq5i7051',
                },
            ],
        };
        const naviOption = this.naviOption;
        const naviResponse = await this.mapData.getRoute(route);
        await this.map.routeSimulation.set(naviResponse.recommendation, naviOption);
    }
}
