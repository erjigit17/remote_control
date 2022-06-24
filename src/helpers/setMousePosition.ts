import {mouse_position} from "./mousePositoin";
import {directions} from '../constants'

export function setMousePosition(direction, px, ws, robot) {
    const position = new Map()

    position.set(directions.right, px => mouse_position.x += px)
    position.set(directions.left,  px => mouse_position.x -= px)
    position.set(directions.up,    px => mouse_position.y -= px)
    position.set(directions.down,  px => mouse_position.y += px)

    if (mouse_position.moveFirstTime){
        const mousePosition = robot.getMousePos()
        const {x, y} = mousePosition
        mouse_position.x = x
        mouse_position.y = y
        mouse_position.initX = x
        mouse_position.initY = y

        mouse_position.moveFirstTime = false
    }

    position.get(direction)(px)
    ws.send(`mouse_position ${mouse_position.x},${mouse_position.y}`)
    robot.moveMouse(mouse_position.x, mouse_position.y)
}