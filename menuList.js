import { MapInfoMenu } from './test/MapInfoMenu.js';
import { MapDataMenu } from './test/MapDataMenu.js';
import { ControlMenu } from './test/ControlMenu.js';
import { MarkerMenu } from './test/MarkerMenu.js';
import { MyLocationMenu } from './test/MyLocationMenu.js';
import { SimulationMenu } from './test/SimulationMenu.js';
import { ObjectsMenu } from './test/ObjectsMenu.js';
import { PoisMenu } from './test/PoisMenu.js';
import { TagMenu } from './test/TagMenu.js';
import { ModelMenu } from './test/ModelMenu.js';
import { EventMenu } from './test/EventMenu.js';
export const menuList = [
    { name: 'getMap', text: '지도가져오기' },
    { name: 'mapInfo', text: '지도정보', menu: MapInfoMenu },
    { name: 'mapData', text: '지도데이터', menu: MapDataMenu },
    { name: 'mapOption', text: '지도옵션' },
    { name: 'control', text: '컨트롤', menu: ControlMenu },
    { name: 'marker', text: '마커', menu: MarkerMenu },
    { name: 'myLocation', text: '내위치', menu: MyLocationMenu },
    { name: 'navigation', text: '길찾기', menu: SimulationMenu },
    { name: 'object', text: '오브젝트', menu: ObjectsMenu },
    { name: 'poi', text: 'POI', menu: PoisMenu },
    { name: 'tag', text: 'Tag', menu: TagMenu },
    { name: 'model', text: '모델', menu: ModelMenu },
    { name: 'event', text: '이벤트', menu: EventMenu },
];
