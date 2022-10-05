export class MapDataMenu {
    constructor() {
        this.gui = null;
        this.mapData = null;
        this.map = null;
        this.mapContainer = null;
        this.menu = null;
    }

    init(gui, mapData, map, mapContainer) {
        this.gui = gui;
        this.mapData = mapData;
        this.map = map;
        this.mapContainer = mapContainer;
        this.menu = this.gui.addFolder("MapData");
        this.initDataPoi(this.menu);
        this.initDataObject(this.menu);
        this.initDataFloor(this.menu);
        this.initDataGroupCode(this.menu);
        return this.menu;
    }

    removeMenu() {
        if (this.menu) {
            this.gui.removeFolder(this.menu);
            this.menu = null;
        }
    }

    initDataPoi(gui) {
        let poisMenu = null;

        const changePoi = async (value) => {
            console.log(value);
            const option = {
                ids: value,
                outerColor: "#FC032D",
                innerColor: "red",
                scale: 1.8,
            };
            const pois = this.mapData.dataPoi.find(value, {type: "iD"});
            await this.map.context.changeFloor(pois.floorId);
            await this.map.pois.reset();
            console.log(option);
            this.map.pois.set(option);
        };

        function findByTitle(value) {
            const pois = this.mapData.dataPoi.find(value, {type: "title"}).reduce((result, cur) => {
                return {...result, [cur.title]: cur.id};
            }, {});
            poisMenu = poisMenu.options(pois).onChange(changePoi);
        }
        function findByID(value) {
            const pois = this.mapData.dataPoi.find(value, {type: "iD"});
            poisMenu = poisMenu.options({[pois.title]: pois.id}).onChange(changePoi);
        }

        async function findByFloorId(value) {
            await this.map.context.changeFloor(value); // 지도를 입력한 층 아이디에 맞는 층으로 전환합니다.
            const pois = this.mapData.dataPoi.find(value, {type: "floorId"}).reduce((result, cur) => {
                return {...result, [cur.title]: cur.id};
            }, {});
            poisMenu = poisMenu.options(pois).onChange(changePoi);
        }
        function findByGroupCode(value) {
            const pois = this.mapData.dataPoi.find(value, {type: "groupCode"}).reduce((result, cur) => {
                return {...result, [cur.title]: cur.id};
            }, {});
            poisMenu = poisMenu.options(pois).onChange(changePoi);
        }

        const floorList = this.mapData.dataFloor.getFloors().reduce((prev, cur) => {
            return [...prev, cur.id];
        }, []);
        const poiList = this.mapData.dataPoi.getPois().reduce((result, cur) => {
            return [...result, cur.id];
        }, []);
        const groupList = this.mapData.dataGroupCode.findAll();

        const setting = {
            findByTitle: "",
            findByID: "",
            findByFloorId: "",
            findByGroupCode: "",
            poi: "",
        };
        const menu = gui.addFolder("dataPoi");
        // menu.open();
        menu.add(setting, "findByTitle").onFinishChange(findByTitle.bind(this));
        menu.add(setting, "findByID", poiList).onChange(findByID.bind(this));
        menu.add(setting, "findByFloorId", floorList).onChange(findByFloorId.bind(this));
        menu.add(setting, "findByGroupCode", groupList).onChange(findByGroupCode.bind(this));

        poisMenu = menu.add(setting, "poi").onChange(changePoi);
    }

    async initDataObject(gui) {
        let objectsMenu = null;
        function getObjectCenter() {
            console.log("getObjectCenter");
        }
        const changeObject = async (value) => {
            console.log(value);
            const option = {
                activeDest: true, // active 여부
                color: "#00ffff", // 변경하고자 하는 색상값
                opacity: 0.3, // 변경하고자하는 투명도 값
                isAnimate: true, // 색상 애니메이션 효과 적용 여부
                duration: 1200, // 애니메이션 complete까지의 시간 ms단위로 default는 1000입니다
                isRepeat: true, // 애니메이션 반복 여부 true는 반복, false는 반복 x입니다. default는 false
                isYoyo: false, // 애니메이션이 complete됬을때 isRepeat 옵션이 true인 경우 반복 방법, true인 경우 역순징행되며 default는 false입니다.
                ids: value, // 오브젝트의 ID 또는 오브젝트가 연결된 poi ID 배열. poi ID의 경우 연결된 오브젝트가 없을 경우 건너뛰고 진행합니다. ID 를 지정하지 않으면 모든 오브젝트 속성을 변경합니다.
            };
            this.map.objects.set(option);
        };

        function findByTitle(value) {
            const objects = this.mapData.dataObject
                .find({title: value, floor: setting.object})
                .reduce((result, cur) => {
                    return [...result, cur.id];
                }, []);
            objectsMenu = objectsMenu.options(objects).onChange(changeObject);
        }
        function findByID(value) {
            const objects = this.mapData.dataObject.find({iD: value, floor: setting.object});
            objectsMenu = objectsMenu.options(objects.id).onChange(changeObject);
        }

        async function findByFloorId(value) {
            await this.map.context.changeFloor(value); // 지도를 입력한 층 아이디에 맞는 층으로 전환합니다.
            const objects = this.mapData.dataObject.find({floor: value}).reduce((result, cur) => {
                return [...result, cur.id];
            }, []);
            objectsMenu = objectsMenu.options(objects).onChange(changeObject);
        }
        function findByGroupCode(value) {
            const objects = this.mapData.dataObject.find({groupCode: value, floor: setting.object});
            objectsMenu = objectsMenu
                .options(objects)
                .onChange(changeObject)
                .reduce((result, cur) => {
                    return [...result, cur.id];
                }, []);
        }
        const currentFloor = this.map.context.getCurrentFloor();
        const floorList = this.mapData.dataFloor.getFloors().reduce((prev, cur) => {
            return [...prev, cur.id];
        }, []);
        const objects = await this.mapData.dataObject.getObjects(currentFloor.id);
        const objectList = objects.reduce((result, cur) => {
            return [...result, cur.id];
        }, []);
        const groupList = this.mapData.dataGroupCode.findAll();

        const setting = {
            findByFloorId: "",
            findByTitle: "",
            findByID: "",
            findByGroupCode: "",
            getObjectCenter: getObjectCenter,
            object: "",
        };
        const menu = gui.addFolder("dataObject");
        // menu.open();
        menu.add(setting, "findByFloorId", floorList).onChange(findByFloorId.bind(this));
        menu.add(setting, "findByTitle").onFinishChange(findByTitle.bind(this));
        menu.add(setting, "findByID", objectList).onChange(findByID.bind(this));
        menu.add(setting, "findByGroupCode", groupList).onChange(findByGroupCode.bind(this));
        menu.add(setting, "getObjectCenter");
        objectsMenu = menu.add(setting, "object").onChange(changeObject);
    }

    initDataFloor(gui) {
        let floorsMenu = null;

        const changeFloor = async (value) => {
            await this.map.context.changeFloor(value);
        };

        function findByTitle(value) {
            const floors = this.mapData.dataFloor.find(value, {type: "title"}).reduce((result, cur) => {
                return [...result, cur.id];
            }, []);
            floorsMenu = floorsMenu.options(floors).onChange(changeFloor);
        }
        function findByFloorId(value) {
            const floors = this.mapData.dataFloor.find(value, {type: "id"});
            floorsMenu = floorsMenu.options([floors.id]).onChange(changeFloor);
        }
        const floorList = this.mapData.dataFloor.getFloors().reduce(
            (prev, cur) => {
                return [...prev, cur.id];
            },
            [""],
        );
        const defaultFloor = this.mapData.dataFloor.getDefaultFloor();
        const setting = {
            getDefaultFloor: defaultFloor.id,
            findByFloorId: "",
            findByTitle: "",
            floors: "",
        };
        const menu = gui.addFolder("dataFloor");
        // menu.open();
        menu.add(setting, "getDefaultFloor");
        menu.add(setting, "findByFloorId", floorList).onChange(findByFloorId.bind(this));
        menu.add(setting, "findByTitle").onFinishChange(findByTitle.bind(this));
        floorsMenu = menu.add(setting, "floors").onChange(changeFloor);
    }

    initDataGroupCode (gui) {
        let groupCodeMenu = null; 
        const changeGroupCode=(value)=> {
            console.log(value);
        }
        function findChild(value) {
            const groups = this.mapData.dataGroupCode.findChild(value);
            groupCodeMenu = groupCodeMenu.options(groups).onChange(changeGroupCode);;
        }
        function findAllChild(value) {
            const groups = this.mapData.dataGroupCode.findAllChild(value);
            groupCodeMenu = groupCodeMenu.options(groups).onChange(changeGroupCode);;
        }
        function findParent(value) {
            const groups = this.mapData.dataGroupCode.findParent(value);
            groupCodeMenu = groupCodeMenu.options([groups]).onChange(changeGroupCode);;
        }
        function findRootParent(value) {
            const groups = this.mapData.dataGroupCode.findRootParent(value);
            groupCodeMenu = groupCodeMenu.options([groups]).onChange(changeGroupCode);;
        }
        function findAllRoot(value) {
            const groups = this.mapData.dataGroupCode.findAllRoot();
            groupCodeMenu = groupCodeMenu.options(groups).onChange(changeGroupCode);;
        }
        function findAll(value) {
            const groups = this.mapData.dataGroupCode.findAll();
            groupCodeMenu = groupCodeMenu.options(groups).onChange(changeGroupCode);;
        }
        
        const groupList = this.mapData.dataGroupCode.findAll()
        const setting = {
            findChild: "",
            findAllChild: "",
            findParent: "",
            findRootParent: "",
            findAllRoot:findAllRoot.bind(this),
            findAll:findAll.bind(this),
            groupCode:""

        };
        const menu = gui.addFolder("dataGroupCode");
        // menu.open();
        menu.add(setting, "findChild", groupList).onChange(findChild.bind(this));
        menu.add(setting, "findAllChild", groupList).onChange(findAllChild.bind(this));
        menu.add(setting, "findParent",groupList).onFinishChange(findParent.bind(this));
        menu.add(setting, "findRootParent", groupList).onFinishChange(findRootParent.bind(this));
        menu.add(setting, "findAllRoot");
        menu.add(setting, "findAll");
        groupCodeMenu= menu.add(setting, "groupCode").onChange(changeGroupCode);
    }
}
