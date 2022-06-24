import robot from "robotjs";

const screenSize = robot.getScreenSize()
export const mouse_position = {
    _x: 0,
    _y: 0,

    initX: 0,
    initY: 0,

    moveFirstTime: true,

    get x() {
        return this._x
    },
    get y() {
        return this._y
    },

    set x(newValue) {
        if (newValue >= 0 && newValue <= screenSize.width) this._x = newValue;
    },
    set y(newValue) {
        if (newValue >= 0 && newValue <= screenSize.height) this._y = newValue;
    }
}