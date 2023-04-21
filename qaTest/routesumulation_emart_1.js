export class routesumulation_emart_1 {
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
        this.menu = menu.addFolder('이마트');
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
            ev_1_2_3: this.stair_1_2_3.bind(this),
            ev_1_2_1: this.stair_1_2_1.bind(this),
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
        menu3.add(setting, 'ev_1_2_3');
        menu3.add(setting, 'ev_1_2_1');
        menu3.add(setting, 'ev_es_1_2_3');
        menu3.add(setting, 'ev_st_1_2_3');
        menu3.add(setting, 'ev_es_1_2_1');
        menu3.add(setting, 'ev_st_1_2_1');
    }
    async stair_1_2_3() {
        const route = {
            origin: {
                poiId: 'PO-1OHPs6siRk3966',
                floorId: 'FL-1jekz43tghdur0792',
            },
            destination: {
                poiId: 'PO-RCpobshVV1638',
                floorId: 'FL-1jekyc5imvmg60762',
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: 'PO-CMM0E4hA13389',
                    floorId: 'FL-1hbd6wylclg0x0772',
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
                poiId: 'PO-fuUPZVxbRR5343',
                floorId: 'FL-1jekz43tghdur0792',
            },
            destination: {
                poiId: 'PO-fuUPZVxbRR5343',
                floorId: 'FL-1jekz43tghdur0792',
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: 'PO-C76UiLZls5414',
                    floorId: 'FL-1hbd6wylclg0x0772',
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
                poiId: 'PO-fuUPZVxbRR5343',
                floorId: 'FL-1jekz43tghdur0792',
            },
            destination: {
                poiId: 'PO-z9I48Tz4v5799',
                floorId: 'FL-1jekyc5imvmg60762',
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: 'PO-HNG0cWGRI5109',
                    floorId: 'FL-1hbd6wylclg0x0772',
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
                poiId: 'PO-fuUPZVxbRR5343',
                floorId: 'FL-1jekz43tghdur0792',
            },
            destination: {
                poiId: 'PO-DxSBwbd0D3446',
                floorId: 'FL-1jekyc5imvmg60762',
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: 'PO-HNG0cWGRI5109',
                    floorId: 'FL-1hbd6wylclg0x0772',
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
                poiId: 'PO-fuUPZVxbRR5343',
                floorId: 'FL-1jekz43tghdur0792',
            },
            destination: {
                poiId: 'PO-Z97p22yues4909',
                floorId: 'FL-1jekz43tghdur0792',
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: 'PO-HNG0cWGRI5109',
                    floorId: 'FL-1hbd6wylclg0x0772',
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
                poiId: 'PO-1OHPs6siRk3966',
                floorId: 'FL-1jekz43tghdur0792',
            },
            destination: {
                poiId: 'PO-Idj0LTSIK8640',
                floorId: 'FL-1jekz43tghdur0792',
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: 'PO-6Nh-p84cr6301',
                    floorId: 'FL-1hbd6wylclg0x0772',
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
                poiId: 'PO-Idj0LTSIK8640',
                floorId: 'FL-1jekz43tghdur0792',
            },
            destination: {
                poiId: 'PO-Idj0LTSIK8640',
                floorId: 'FL-1jekz43tghdur0792',
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: 'PO-pLm1HzB3q5173',
                    floorId: 'FL-1hbd6wylclg0x0772',
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
                poiId: 'PO-Idj0LTSIK8640',
                floorId: 'FL-1jekz43tghdur0792',
            },
            destination: {
                poiId: 'PO-RCpobshVV1638',
                floorId: 'FL-1jekyc5imvmg60762',
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: 'PO-pLm1HzB3q5173',
                    floorId: 'FL-1hbd6wylclg0x0772',
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
                poiId: 'PO-Idj0LTSIK8640',
                floorId: 'FL-1jekz43tghdur0792',
            },
            destination: {
                poiId: 'PO-Z97p22yues4909',
                floorId: 'FL-1jekz43tghdur0792',
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: 'PO-HNG0cWGRI5109',
                    floorId: 'FL-1hbd6wylclg0x0772',
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
                poiId: 'PO-Idj0LTSIK8640',
                floorId: 'FL-1jekz43tghdur0792',
            },
            destination: {
                poiId: 'PO-fuUPZVxbRR5343',
                floorId: 'FL-1jekz43tghdur0792',
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: 'PO-C76UiLZls5414',
                    floorId: 'FL-1hbd6wylclg0x0772',
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
                poiId: 'PO-Idj0LTSIK8640',
                floorId: 'FL-1jekz43tghdur0792',
            },
            destination: {
                poiId: 'PO-RCpobshVV1638',
                floorId: 'FL-1jekyc5imvmg60762',
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: 'PO-CMM0E4hA13389',
                    floorId: 'FL-1hbd6wylclg0x0772',
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
                poiId: 'PO-Idj0LTSIK8640',
                floorId: 'FL-1jekz43tghdur0792',
            },
            destination: {
                poiId: 'PO-z9I48Tz4v5799',
                floorId: 'FL-1jekyc5imvmg60762',
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: 'PO-CMM0E4hA13389',
                    floorId: 'FL-1hbd6wylclg0x0772',
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
                poiId: 'PO-fuUPZVxbRR5343',
                floorId: 'FL-1jekz43tghdur0792',
            },
            destination: {
                poiId: 'PO-fuUPZVxbRR5343',
                floorId: 'FL-1jekz43tghdur0792',
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: 'PO-CMM0E4hA13389',
                    floorId: 'FL-1hbd6wylclg0x0772',
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
                poiId: 'PO-Z97p22yues4909',
                floorId: 'FL-1jekz43tghdur0792',
            },
            destination: {
                poiId: 'PO-z9I48Tz4v5799',
                floorId: 'FL-1jekyc5imvmg60762',
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: 'PO-HNG0cWGRI5109',
                    floorId: 'FL-1hbd6wylclg0x0772',
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
                poiId: 'PO-sO7EKvW9XN5478',
                floorId: 'FL-1jekz43tghdur0792',
            },
            destination: {
                poiId: 'PO-fuUPZVxbRR5343',
                floorId: 'FL-1jekz43tghdur0792',
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: 'PO-Ci59JRhBK1021',
                    floorId: 'FL-1hbd6wylclg0x0772',
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
                poiId: 'PO-sO7EKvW9XN5478',
                floorId: 'FL-1jekz43tghdur0792',
            },
            destination: {
                poiId: 'PO-Idj0LTSIK8640',
                floorId: 'FL-1jekz43tghdur0792',
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: 'PO-cf3pDZOGi7285',
                    floorId: 'FL-1hbd6wylclg0x0772',
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
                poiId: 'PO-sO7EKvW9XN5478',
                floorId: 'FL-1jekz43tghdur0792',
            },
            destination: {
                poiId: 'PO-z9I48Tz4v5799',
                floorId: 'FL-1jekyc5imvmg60762',
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: 'PO-cf3pDZOGi7285',
                    floorId: 'FL-1hbd6wylclg0x0772',
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
                poiId: 'PO-sO7EKvW9XN5478',
                floorId: 'FL-1jekz43tghdur0792',
            },
            destination: {
                poiId: 'PO-z9I48Tz4v5799',
                floorId: 'FL-1jekyc5imvmg60762',
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: 'PO-cf3pDZOGi7285',
                    floorId: 'FL-1hbd6wylclg0x0772',
                },
            ],
        };
        const naviOption = this.naviOption;
        const naviResponse = await this.mapData.getRoute(route);
        await this.map.routeSimulation.set(naviResponse.recommendation, naviOption);
    }
}
