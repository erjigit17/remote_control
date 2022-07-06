import {mouse_position} from "./mousePositoin";
import {IRobot} from '../interfaceses'


export function reactivateBrowser(robot: IRobot){
    const {x, y, initX, initY} = mouse_position
    robot.moveMouse(initX, initY)
    robot.mouseClick()
    robot.moveMouse(x, y)
}