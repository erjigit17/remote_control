export interface  IRobot {
    mouseClick: () => void;
    moveMouse: (x: number, y: number) => void;
    mouseToggle: (upOrDown: 'down' | 'up') => void;
    getMousePos: () => ({x: number, y: number})
    getScreenSize: () => ({width: number, height: number})
    screen: {
        capture: (x: number, y: number, width: number, height: number) =>
            any
    }
}