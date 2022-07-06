import {mouse_position} from "./mousePositoin";
import {reactivateBrowser} from "./reactivateBrowser";
import {IRobot} from '../interfaceses'


export function drawCircle(radius: number, robot: IRobot) {
    const centerX = mouse_position.x + radius
    const centerY = mouse_position.y + radius
    const steps = 500

    let clickOnce = true

    for (let i = 0; i <= steps; i++) {
        const radians = (2 * Math.PI * i / steps) - Math.PI / 2
        const x = centerX + radius * Math.cos(radians)
        const y = centerY + radius * Math.sin(radians)
        robot.moveMouse(x, y)
        if (clickOnce) {
            robot.mouseClick()
            robot.mouseToggle("down")
            clickOnce = false
        }
    }
    robot.mouseToggle("up")
    reactivateBrowser(robot)
}
