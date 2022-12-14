export class SimulationMoreMenu {
    constructor() {
        this.mapData = null;
        this.map = null;
        this.mapContainer = null;
        this.menu = null;
        this.setting = null;
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
            doubleFloortestSet:this.doubleFloortestSet.bind(this),
            doubleFloortestStart:this.doubleFloortestStart.bind(this),
        };
        const menu = this.menu;
        menu.add(setting, 'doubleFloortestSet');
        menu.add(setting, 'doubleFloortestStart');
    }
  
    doubleFloortestStart (){
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
    }

    async doubleFloortestSet (){
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
            ]
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
                }
            ],
        };
        const naviOption = {
            lineZ: 100, // 주행선의 z축 값을 지정합니다.
                    lineDivide: true, // 주행선을 경유지 기준으로 분할 여부를 결정합니다.
                    defaultLineOption: {
                        lineColor: '#0000ff', // navigation 주행 라인의 색상을 지정
                        lineSpotSize: 10,                               // 주행선의 점의 굵기를 지정합니다. 주행선의 속성이 점선일 경우 적용됩니다.
                        lineSpotInterval: 10,                           // 주행선의 점간의 간격을 지정합니다. 숫자가 커질수록 실선에 가깝게 보입니다.
                        lineSpotCount: 10,                              // 주행선의 점의 개수를 지정합니다.
                        lineSpotAnimate: true,                           // 점선 애니메이션 활성화 여부
                        lineSpotAnimateSpeed: 0.1,                       // 점선 애니메이션 속도
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
                            }
                        }
                    ]
        }
        this.map.mylocation.set(locationOption);
        const naviResponse = await this.mapData.getRoute(route);
        await this.map.routeSimulation.set(naviResponse.recommendation, naviOption);
    }
}