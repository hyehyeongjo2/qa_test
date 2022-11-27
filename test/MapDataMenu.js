export class MapDataMenu {
    constructor() {
        this.gui = null;
        this.mapData = null;
        this.map = null;
        this.mapContainer = null;
        this.menu = null;
    }

    init(gui, mapData) {
        this.gui = gui;
        this.mapData = mapData;
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
        console.log('initdataFloor');
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
        let ResultFloorId = menu.add(setting, 'ResultFloorId');
        let ResultFloorName = menu.add(setting, 'ResultFloorName');

        function findByTitle(value) {
            const floors = this.mapData.dataFloor.find({ title: value }).reduce((result, cur) => {
                return [...result, cur.id];
            }, []);
            ResultFloorId = ResultFloorId.options(floors).onChange(changeFloor);
            const floorsName = this.mapData.dataFloor.find({ title: value }).reduce((result, cur) => {
                return [...result, cur.name[0].text];
            }, []);
            ResultFloorName = ResultFloorName.options(floorsName);
        }
        function findByFloorId(value) {
            const floors = this.mapData.dataFloor.find({ id: value });
            console.log(floors);
            ResultFloorId = ResultFloorId.options([floors.id]).onChange(changeFloor.bind(this));
            ResultFloorName = ResultFloorName.options([floors.name[0].text]);
        }
    }

    initDataLanguage(gui) {
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
        menu.add(setting, 'language', langList);
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
        let poisMenu = menu.add(setting, 'pois').name('find poi 결과 ');

        function findByTitle(value) {
            const pois = this.mapData.dataPoi.find({ title: value }).reduce((result, cur) => {
                return { ...result, [cur.title]: cur.id };
            }, {});
            poisMenu = poisMenu.options(pois).name('find poi 결과 ');
        }

        function findByID(value) {
            const pois = this.mapData.dataPoi.find({ id: value });
            poisMenu = poisMenu
                .options({ [pois.title]: pois.id })
                .name('find poi 결과 ')
                .onChange(changePoi.bind(this));
        }

        async function findByFloorId(value) {
            const pois = this.mapData.dataPoi.find({ floorId: value }).reduce((result, cur) => {
                return { ...result, [cur.title]: cur.id };
            }, {});
            poisMenu = poisMenu.options(pois).name('find poi 결과 ');
        }

        function findByGroupCode(value) {
            const pois = this.mapData.dataPoi.find({ groupCode: value }).reduce((result, cur) => {
                return { ...result, [cur.title]: cur.id };
            }, {});
            poisMenu = poisMenu.options(pois).name('find poi 결과 ');
        }
    }

    async initDataObject(gui) {
        let objectsMenu = null;
        function getObjectCenter() {
            console.log('getObjectCenter');
        }

        function findByTitle(value) {
            const objects = this.mapData.dataObject.find({ title: value, floorId: setting.findByFloorId }).reduce((result, cur) => {
                return [...result, cur.id];
            }, []);
            objectsMenu = objectsMenu.options(objects);
        }
        function findByID(value) {
            const objects = this.mapData.dataObject.find({ id: value, floorId: setting.findByFloorId });
            objectsMenu = objectsMenu.options([objects.id]);
        }

        async function findByFloorId(value) {
            const objects = this.mapData.dataObject.find({ floorId: value }).reduce((result, cur) => {
                return [...result, cur.id];
            }, []);
            objectsMenu = objectsMenu.options(objects);
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
        const floorList = this.mapData.dataFloor.getFloors().reduce((prev, cur) => {
            return [...prev, cur.id];
        }, []);
        const objects = await this.mapData.dataObject.getObjects();
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
        objectsMenu = menu.add(setting, 'object');
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
