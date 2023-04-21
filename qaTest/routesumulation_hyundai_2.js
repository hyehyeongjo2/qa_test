export class routesumulation_hyundai_2 {
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
        this.menu = menu.addFolder('현대_더현대');
        this.menu2 = this.menu.addFolder('엘리베이터');
        this.menu3 = this.menu.addFolder('에스컬레이터');
        this.initMoreSetting();
        return this.menu;
    }
    initMoreSetting() {
        const setting = {
            ev_1_2_3: this.ev_1_2_3.bind(this),
            ev_1_2_1: this.ev_1_2_1.bind(this),
            ev_es_1_2_3: this.ev_es_1_2_3.bind(this),
            ev_es_1_2_1: this.ev_es_1_2_1.bind(this),
            es_1_6: this.es_1_2_3.bind(this),
            es_6_1: this.es_1_2_1.bind(this),
            es_ev_1_2_3: this.es_ev_1_2_3.bind(this),
            es_ev_1_2_1: this.es_ev_1_2_1.bind(this),
        };
        const menu2 = this.menu2;
        const menu3 = this.menu3;
        menu2.add(setting, 'ev_1_2_3');
        menu2.add(setting, 'ev_1_2_1');
        menu2.add(setting, 'ev_es_1_2_3');
        menu2.add(setting, 'ev_es_1_2_1');
        menu3.add(setting, 'es_1_6');
        menu3.add(setting, 'es_6_1');
        menu3.add(setting, 'es_ev_1_2_3');
        menu3.add(setting, 'es_ev_1_2_1');
    }
    async ev_1_2_1() {
        const route = {
            origin: {
                poiId: 'PO-zo0B7h0Ci1073',
                floorId: 'FL-soem999bnha10599',
            },
            destination: {
                poiId: 'PO-aNzBL-Zz58425',
                floorId: 'FL-soem999bnha10599',
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: 'PO-p9nJURmuu2381',
                    floorId: 'FL-qxirle6jha9l0574',
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
                poiId: 'PO-zo0B7h0Ci1073',
                floorId: 'FL-soem999bnha10599',
            },
            destination: {
                poiId: 'PO-03vUeQ2j70384',
                floorId: 'FL-t4f3r0t8nnlf0560',
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: 'PO-p9nJURmuu2381',
                    floorId: 'FL-qxirle6jha9l0574',
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
                poiId: 'PO-zo0B7h0Ci1073',
                floorId: 'FL-soem999bnha10599',
            },
            destination: {
                poiId: 'PO-zSLxgiZPp0753',
                floorId: 'FL-soem999bnha10599',
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: 'PO-p9nJURmuu2381',
                    floorId: 'FL-qxirle6jha9l0574',
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
                poiId: 'PO-aNOI0qviT9257',
                floorId: 'FL-soem999bnha10599',
            },
            destination: {
                poiId: 'PO-7bDSadbM60878',
                floorId: 'FL-t4f3r0t8nnlf0560',
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: 'PO-J15qnL1-O8461',
                    floorId: 'FL-qxirle6jha9l0574',
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
                poiId: 'PO-ZUUKB6sdh1593',
                floorId: 'FL-soem999bnha10599',
            },
            destination: {
                poiId: 'PO-fXXA1AR_G6628',
                floorId: 'FL-t89mxdj9mxcy0524',
            },
            type: ['recommendation'],
        };
        const naviOption = this.naviOption;
        const naviResponse = await this.mapData.getRoute(route);
        await this.map.routeSimulation.set(naviResponse.recommendation, naviOption);
    }
    async es_1_2_3() {
        const route = {
            origin: {
                poiId: 'PO-fXXA1AR_G6628',
                floorId: 'FL-t89mxdj9mxcy0524',
            },
            destination: {
                poiId: 'PO-ZUUKB6sdh1593',
                floorId: 'FL-soem999bnha10599',
            },
            type: ['recommendation'],
        };
        const naviOption = this.naviOption;
        const naviResponse = await this.mapData.getRoute(route);
        await this.map.routeSimulation.set(naviResponse.recommendation, naviOption);
    }
    async es_ev_1_2_1() {
        const route = {
            origin: {
                poiId: 'PO-ZUUKB6sdh1593',
                floorId: 'FL-soem999bnha10599',
            },
            destination: {
                poiId: 'PO-7fAC1zcRT7649',
                floorId: 'FL-soem999bnha10599',
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: 'PO-fN5wvFids4821',
                    floorId: 'FL-qxirle6jha9l0574',
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
                poiId: 'PO-ZUUKB6sdh1593',
                floorId: 'FL-soem999bnha10599',
            },
            destination: {
                poiId: 'PO-irlPJFZOe2039',
                floorId: 'FL-t4f3r0t8nnlf0560',
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: 'PO-fN5wvFids4821',
                    floorId: 'FL-qxirle6jha9l0574',
                },
            ],
        };
        const naviOption = this.naviOption;
        const naviResponse = await this.mapData.getRoute(route);
        await this.map.routeSimulation.set(naviResponse.recommendation, naviOption);
    }
}
