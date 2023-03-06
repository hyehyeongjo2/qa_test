export class ContextMoreMenu {
    constructor() {
        this.mapData = null;
        this.map = null;
        this.mapContainer = null;
        this.menu = null;
    }

    init(menu, mapData, map, mapContainer) {
        this.mapData = mapData;
        this.map = map;
        this.mapContainer = mapContainer;
        this.menu = menu.addFolder('More');
        this.initfirstHS(this.menu);
        this.initsecondHS(this.menu);
        this.initthirdHS(this.menu);
        this.initchangetest(this.menu);
        this.initconvertImg(this.menu);
        return this.menu;
    }

    initfirstHS(gui) {
        const firstHS = () => {
            const groupList = this.mapData.dataGroupCode.findAll();
            setTimeout(() => {
                this.map.context.hideByCode(groupList[0]);
            }, 1000);
            setTimeout(() => {
                this.map.context.showByCode(groupList[0]);
            }, 2000);
            setTimeout(() => {
                this.map.context.hideByCode(groupList[0]);
            }, 3000);
            setTimeout(() => {
                this.map.context.showByCode(groupList[1]);
            }, 4000);
            setTimeout(() => {
                this.map.context.hideByCode(groupList[0]);
            }, 5000);
            setTimeout(() => {
                this.map.context.showByCode(groupList[2]);
            }, 6000);
            setTimeout(() => {
                this.map.context.showByCode(groupList[0]);
            }, 7000);
        };
        const setting = {
            firstHS: firstHS,
        };
        gui.add(setting, 'firstHS');
    }
    initsecondHS(gui) {
        const secondHS = () => {
            const groupList = this.mapData.dataGroupCode.findAll();
            setTimeout(() => {
                this.map.context.hideByCode(groupList[1]);
            }, 1000);
            setTimeout(() => {
                this.map.context.showByCode(groupList[0]);
            }, 2000);
            setTimeout(() => {
                this.map.context.hideByCode(groupList[1]);
            }, 3000);
            setTimeout(() => {
                this.map.context.showByCode(groupList[1]);
            }, 4000);
            setTimeout(() => {
                this.map.context.hideByCode(groupList[1]);
            }, 5000);
            setTimeout(() => {
                this.map.context.showByCode(groupList[2]);
            }, 6000);
            setTimeout(() => {
                this.map.context.showByCode(groupList[0]);
            }, 7000);
        };
        const setting = {
            secondHS: secondHS,
        };
        gui.add(setting, 'secondHS');
    }
    initthirdHS(gui) {
        const thirdHS = () => {
            const groupList = this.mapData.dataGroupCode.findAll();
            setTimeout(() => {
                this.map.context.hideByCode(groupList[2]);
            }, 1000);
            setTimeout(() => {
                this.map.context.showByCode(groupList[0]);
            }, 2000);
            setTimeout(() => {
                this.map.context.hideByCode(groupList[2]);
            }, 3000);
            setTimeout(() => {
                this.map.context.showByCode(groupList[1]);
            }, 4000);
            setTimeout(() => {
                this.map.context.hideByCode(groupList[2]);
            }, 5000);
            setTimeout(() => {
                this.map.context.showByCode(groupList[2]);
            }, 6000);
            setTimeout(() => {
                this.map.context.showByCode(groupList[0]);
            }, 7000);
        };
        const setting = {
            thirdHS: thirdHS,
        };
        gui.add(setting, 'thirdHS');
    }
    initchangetest(gui) {
        const changeTest = async () => {
            const floorList = this.mapData.dataFloor.getFloors();
            const langList = this.mapData.dataLanguage.getLanguage();
            setTimeout(async () => {
                await this.map.context.changeFloor(floorList[1].id);
            }, 1000);
            setTimeout(async () => {
                await this.map.context.changeFloor(floorList[0].id);
            }, 2000);
            setTimeout(() => {
                this.map.control.changeCamera('2D');
            }, 3000);
            setTimeout(() => {
                this.map.control.changeCamera('3D');
            }, 4000);
            setTimeout(() => {
                this.map.context.changeLanguage(langList[1].lang);
            }, 5000);
            setTimeout(() => {
                this.map.context.changeLanguage(langList[0].lang);
            }, 6000);
        };
        const setting = {
            changeTest: changeTest,
        };
        gui.add(setting, 'changeTest');
    }
    initconvertImg(gui) {
        const imgTest = async () => {
            this.map.context.convertToImg({ ratio: 5 });
            setTimeout(() => {
                this.map.context.convertToImg({ ratio: 5 });
            }, 3000);
            setTimeout(() => {
                this.map.context.convertToImg({ ratio: 5 });
            }, 6000);
        };
        const setting = {
            imgTest: imgTest,
        };
        gui.add(setting, 'imgTest');
    }
}
