import {mouse_position} from "./mousePositoin";
import {reactivateBrowser} from "./reactivateBrowser"
import {IRobot} from '../interfaceses'


export function drawSquare(width: number, robot: IRobot) {
    drawRectangle(width, width, robot)
}

export function drawRectangle(width: number, height: number, robot: IRobot){
    robot.mouseClick()
    robot.mouseToggle("down")
    mouseRight(width)
    mouseDown(height)
    mouseLeft(width)
    mouseUp(height)
    robot.mouseToggle("up")

    reactivateBrowser(robot)


    function mouseRight(px: number) {
        for (let i = 0; i < px; i++) {
            const x = mouse_position.x + i
            const y = mouse_position.y

            robot.moveMouse(x, y)
        }
        mouse_position.x += px
    }

    function mouseLeft(px: number) {
        for (let i = 0; i < px; i++) {
            const x = mouse_position.x - i
            const y = mouse_position.y

            robot.moveMouse(x, y)
        }
        mouse_position.x -= px
    }

    function mouseUp(px: number) {
        for (let i = 0; i < px; i++) {
            const x = mouse_position.x
            const y = mouse_position.y -i

            robot.moveMouse(x, y)
        }
        mouse_position.y -= px
    }

    function mouseDown(px: number) {
        for (let i = 0; i < px; i++) {
            const x = mouse_position.x
            const y = mouse_position.y +i

            robot.moveMouse(x, y)
        }
        mouse_position.y += px
    }

}


