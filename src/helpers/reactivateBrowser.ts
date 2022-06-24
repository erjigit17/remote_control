import {mouse_position} from "./mousePositoin";

export function reactivateBrowser(robot){
    const {x, y, initX, initY} = mouse_position
    robot.moveMouse(initX, initY)
    robot.mouseClick()
    robot.moveMouse(x, y)
}