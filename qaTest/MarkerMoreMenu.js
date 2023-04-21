export class MarkerMoreMenu {
    constructor() {
        this.mapData = null;
        this.map = null;
        this.mapContainer = null;
        this.menu = null;
        this.setting = null;
        this.floorList = null;
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
        this.floorList = this.mapData.dataFloor.getFloors();
        this.menu = menu.addFolder('More');
        this.initMoreSetting();
        return this.menu;
    }
    initMoreSetting() {
        const setting = {
            MarkerdoubleFloor: this.MarkerdoubleFloor.bind(this),
            anctest: this.anctest.bind(this),
        };
        const menu = this.menu;
        menu.add(setting, 'anctest');
        menu.add(setting, 'MarkerdoubleFloor');
    }

    async anctest() {
        const lists = await this.map.markers.set({
            // 생성된 marker들의 ID List를 저장합니다.
            marker: [
                {
                    x: 1000,
                    y: 1000,
                    iconOption: {
                        positionZ: 100,
                        anchor: {
                            x: 0.1,
                            y: 0.1,
                        },
                    },
                },
                {
                    x: 1000,
                    y: 1000,
                    iconOption: {
                        positionZ: 100,
                        anchor: {
                            x: 0.5,
                            y: 0.5,
                        },
                    },
                },
                {
                    x: 1000,
                    y: 1000,
                    iconOption: {
                        positionZ: 100,
                        anchor: {
                            x: 1,
                            y: 1,
                        },
                    },
                },
            ],
        });
    }

    async MarkerdoubleFloor() {
        const list = await this.map.markers.set({
            marker: [
                { x: 2000, y: 500 }, // 11층
                { x: 2000, y: 1000, floorId: this.floorList[0].id }, // 2층
            ],
        });
        await this.map.markers.set({
            marker: [
                { x: 3000, y: 500, floorId: this.floorList[1].id }, // 11층
                { x: 3000, y: 1000 }, // 11층
                { x: 3000, y: 1000, floorId: this.floorList[0].id }, // 2층
            ],
        });

        setTimeout(async () => {
            await this.map.markers.set({
                marker: [
                    { x: 4000, y: 500, floorId: this.floorList[1].id }, // 11층
                    { x: 4000, y: 1000, floorId: this.floorList[0].id }, // 2층
                    { x: 4000, y: 1500, floorId: this.floorList[0].id }, // 2층
                    { x: 4000, y: 2000 }, // 11층
                ],
            });
        }, 3000);

        await this.map.markers.set({
            // 11층
            marker: [
                {
                    x: 1000,
                    y: 2000,
                    iconOption: {
                        positionZ: 400, // 아이콘 z좌표값
                        anchor: {
                            // 아이콘 중심좌표값 (default값 x:0.5,y:0 )
                            x: 0.5,
                            y: 0,
                        },
                        iconUrl: './assets/img_marker_blue-3x.png', // 아이콘 이미지. url적용안할시 default로 지정된 marker image 적용
                        width: 50, // marker 넓이값. default = marker image의 기본 width
                        height: 70, // marker 높이값. default = marker image의 기본 height
                        visibleIcon: true, // marker를 보여줄지 말지 여부. default = true
                    },
                },
            ],
        });

        setTimeout(() => {
            if (list) {
                this.map.markers.clear(list);
            }
        }, 9000);
    }
}
