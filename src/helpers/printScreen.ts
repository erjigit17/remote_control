import Jimp from "jimp";
import {IRobot} from '../interfaceses'


export async function printScreen(robot: IRobot) {
    const size = 100
    const mousePosition = robot.getMousePos()
    const {x: _x, y: _y} = mousePosition
    // Edge cases
    const screenSize = robot.getScreenSize()
    const {width, height} = screenSize
    const x = width - size > _x ? _x : width - size
    const y = height - size > _y ? _y : height - size

    const image = robot.screen.capture(x, y, size, size);
    for (let i = 0; i < image.image.length; i++) {
        if (i % 4 === 0) {
            [image.image[i], image.image[i + 2]] = [image.image[i + 2], image.image[i]] // bgr -> rgb color
        }
    }

    const jimp = new Jimp(image.width, image.height)
    jimp.bitmap.data = image.image
    const base64 = await jimp.getBase64Async(Jimp.MIME_PNG);

    return base64.split(',').at(-1) //slice "data:image/png;base64"
}