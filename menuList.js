import { MapInfoMenu } from './qaTest/MapInfoMenu.js';
import { MapDataMenu } from './qaTest/MapDataMenu.js';
import { ControlMenu } from './qaTest/ControlMenu.js';
import { MarkerMenu } from './qaTest/MarkerMenu.js';
import { MyLocationMenu } from './qaTest/MyLocationMenu.js';
import { SimulationMenu } from './qaTest/SimulationMenu.js';
import { ObjectsMenu } from './qaTest/ObjectsMenu.js';
import { PoisMenu } from './qaTest/PoisMenu.js';
import { TagMenu } from './qaTest/TagMenu.js';
import { ModelMenu } from './qaTest/ModelMenu.js';
import { EventMenu } from './qaTest/EventMenu.js';
import { ContextMenu } from './qaTest/ContextMenu.js';
export const menuList = [
    { name: 'getMap', text: '지도가져오기' },
    { name: 'mapOption', text: '지도옵션' },
    { name: 'context', text: '컨텍스트', menu: ContextMenu },
    { name: 'mapInfo', text: '지도정보', menu: MapInfoMenu },
    { name: 'mapData', text: '지도데이터', menu: MapDataMenu },
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
