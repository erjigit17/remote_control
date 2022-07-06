import {mouse_position} from "./mousePositoin";
import {directions} from '../constants'
import {IRobot} from '../interfaceses'


export function setMousePosition(direction: string, px: number, robot: IRobot) {
    const position = new Map()

    position.set(directions.right, (px: number) => mouse_position.x += px)
    position.set(directions.left,  (px: number)  => mouse_position.x -= px)
    position.set(directions.up,    (px: number)  => mouse_position.y -= px)
    position.set(directions.down,  (px: number)  => mouse_position.y += px)

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
    robot.moveMouse(mouse_position.x, mouse_position.y)
}