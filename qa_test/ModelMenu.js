export class ModelMenu {
    constructor() {
        this.gui = null;
        this.mapData = null;
        this.map = null;
        this.mapContainer = null;
        this.menu = null;
        this.transitionSetting = null;
        this.objectIds = [];
        this.poisIds = [];
    }
    removeMenu() {
        if (this.menu) {
            this.gui.removeFolder(this.menu);
            this.menu = null;
        }
    }
    init(gui, mapData, map, mapContainer) {
        this.gui = gui;
        this.mapData = mapData;
        this.map = map;
        this.mapContainer = mapContainer;
        this.menu = this.gui.addFolder('Model');
        this.initSetOption(this.menu, this.map);
        return this.menu;
    }

    initSetOption(gui, map) {
        const defaultOption = {
            filename: 'https://assets.dabeeomaps.com/upload/models/blender/답동성당',
            transform: {
                translate: {
                    x: 5080.33860339969,
                    y: 2834.249083219735,
                    z: 2,
                },
                rotate: {
                    x: 90,
                    y: 170,
                    z: 0,
                },
                scale: {
                    x: 1.65,
                    y: 1.65,
                    z: 1.65,
                },
            },
        };
        const setModel = (option) => {
            map.objects.setModel(option);
        };
        const option = {
            filename: 'https://assets.dabeeomaps.com/upload/models/blender/답동성당',
            transform: {
                translate: {
                    x: 5080.33860339969,
                    y: 2834.249083219735,
                    z: 2,
                },
                rotate: {
                    x: 90,
                    y: 170,
                    z: 0,
                },
                scale: {
                    x: 1.65,
                    y: 1.65,
                    z: 1.65,
                },
            },
        };
        const fileSetting = {
            file: '',
        };

        gui.add(fileSetting, 'file');
        const transformMenu = gui.addFolder('transform');
        transformMenu.open();

        const translateSetting = {
            x: defaultOption.transform.translate.x,
            y: defaultOption.transform.translate.y,
            z: defaultOption.transform.translate.z,
        };
        const translateMenu = transformMenu.addFolder('translate');
        translateMenu.open();

        translateMenu.add(translateSetting, 'x', 0, 6000, 0.1).onFinishChange((value) => {
            option.transform.translate.x = value;
            setModel(option);
        });
        translateMenu.add(translateSetting, 'y', 0, 5000, 0.1).onFinishChange((value) => {
            option.transform.translate.y = value;
            setModel(option);
        });
        translateMenu.add(translateSetting, 'z', 0, 100, 1).onFinishChange((value) => {
            option.transform.translate.z = value;
            setModel(option);
        });

        const rotateSetting = {
            x: defaultOption.transform.rotate.x,
            y: defaultOption.transform.rotate.y,
            z: defaultOption.transform.rotate.z,
        };
        const rotateMenu = transformMenu.addFolder('rotate');
        rotateMenu.open();
        rotateMenu.add(rotateSetting, 'x', 0, 360, 1).onFinishChange((value) => {
            option.transform.rotate.x = value;
            setModel(option);
        });
        rotateMenu.add(rotateSetting, 'y', 0, 360, 1).onFinishChange((value) => {
            option.transform.rotate.y = value;
            setModel(option);
        });
        rotateMenu.add(rotateSetting, 'z', 0, 360, 1).onFinishChange((value) => {
            option.transform.rotate.z = value;
            setModel(option);
        });

        /////////////////////

        const scaleSetting = {
            x: defaultOption.transform.scale.x,
            y: defaultOption.transform.scale.y,
            z: defaultOption.transform.scale.z,
        };
        const scaleMenu = transformMenu.addFolder('scale');
        scaleMenu.open();
        scaleMenu.add(scaleSetting, 'x', 0, 5, 0.01).onFinishChange((value) => {
            option.transform.scale.x = value;
            setModel(option);
        });
        scaleMenu.add(scaleSetting, 'y', 0, 5, 0.01).onFinishChange((value) => {
            option.transform.scale.y = value;
            setModel(option);
        });
        scaleMenu.add(scaleSetting, 'z', 0, 5, 0.01).onFinishChange((value) => {
            option.transform.scale.z = value;
            setModel(option);
        });
    }
}
