import first from './first.jpg'
import second from './second.png'
import third from './third.jpg'
import fourth from './fourth.jpeg'
import fifth from './fifth.jpeg'
import sixth from './sixth.jpg'
import seventh from './seventh.jpeg'
import eighth from './eighth.jpeg'

const images = {
    1: first,
    2: second,
    3: third,
    4: fourth,
    5: fifth,
    6: sixth,
    7: seventh,
    8: eighth,
};

export function getPicture(value) {
    return images[value];
}
