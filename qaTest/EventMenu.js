export class EventMenu {
    constructor() {
        this.gui = null;
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
    init(gui, mapData, map, mapContainer) {
        this.gui = gui;
        this.mapData = mapData;
        this.map = map;
        this.mapContainer = mapContainer;
        this.menu = this.gui.addFolder('Event');
        this.menu.open();
        // this.initObjectHover();
        this.initSetting();
        this.initHandleEvent();
        return this.menu;
    }

    initSetting() {
        this.setting = {
            'poi-click': false,
            'object-click': false,
            'marker-click': false,
            'void-click': false,
            'on-mouse-click': false,
            'floor-changed': false,
            'floor-changing': false,
            'navi-complete': false,
            'render-complete': false,
            'zoom-changed': false,
            'tilt-changed': false,
            'rotation-changed': false,
            'control-start': false,
            'control-end': false,
            'drag-start': false,
            'drag-move': false,
            'drag-end': false,
            'on-mouse-move': false,
            'object-mouse-over': false,
            'object-mouse-enter': false,
            'object-mouse-leave': false,
            'poi-mouse-over': false,
            'poi-mouse-enter': false,
            'poi-mouse-leave': false,
            'floor-change-animation-end': false,
            'zoom-end': false,
        };
        let menu = this.menu;
        const setting = this.setting;
        menu.add(setting, 'poi-click');
        menu.add(setting, 'object-click');
        menu.add(setting, 'marker-click');
        menu.add(setting, 'floor-changed');
        menu.add(setting, 'floor-changing');
        menu.add(setting, 'navi-complete');
        menu.add(setting, 'render-complete');
        menu.add(setting, 'zoom-changed');
        menu.add(setting, 'tilt-changed');
        menu.add(setting, 'rotation-changed');
        menu.add(setting, 'control-start');
        menu.add(setting, 'control-end');
        menu.add(setting, 'on-mouse-move');
        menu.add(setting, 'on-mouse-click');
        menu.add(setting, 'object-mouse-over');
        menu.add(setting, 'void-click');
        menu.add(setting, 'drag-start');
        menu.add(setting, 'drag-move');
        menu.add(setting, 'drag-end');
        menu.add(setting, 'poi-mouse-over');
        menu.add(setting, 'poi-mouse-enter');
        menu.add(setting, 'poi-mouse-leave');
        menu.add(setting, 'object-mouse-enter');
        menu.add(setting, 'object-mouse-leave');
        menu.add(setting, 'floor-change-animation-end');
        menu.add(setting, 'zoom-end');

        return menu;
    }
    initObjectHover() {
        const map = this.map;
        const mapContainer = this.mapContainer;
        mapContainer.addEventListener('object-mouse-enter', (e) => {
            const option = {
                activeDest: true,
                color: '#00ff00',
                opacity: 1.0,
                isAnimate: false,
                ids: [e.detail.id],
            };
            map.objects.set(option);
        });
        mapContainer.addEventListener('object-mouse-leave', (e) => {
            map.objects.reset(e.detail.id);
        });
    }

    initHandleEvent() {
        const mapContainer = this.mapContainer;
        const setting = this.setting;
        // poi 클릭
        mapContainer.addEventListener('poi-click', (e) => {
            if (setting['poi-click']) console.log('poi click 에 대한 결과값', e.detail);
        });

        // object 클릭
        mapContainer.addEventListener('object-click', (e) => {
            if (setting['object-click']) console.log('object click 에 대한 결과값', e.detail);
        });

        // marker 클릭
        mapContainer.addEventListener('marker-click', (e) => {
            if (setting['marker-click']) console.log('marker click 에 대한 결과값', e.detail);
        });

        // 층 변경
        mapContainer.addEventListener('floor-changed', (e) => {
            if (setting['floor-changed']) console.log('floor-changed 에 대한 결과값', e.detail);
        });

        // floor-changing
        mapContainer.addEventListener('floor-changing', (e) => {
            if (setting['floor-changing']) console.log('floor-changing 에 대한 결과값', e.detail);
        });

        // 네비게이션 종료
        mapContainer.addEventListener('navi-complete', (e) => {
            if (setting['navi-complete']) console.log('navi-complete 에 대한 결과값', e.detail);
        });

        // redraw
        mapContainer.addEventListener('render-complete', (e) => {
            if (setting['render-complete']) console.log('render-complete 에 대한 결과값', e.detail);
        });

        // camera zoom changed
        mapContainer.addEventListener('zoom-changed', (e) => {
            if (setting['zoom-changed']) console.log('zoom-changed 에 대한 결과값', e.detail);
        });
        // camera tilt changed
        mapContainer.addEventListener('tilt-changed', (e) => {
            if (setting['tilt-changed']) console.log('tilt-changed 에 대한 결과값', e.detail);
        });
        // camera rotation changed
        mapContainer.addEventListener('rotation-changed', (e) => {
            if (setting['rotation-changed']) console.log('rotation-changed 에 대한 결과값', e.detail);
        });

        // camera rotation changed
        mapContainer.addEventListener('control-start', (e) => {
            if (setting['control-start']) console.log('control start 에 대한 결과값', e.detail);
        });

        // camera rotation changed
        mapContainer.addEventListener('control-end', (e) => {
            if (setting['control-end']) console.log('control end 에 대한 결과값', e.detail);
        });

        // 마우스 이동
        mapContainer.addEventListener('on-mouse-move', (e) => {
            if (setting['on-mouse-move']) console.log('on mouse move 에 대한 결과값', e.detail);
        });

        // 마우스 클릭
        mapContainer.addEventListener('on-mouse-click', (e) => {
            if (setting['on-mouse-click']) console.log('on mouse click 에 대한 결과값', e.detail);
        });

        // 마우스 hover ib
        mapContainer.addEventListener('object-mouse-over', (e) => {
            if (setting['object-mouse-over']) console.log('object-mouse-over에 대한 결과값', e.detail);
        });

        // 빈 공간 클릭시 좌표 반환 이벤트
        mapContainer.addEventListener('void-click', (e) => {
            if (setting['void-click']) console.log('void-click에 대한 결과값', e.detail);
        });

        // 드래그 시작
        mapContainer.addEventListener('drag-start', (e) => {
            if (setting['drag-start']) console.log('drag-start 에 대한 결과값', e.detail);
        });

        // 드래그 이동
        mapContainer.addEventListener('drag-move', (e) => {
            if (setting['drag-move']) console.log('drag-move 에 대한 결과값', e.detail);
        });

        // 드래그 종료
        mapContainer.addEventListener('drag-end', (e) => {
            if (setting['drag-end']) console.log('drag-end 에 대한 결과값', e.detail);
        });

        // poi mouse over
        mapContainer.addEventListener('poi-mouse-over', (e) => {
            if (setting['poi-mouse-over']) console.log('poi-mouse-over에 대한 결과값: ', e.detail);
        });
        // poi mouse enter
        mapContainer.addEventListener('poi-mouse-enter', (e) => {
            if (setting['poi-mouse-enter']) console.log('poi-mouse-enter 대한 결과값: ', e.detail);
        });
        // poi mouse leace
        mapContainer.addEventListener('poi-mouse-leave', (e) => {
            if (setting['poi-mouse-leave']) console.log('poi-mouse-leave 대한 결과값: ', e.detail);
        });
        // object mouse enter
        mapContainer.addEventListener('object-mouse-enter', (e) => {
            if (setting['object-mouse-enter']) console.log('object-mouse-enter 대한 결과값: ', e.detail);
        });
        // object mouse leace
        mapContainer.addEventListener('object-mouse-leave', (e) => {
            if (setting['object-mouse-leave']) console.log('object-mouse-leave 대한 결과값: ', e.detail);
        });
        mapContainer.addEventListener('floor-change-animation-end', (e) => {
            if (setting['floor-change-animation-end']) console.log('floor-change-animation-end 대한 결과값: ', e.detail);
        });
        mapContainer.addEventListener('zoom-end', (e) => {
            if (setting['zoom-end']) console.log('zoom-end 대한 결과값: ', e.detail);
        });
    }
}
