import {mouse_position} from "./mousePositoin";
import {reactivateBrowser} from "./reactivateBrowser"

export function drawSquare(width: number, robot){
    drawRectangle(width, width, robot)
}

export function drawRectangle(width: number, height: number, robot){
    robot.mouseClick()
    robot.mouseToggle("down")
    mouseRight(width, robot)
    mouseDown(height, robot)
    mouseLeft(width, robot)
    mouseUp(height, robot)
    robot.mouseToggle("up")

    reactivateBrowser(robot)
}


function mouseRight(px, robot) {
    for (let i = 0; i < px; i++) {
        const x = mouse_position.x + i
        const y = mouse_position.y

        robot.moveMouse(x, y)
    }
    mouse_position.x += px
}

function mouseLeft(px, robot) {
    for (let i = 0; i < px; i++) {
        const x = mouse_position.x - i
        const y = mouse_position.y

        robot.moveMouse(x, y)
    }
    mouse_position.x -= px
}

function mouseUp(px, robot) {
    for (let i = 0; i < px; i++) {
        const x = mouse_position.x
        const y = mouse_position.y -i

        robot.moveMouse(x, y)
    }
    mouse_position.y -= px
}

function mouseDown(px, robot) {
    for (let i = 0; i < px; i++) {
        const x = mouse_position.x
        const y = mouse_position.y +i

        robot.moveMouse(x, y)
    }
    mouse_position.y += px
}
