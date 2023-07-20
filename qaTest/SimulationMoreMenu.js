export class SimulationMoreMenu {
    constructor() {
        this.mapData = null;
        this.map = null;
        this.mapContainer = null;
        this.menu = null;
        this.setting = null;
        this.poiList = null;
        this.complete = null;
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
        this.initMoreSetting();
        return this.menu;
    }

    initMoreSetting() {
        const setting = {
            doubleFloortestSet: this.doubleFloortestSet.bind(this),
            doubleFloortestStart: this.doubleFloortestStart.bind(this),
            PosLineSet: this.PosLineSet.bind(this),
            IdPointSet: this.IdPointSet.bind(this),
            routetype: this.routetype.bind(this),
            emart_kintex_set: this.emart_kintex_set.bind(this),
            emart_kintex_start: this.emart_kintex_start.bind(this),
            // test: this.createNaviListContainer.bind(this),
        };
        const menu = this.menu;
        menu.add(setting, 'doubleFloortestSet');
        menu.add(setting, 'doubleFloortestStart');
        menu.add(setting, 'PosLineSet');
        menu.add(setting, 'IdPointSet');
        menu.add(setting, 'routetype');
        menu.add(setting, 'emart_kintex_set');
        menu.add(setting, 'emart_kintex_start');
        // menu.add(setting, 'test');
    }

    doubleFloortestStart() {
        const mapContainer = this.mapContainer;
        this.complete = true;
        const animOption = {
            destOption: {
                // 도착지 애니메이션 옵션
                activeDest: true, // active 여부
                color: '#000000', // 변경하고자 하는 색상값
                opacity: 0.5, // 변경하고자하는 투명도 값
                isAnimate: true, // 색상 애니메이션 효과 적용 여부
                duration: 1200, // 애니메이션 complete까지의 시간 ms단위로 default는 1000입니다
                isRepeat: true, // 애니메이션 반복 여부 true는 반복, false는 반복 x입니다. default는 false
                isYoyo: true, // 애니메이션이 complete됬을때 isRepeat 옵션이 true인 경우 반복 방법, true인 경우 역순징행되며 default는 false입니다.
            },
            zoom: 22, // 애니메이션 동작 시 zoom Level
            changeFloorDelay: 3000, // 층 변경시 delay time
            speedRate: 20, // 모의주행 속도 지정. 예를 들어 1.5로 지정한 경우 default대비 1.5배 속도
            removeIcon: true, // 모의주행 완료 또는 stop 시, 모의주행 icon 제거 옵션. 기본값은 true
            markerOptions: {
                iconUrl: 'https://assets.dabeeomaps.com/image/ico/img_person-3x.png', // 모의주행의 icon의 url을 지정합니다.
                width: 50, // 모의주행의 icon의 width값을 설정합니다.
                height: 50, // 모의주행의 icon의 height값을 설정합니다.
                positionZ: 120, // 모의주행 아이콘의 z축 값을 지정합니다. 입력하지 않을 경우 default값으로 자동생성 됩니다.
            },
        };
        this.map.routeSimulation.start(animOption);
        mapContainer.addEventListener('navi-complete', (e) => {
            if (this.complete) {
                console.log('navi-complete 에 대한 결과값', e.detail);
                this.complete = false;
            }
        });
        mapContainer.addEventListener('floor-changed', (e) => {
            // this.complete = true;
            if (this.complete) {
                console.log('floor-changed 에 대한 결과값', e.detail);
                this.complete = false;
            }
        });

        // floor-changing
        mapContainer.addEventListener('floor-changing', (e) => {
            // this.complete = true;
            if (this.complete) {
                console.log('floor-changing 에 대한 결과값', e.detail);
                this.complete = false;
            }
        });
        mapContainer.addEventListener('render-complete', (e) => {
            // this.complete = true;
            if (this.complete) {
                console.log('render-complete 에 대한 결과값', e.detail);
                this.complete = false;
            }
        });
        console.log(this.complete);
    }

    async doubleFloortestSet() {
        const floorList = this.mapData.dataFloor.getFloors();
        const locationOption = {
            x: 2068,
            y: 1467,
            iconOption: {
                positionZ: 10,
                iconUrl: 'https://assets.dabeeomaps.com/image/ico/img_person-3x.png',
                width: 200,
                height: 200,
                anchor: {
                    x: 0.5,
                    y: 0.5,
                },
            },
            onActive: false,
            animate: {
                color: '#00ff00',
                opacity: 0.4,
                desireScale: 4,
                duration: 1500,
            },
        };

        await this.map.markers.set({
            marker: [
                {
                    x: 4393,
                    y: 1332,
                    floorId: floorList[0].id,
                    iconOption: {
                        positionZ: 20, // 아이콘 z좌표값
                        iconUrl: 'https://assets.dabeeomaps.com/image/btn_floor_up.png', // 아이콘 이미지. url적용안할시 default로 지정된 marker image 적용
                        width: 50, // marker 넓이값. default = marker image의 기본 width
                        height: 50, // marker 높이값. default = marker image의 기본 height
                        visibleIcon: true, // marker를 보여줄지 말지 여부. default = true
                    },
                },
            ],
        });

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
            waypoints: [
                {
                    position: { x: 4883, y: 1285, z: 50 },
                    floorId: floorList[1].id,
                },
            ],
        };
        const naviOption = {
            lineZ: 100, // 주행선의 z축 값을 지정합니다.
            lineDivide: true, // 주행선을 경유지 기준으로 분할 여부를 결정합니다.
            defaultLineOption: {
                lineColor: '#0000ff', // navigation 주행 라인의 색상을 지정
                lineSpotSize: 10, // 주행선의 점의 굵기를 지정합니다. 주행선의 속성이 점선일 경우 적용됩니다.
                lineSpotInterval: 10, // 주행선의 점간의 간격을 지정합니다. 숫자가 커질수록 실선에 가깝게 보입니다.
                lineSpotCount: 10, // 주행선의 점의 개수를 지정합니다.
                lineSpotAnimate: true, // 점선 애니메이션 활성화 여부
                lineSpotAnimateSpeed: 0.1, // 점선 애니메이션 속도
            },
            origin: {
                // 출발지 마커 옵션
                markerOptions: {
                    // 출발지 마커 옵션
                    // iconUrl: string,                                  // 출발지 마커 이미지 url
                    width: 50, // 출발지 마커 width
                    height: 50, // 출발지 마커 height
                    positionZ: 100, // 출발지 마커 높이
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
                    positionZ: 100,
                    visibleIcon: true,
                },
                lineOptions: {
                    lineColor: '#000000',
                    solidLineEnabled: true,
                    solidLineWidth: 3,
                    solidLineJoin: 'round',
                    solidLineCap: 'round',
                },
            },
            wayPoints: [
                // 경유지 마커 및 주행선 옵션 배열
                {
                    markerOptions: {
                        width: 50,
                        height: 50,
                        positionZ: 100,
                        visibleIcon: false,
                    },
                },
            ],
        };
        this.map.mylocation.set(locationOption);
        const naviResponse = await this.mapData.getRoute(route);
        await this.map.routeSimulation.set(naviResponse.recommendation, naviOption);
    }
    async PosLineSet() {
        const currentFloor = this.map.context.getCurrentFloor().id;
        this.poiList = this.mapData.dataPoi.getPois().reduce(
            (result, cur) => {
                if (currentFloor == cur.floorId) result.push(cur.id);
                return result;
            },
            [''],
        );
        const floorList = this.mapData.dataFloor.getFloors();
        const route = {
            origin: {
                poiId: this.poiList[1],
                floorId: floorList[0].id,
            },
            destination: {
                poiId: this.poiList[11],
                floorId: floorList[0].id,
            },
            type: ['recommendation'],
            waypoints: [
                {
                    poiId: this.poiList[5],
                    floorId: floorList[0].id,
                },
                {
                    poiId: this.poiList[7],
                    floorId: floorList[0].id,
                },
            ],
        };
        const naviOption = {
            lineZ: 100, // 주행선의 z축 값을 지정합니다.
            lineDivide: true, // 주행선을 경유지 기준으로 분할 여부를 결정합니다.
            defaultLineOption: {
                lineColor: '#0000ff', // navigation 주행 라인의 색상을 지정
                solidLineEnabled: true,
                solidLineWidth: 10,
                solidLineJoin: 'bevel',
                solidLineCap: 'butt',
            },
            origin: {
                // 출발지 마커 옵션
                markerOptions: {
                    // 출발지 마커 옵션
                    // iconUrl: string,                                  // 출발지 마커 이미지 url
                    width: 50, // 출발지 마커 width
                    height: 50, // 출발지 마커 height
                    positionZ: 100, // 출발지 마커 높이
                    visibleIcon: true, // 출발지 마커 보여줄지 말지 여부. default 는 true.
                    anchor: {
                        x: 1,
                        y: 0.5,
                    },
                },
            },
            destination: {
                // 도착지 마커 및 주행선 옵션
                markerOptions: {
                    // 도착지 마커 옵션 (출발지 마커 옵션과 동일)
                    // iconUrl: string,
                    width: 50,
                    height: 50,
                    positionZ: 100,
                    visibleIcon: true,
                },
                lineOptions: {
                    lineColor: '#000000',
                    solidLineEnabled: true,
                    solidLineWidth: 20,
                    solidLineJoin: 'round',
                    solidLineCap: 'round',
                },
            },
            wayPoints: [
                // 경유지 마커 및 주행선 옵션 배열
                {
                    markerOptions: {
                        width: 50,
                        height: 50,
                        positionZ: 100,
                        visibleIcon: false,
                    },
                },
                {
                    markerOptions: {
                        width: 50,
                        height: 50,
                        positionZ: 100,
                        visibleIcon: false,
                    },
                    lineOptions: {
                        // 경유지 주행선 옵션 (기본 주행선 옵션과 동일)
                        lineColor: '#ff00ff',
                        solidLineEnabled: true,
                        solidLineWidth: 30,
                        solidLineJoin: 'bevel',
                        solidLineCap: 'butt',
                    },
                },
            ],
        };
        const naviResponse = await this.mapData.getRoute(route);
        await this.map.routeSimulation.set(naviResponse.recommendation, naviOption);
    }

    async IdPointSet() {
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
            waypoints: [
                {
                    position: { x: 3083, y: 1285, z: 50 },
                    floorId: floorList[0].id,
                },
                {
                    position: { x: 4583, y: 1285, z: 50 },
                    floorId: floorList[0].id,
                },
            ],
        };
        const naviOption = {
            lineZ: 100, // 주행선의 z축 값을 지정합니다.
            lineDivide: true, // 주행선을 경유지 기준으로 분할 여부를 결정합니다.
            defaultLineOption: {
                solidLineEnabled: false,
                lineColor: '#0000ff', // navigation 주행 라인의 색상을 지정
                lineSpotSize: 10,
                lineSpotInterval: 10,
                lineSpotCount: 10,
                lineSpotAnimate: false,
                lineSpotAnimateSpeed: 0.1,
            },
            origin: {
                // 출발지 마커 옵션
                markerOptions: {
                    // 출발지 마커 옵션
                    // iconUrl: string,                                  // 출발지 마커 이미지 url
                    width: 50, // 출발지 마커 width
                    height: 50, // 출발지 마커 height
                    positionZ: 100, // 출발지 마커 높이
                    visibleIcon: true, // 출발지 마커 보여줄지 말지 여부. default 는 true.
                    anchor: {
                        x: 1,
                        y: 0.5,
                    },
                },
            },
            destination: {
                // 도착지 마커 및 주행선 옵션
                showTag: false, // 도착지 말풍선 생성 여부 (기본값 true)
                markerOptions: {
                    // 도착지 마커 옵션 (출발지 마커 옵션과 동일)
                    // iconUrl: string,
                    width: 50,
                    height: 50,
                    positionZ: 100,
                    visibleIcon: true,
                },
                lineOptions: {
                    solidLineEnabled: false,
                    lineColor: '#000000',
                    lineSpotSize: 10,
                    lineSpotInterval: 10,
                    lineSpotCount: 10,
                    lineSpotAnimate: true,
                    lineSpotAnimateSpeed: 0.1,
                },
            },
            wayPoints: [
                // 경유지 마커 및 주행선 옵션 배열
                {
                    markerOptions: {
                        iconUrl: 'https://assets.dabeeomaps.com/image/btn_floor_up.png',
                        width: 50,
                        height: 50,
                        positionZ: 100,
                        visibleIcon: true,
                    },
                },
                {
                    markerOptions: {
                        iconUrl: 'https://assets.dabeeomaps.com/image/btn_floor_up.png',
                        width: 50,
                        height: 50,
                        positionZ: 100,
                        visibleIcon: false,
                    },
                    lineOptions: {
                        // 경유지 주행선 옵션 (기본 주행선 옵션과 동일)
                        solidLineEnabled: false,
                        lineColor: '#ff00ff',
                        lineSpotSize: 10,
                        lineSpotInterval: 10,
                        lineSpotCount: 10,
                        lineSpotAnimate: true,
                        lineSpotAnimateSpeed: 0.1,
                    },
                },
            ],
        };
        const naviResponse = await this.mapData.getRoute(route);
        await this.map.routeSimulation.set(naviResponse.recommendation, naviOption);
    }
    async routetype() {
        const floorList = this.mapData.dataFloor.getFloors();
        const naviOption = {
            lineZ: 100, // 주행선의 z축 값을 지정합니다.
            lineDivide: true, // 주행선을 경유지 기준으로 분할 여부를 결정합니다.
            defaultLineOption: {
                lineColor: '#0000ff', // navigation 주행 라인의 색상을 지정
                solidLineEnabled: true,
                solidLineWidth: 10,
                solidLineJoin: 'bevel',
                solidLineCap: 'butt',
            },
        };

        const route = {
            origin: {
                position: { x: 2068, y: 1467, z: 50 },
                floorId: floorList[0].id,
            },
            destination: {
                position: { x: 4393, y: 1332, z: 50 },
                floorId: floorList[1].id,
            },
            type: ['recommendation'],
        };
        const route2 = {
            origin: {
                position: { x: 2068, y: 1467, z: 50 },
                floorId: floorList[0].id,
            },
            destination: {
                position: { x: 4393, y: 1332, z: 50 },
                floorId: floorList[1].id,
            },
            type: ['stairs'],
        };
        const route3 = {
            origin: {
                position: { x: 2068, y: 1467, z: 50 },
                floorId: floorList[0].id,
            },
            destination: {
                position: { x: 4393, y: 1332, z: 50 },
                floorId: floorList[1].id,
            },
            type: ['escalator'],
        };
        const route4 = {
            origin: {
                position: { x: 2068, y: 1467, z: 50 },
                floorId: floorList[0].id,
            },
            destination: {
                position: { x: 4393, y: 1332, z: 50 },
                floorId: floorList[1].id,
            },
            type: ['elevator'],
        };
        const naviResponse = await this.mapData.getRoute(route);
        const naviResponse2 = await this.mapData.getRoute(route2);
        const naviResponse3 = await this.mapData.getRoute(route3);
        const naviResponse4 = await this.mapData.getRoute(route4);
        setTimeout(async () => {
            await this.map.routeSimulation.set(naviResponse.recommendation, naviOption);
            console.log('추천');
        }, 2000);
        setTimeout(async () => {
            if (naviResponse2.stairs) {
                await this.map.routeSimulation.set(naviResponse2.stairs, naviOption);
                console.log('계단');
            } else {
                console.log('계단없음');
            }
        }, 4000);

        setTimeout(async () => {
            if (naviResponse3.escalator) {
                await this.map.routeSimulation.set(naviResponse3.escalator, naviOption);
                console.log('에스컬레이터');
            } else {
                console.log('에스컬레이터없음');
            }
        }, 6000);
        setTimeout(async () => {
            if (naviResponse4.elevator) {
                await this.map.routeSimulation.set(naviResponse4.elevator, naviOption);
                console.log('엘리베이터');
            } else {
                console.log('엘리베이터없음');
            }
        }, 8000);
    }
    async emart_kintex_set() {
        const route = {
            origin: {
                poiId: 'PO-H_JZKUsEB0662',
                floorId: 'FL-uvjpe96mhid05379',
            },
            destination: {
                poiId: 'PO-8ydRcNBPy7672',
                floorId: 'FL-1ibkcfzdvj4mp5357',
            },
            type: ['recommendation'],
        };
        const naviOption = {
            origin: {
                markerOptions: {
                    // iconUrl: '/assets/icon/start.svg',
                    width: 60,
                    height: 60,
                    positionZ: 10,
                    visibleIcon: true,
                },
            },
            destination: {
                showTag: false,
                markerOptions: {
                    // iconUrl: '/assets/icon/arrive.svg',
                    width: 100,
                    height: 160,
                    positionZ: 10,
                    visibleIcon: true,
                },
                lineOptions: {
                    lineColor: '#ffbb00',
                    solidLineEnabled: true,
                    solidLineWidth: 20,
                },
            },

            defaultLineOption: {
                lineColor: 'rgb(110,91, 227, 0.3)',
                solidLineEnabled: true,
                solidLineWidth: 13,
                solidLineCap: 'round',
                solidLineJoin: 'round',
            }, // 기본 주행선 옵션
            lineDivide: false,
            lineZ: 10,
        };
        const naviResponse = await this.mapData.getRoute(route);
        await this.map.routeSimulation.set(naviResponse.recommendation, naviOption);
    }
    emart_kintex_start() {
        const mapContainer = this.mapContainer;
        this.complete = true;
        const animOption = {
            destOption: {
                opacity: 0.8,
                isAnimate: true,
                duration: 1000,
                isRepeat: false,
                isYoyo: false,
            },
            changeFloorDelay: 0,
            speedRate: 23,
            removeIcon: true,
            markerOptions: {
                iconUrl: 'https://assets.dabeeomaps.com/image/ico/landy.gif',
                width: 50,
                height: 50,
            },

            enableFloorMotionCSS: true,
            floorMotionDuration: 1500,
            enableTwoFloorsNavigation: true,
            twoFloorsNavigationDuration: 1500,
            twoFloorsNavigationOriginCss: 'display: flex; flex-direction: column; align-items:center; top: 300px',
            twoFloorsNavigationDestCss: 'display: flex; flex-direction: column; align-items:center; bottom: 472px',
            //   twoFloorsNavigationOriginElement: createFloorElement(machineStore.machine.floor.name, '출발'),
            //   twoFloorsNavigationDestElement: createFloorElement(floorStore.getTargetFloorName(tenantStore.currentTenant.floorId)
        };
        this.map.routeSimulation.start(animOption);
        console.log(this.complete);
    }
}
