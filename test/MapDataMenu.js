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
        this.menu = this.gui.addFolder('MapData');
        this.menu.open();
        this.initDataFloor(this.menu);
        this.initDataLanguage(this.menu);
        this.initDataPoi(this.menu);
        this.initDataObject(this.menu);
        this.initDataGroupCode(this.menu);
        return this.menu;
    }

    removeMenu() {
        if (this.menu) {
            this.gui.removeFolder(this.menu);
            this.menu = null;
        }
    }

    initDataFloor(gui) {
        const floorList = this.mapData.dataFloor.getFloors().reduce(
            (prev, cur) => {
                return [...prev, cur.id];
            },
            [''],
        );
        const defaultFloor = this.mapData.dataFloor.getDefaultFloor();
        const setting = {
            getDefaultFloor: defaultFloor.id,
            findByFloorId: '',
            findByTitle: '',
            ResultFloorId: '',
            ResultFloorName: '',
        };
        const menu = gui.addFolder('dataFloor');
        // menu.open();
        menu.add(setting, 'getDefaultFloor');
        menu.add(setting, 'findByFloorId', floorList).onChange(findByFloorId.bind(this));
        menu.add(setting, 'findByTitle').onFinishChange(findByTitle.bind(this));
        let ResultFloorId = menu.add(setting, 'ResultFloorId').onChange(changeFloor);
        let ResultFloorName = menu.add(setting, 'ResultFloorName').onChange(changeFloor.bind(this));

        async function changeFloor(value) {
            await this.map.context.changeFloor(value);
        }

        function findByTitle(value) {
            const floors = this.mapData.dataFloor.find({ title: value }).reduce((result, cur) => {
                return [...result, cur.id];
            }, []);
            ResultFloorId = ResultFloorId.options(floors).onChange(changeFloor);
            const floorsName = this.mapData.dataFloor.find({ title: value }).reduce((result, cur) => {
                return [...result, cur.name[0].text];
            }, []);
            ResultFloorName = ResultFloorName.options(floorsName).onChange(changeFloor.bind(this));
        }
        function findByFloorId(value) {
            const floors = this.mapData.dataFloor.find({ id: value });
            console.log(floors);
            ResultFloorId = ResultFloorId.options([floors.id]).onChange(changeFloor.bind(this));
            ResultFloorName = ResultFloorName.options([floors.name[0].text]).onChange(changeFloor.bind(this));
        }
    }

    initDataLanguage(gui) {
        const changeLanguage = async (value) => {
            this.map.context.changeLanguage(value);
        };
        console.log(`this.mapData.dataLanguage.getLanguage(): `, this.mapData.dataLanguage.getLanguage());
        const langList = this.mapData.dataLanguage.getLanguage().reduce((result, cur) => {
            return { ...result, [cur.name]: cur.lang };
        }, {});
        const defaultLanguage = this.mapData.dataLanguage.getDefaultLanguage();
        const setting = {
            getDefaultLang: defaultLanguage.lang,
            language: '',
        };
        const menu = gui.addFolder('data Language');
        // menu.open();
        menu.add(setting, 'getDefaultLang');
        menu.add(setting, 'language', langList).onChange(changeLanguage);
    }

    initDataPoi(gui) {
        const allPois = this.mapData.dataPoi.getPois();
        let poisSetting = {
            선택: -1,
        };
        allPois.forEach((element) => {
            poisSetting[element.floorName + '-' + element.id + '-' + element.title] = element.id;
        });
        console.log(allPois);
        const floorList = this.mapData.dataFloor.getFloors().reduce(
            (prev, cur) => {
                return [...prev, cur.id];
            },
            [''],
        );

        const poiList = this.mapData.dataPoi.getPois().reduce(
            (result, cur) => {
                return [...result, cur.id];
            },
            [''],
        );
        console.log(poiList);

        const groupList = this.mapData.dataGroupCode.findAll();
        const setting = {
            allPoiList: 0,
            findByTitle: '',
            findByID: '',
            findByFloorId: '',
            findByGroupCode: '',
            pois: '',
        };
        const menu = gui.addFolder('dataPoi');
        // menu.open();
        menu.add(setting, 'allPoiList', poisSetting);
        menu.add(setting, 'findByTitle').onFinishChange(findByTitle.bind(this));
        menu.add(setting, 'findByID', poiList).onChange(findByID.bind(this));
        menu.add(setting, 'findByFloorId', floorList).onChange(findByFloorId.bind(this));
        menu.add(setting, 'findByGroupCode', groupList).onChange(findByGroupCode.bind(this));
        let poisMenu = menu.add(setting, 'pois').name('find poi 결과 ').onChange(changePoi.bind(this));

        async function changePoi(value) {
            console.log(value);
            const option = {
                ids: value,
                outerColor: '#FC032D',
                innerColor: 'red',
                scale: 1.8,
            };
            const pois = this.mapData.dataPoi.find({ id: value });
            await this.map.context.changeFloor(pois.floorId);
            await this.map.pois.reset();
            console.log(option);
            this.map.pois.set(option);
        }

        function findByTitle(value) {
            const pois = this.mapData.dataPoi.find({ title: value }).reduce((result, cur) => {
                return { ...result, [cur.title]: cur.id };
            }, {});
            poisMenu = poisMenu.options(pois).name('find poi 결과 ').onChange(changePoi.bind(this));
        }

        function findByID(value) {
            const pois = this.mapData.dataPoi.find({ id: value });
            poisMenu = poisMenu
                .options({ [pois.title]: pois.id })
                .name('find poi 결과 ')
                .onChange(changePoi.bind(this));
        }

        async function findByFloorId(value) {
            await this.map.context.changeFloor(value); // 지도를 입력한 층 아이디에 맞는 층으로 전환합니다.
            const pois = this.mapData.dataPoi.find({ floorId: value }).reduce((result, cur) => {
                return { ...result, [cur.title]: cur.id };
            }, {});
            poisMenu = poisMenu.options(pois).name('find poi 결과 ').onChange(changePoi.bind(this));
        }

        function findByGroupCode(value) {
            const pois = this.mapData.dataPoi.find({ groupCode: value }).reduce((result, cur) => {
                return { ...result, [cur.title]: cur.id };
            }, {});
            poisMenu = poisMenu.options(pois).name('find poi 결과 ').onChange(changePoi.bind(this));
        }
    }

    async initDataObject(gui) {
        let objectsMenu = null;
        function getObjectCenter() {
            console.log('getObjectCenter');
        }
        const changeObject = async (value) => {
            console.log(value);
            const option = {
                activeDest: true, // active 여부
                color: '#00ffff', // 변경하고자 하는 색상값
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
            const objects = this.mapData.dataObject.find({ title: value, floorId: setting.findByFloorId }).reduce((result, cur) => {
                return [...result, cur.id];
            }, []);
            objectsMenu = objectsMenu.options(objects).onChange(changeObject);
        }
        function findByID(value) {
            const objects = this.mapData.dataObject.find({ id: value, floorId: setting.findByFloorId });
            objectsMenu = objectsMenu.options([objects.id]).onChange(changeObject);
        }

        async function findByFloorId(value) {
            await this.map.context.changeFloor(value); // 지도를 입력한 층 아이디에 맞는 층으로 전환합니다.
            const objects = this.mapData.dataObject.find({ floorId: value }).reduce((result, cur) => {
                return [...result, cur.id];
            }, []);
            objectsMenu = objectsMenu.options(objects).onChange(changeObject);
        }
        function findByGroupCode(value) {
            const objects = this.mapData.dataObject.find({ groupCode: value, floor: setting.findByFloorId });
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
        console.log(objects);
        const objectList = objects.reduce((result, cur) => {
            return [...result, cur.id];
        }, []);
        const groupList = this.mapData.dataGroupCode.findAll();

        const setting = {
            findByFloorId: '',
            findByTitle: '',
            findByID: '',
            findByGroupCode: '',
            getObjectCenter: getObjectCenter,
            object: '',
        };
        const menu = gui.addFolder('dataObject');
        // menu.open();
        menu.add(setting, 'findByFloorId', floorList).onChange(findByFloorId.bind(this));
        menu.add(setting, 'findByTitle').onFinishChange(findByTitle.bind(this));
        menu.add(setting, 'findByID', objectList).onChange(findByID.bind(this));
        menu.add(setting, 'findByGroupCode', groupList).onChange(findByGroupCode.bind(this));
        objectsMenu = menu.add(setting, 'object').onChange(changeObject);
        menu.add(setting, 'getObjectCenter');
    }

    initDataGroupCode(gui) {
        let groupCodeMenu = null;
        const changeGroupCode = (value) => {
            console.log(value);
        };
        function findChild(value) {
            const groups = this.mapData.dataGroupCode.findChild(value);
            groupCodeMenu = groupCodeMenu.options(groups).onChange(changeGroupCode);
        }
        function findAllChild(value) {
            const groups = this.mapData.dataGroupCode.findAllChild(value);
            groupCodeMenu = groupCodeMenu.options(groups).onChange(changeGroupCode);
        }
        function findParent(value) {
            const groups = this.mapData.dataGroupCode.findParent(value);
            groupCodeMenu = groupCodeMenu.options([groups]).onChange(changeGroupCode);
        }
        function findRootParent(value) {
            const groups = this.mapData.dataGroupCode.findRootParent(value);
            groupCodeMenu = groupCodeMenu.options([groups]).onChange(changeGroupCode);
        }
        function findAllRoot(value) {
            const groups = this.mapData.dataGroupCode.findAllRoot();
            groupCodeMenu = groupCodeMenu.options(groups).onChange(changeGroupCode);
        }
        function findAll(value) {
            const groups = this.mapData.dataGroupCode.findAll();
            groupCodeMenu = groupCodeMenu.options(groups).onChange(changeGroupCode);
        }

        const groupList = this.mapData.dataGroupCode.findAll();
        const setting = {
            findChild: '',
            findAllChild: '',
            findParent: '',
            findRootParent: '',
            findAllRoot: findAllRoot.bind(this),
            findAll: findAll.bind(this),
            groupCode: '',
        };
        const menu = gui.addFolder('dataGroupCode');
        // menu.open();
        menu.add(setting, 'findChild', groupList).onChange(findChild.bind(this));
        menu.add(setting, 'findAllChild', groupList).onChange(findAllChild.bind(this));
        menu.add(setting, 'findParent', groupList).onFinishChange(findParent.bind(this));
        menu.add(setting, 'findRootParent', groupList).onFinishChange(findRootParent.bind(this));
        menu.add(setting, 'findAllRoot');
        menu.add(setting, 'findAll');
        groupCodeMenu = menu.add(setting, 'groupCode').onChange(changeGroupCode);
    }
}
