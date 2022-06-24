import Jimp from "jimp";

export function printScreen(ws, robot) {
    const size = 200
    const mousePosition = robot.getMousePos()
    const {x: _x, y: _y} = mousePosition
    // Edge cases
    const screenSize = robot.getScreenSize()
    const {width, height} = screenSize
    const x = width - size > _x ? _x : width - size
    const y = height - size > _y ? _y : height - size

    let image = robot.screen.capture(x, y, size, size);
    for (let i = 0; i < image.image.length; i++) {
        if (i % 4 === 0) {
            [image.image[i], image.image[i + 2]] = [image.image[i + 2], image.image[i]] // bgr -> rgb color
        }
    }

    const jimg = new Jimp(image.width, image.height)
    jimg.bitmap.data = image.image
    jimg.getBase64(Jimp.MIME_PNG, (err, result) => {
        const Base64 = result.split(',').at(-1) //slice "data:image/png;base64"
        ws.send(`prnt_scrn ${Base64}`)
    });
}